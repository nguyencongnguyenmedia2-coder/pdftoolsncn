import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { readFileBytes } from '../services/tauriApi';

// Configure PDF.js Web Worker bundled locally by Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// Cache loaded PDFDocumentProxy promises by file path
const pdfDocCache = new Map<string, Promise<pdfjsLib.PDFDocumentProxy>>();

// Cache rendered thumbnail DataURLs for instant display when switching tabs/reordering
const thumbnailDataUrlCache = new Map<string, string>();

// Simple concurrency limiter so 50+ page PDFs render smoothly without freezing UI
let activeRenders = 0;
const MAX_CONCURRENT_RENDERS = 3;
const renderQueue: Array<() => void> = [];

function acquireRenderSlot(): Promise<void> {
  if (activeRenders < MAX_CONCURRENT_RENDERS) {
    activeRenders++;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    renderQueue.push(() => {
      activeRenders++;
      resolve();
    });
  });
}

function releaseRenderSlot() {
  activeRenders = Math.max(0, activeRenders - 1);
  const next = renderQueue.shift();
  if (next) {
    next();
  }
}

/**
 * Load and cache a PDFDocumentProxy for a local file path
 */
export async function getPdfDocument(filePath: string): Promise<pdfjsLib.PDFDocumentProxy> {
  const existing = pdfDocCache.get(filePath);
  if (existing) {
    return existing;
  }

  const loadPromise = (async () => {
    try {
      const bytes = await readFileBytes(filePath);
      // Pass a copy of bytes so PDF.js worker transfer doesn't detach reusable buffer if needed
      const loadingTask = pdfjsLib.getDocument({
        data: bytes,
        cMapPacked: true,
      });
      return await loadingTask.promise;
    } catch (err) {
      pdfDocCache.delete(filePath);
      throw err;
    }
  })();

  pdfDocCache.set(filePath, loadPromise);
  return loadPromise;
}

/**
 * Get cached thumbnail DataURL if already rendered
 */
export function getCachedThumbnail(
  filePath: string,
  pageNumber: number,
  targetWidth: number = 220
): string | undefined {
  return thumbnailDataUrlCache.get(`${filePath}::${pageNumber}::${targetWidth}`);
}

/**
 * Render a PDF page into a crisp PNG/JPEG DataURL thumbnail with caching and concurrency control
 */
export async function renderPageToDataUrl(
  filePath: string,
  pageNumber: number,
  targetWidth: number = 220
): Promise<{ dataUrl: string; width: number; height: number; totalPages: number }> {
  const cacheKey = `${filePath}::${pageNumber}::${targetWidth}`;
  const cached = thumbnailDataUrlCache.get(cacheKey);

  const doc = await getPdfDocument(filePath);
  const safePageNum = Math.min(Math.max(1, pageNumber), doc.numPages);

  if (cached) {
    return {
      dataUrl: cached,
      width: targetWidth,
      height: Math.round(targetWidth * 1.414),
      totalPages: doc.numPages,
    };
  }

  await acquireRenderSlot();
  try {
    // Re-check cache after waiting for slot
    const cachedAfterWait = thumbnailDataUrlCache.get(cacheKey);
    if (cachedAfterWait) {
      return {
        dataUrl: cachedAfterWait,
        width: targetWidth,
        height: Math.round(targetWidth * 1.414),
        totalPages: doc.numPages,
      };
    }

    const page = await doc.getPage(safePageNum);
    const baseViewport = page.getViewport({ scale: 1 });
    // Render at 1.5x device pixel ratio for sharp text & graphics on thumbnails
    const scale = (targetWidth * 1.5) / Math.max(baseViewport.width, 1);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Không thể khởi tạo Canvas 2D');
    }

    // Fill white background for transparent PDFs
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    thumbnailDataUrlCache.set(cacheKey, dataUrl);

    return {
      dataUrl,
      width: canvas.width,
      height: canvas.height,
      totalPages: doc.numPages,
    };
  } finally {
    releaseRenderSlot();
  }
}

/**
 * Render a high-resolution PDF page directly onto a target HTMLCanvasElement (for PdfViewerModal)
 */
export async function renderPageToCanvas(
  filePath: string,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  zoomPercent: number = 100,
  extraRotation: number = 0
): Promise<{ totalPages: number; width: number; height: number }> {
  const doc = await getPdfDocument(filePath);
  const safePageNum = Math.min(Math.max(1, pageNumber), doc.numPages);
  const page = await doc.getPage(safePageNum);

  const baseViewport = page.getViewport({ scale: 1 });
  const totalRotation = (baseViewport.rotation + extraRotation) % 360;

  // Base fit width ~ 680px at 100% zoom, multiplied by devicePixelRatio for crisp HiDPI rendering
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const desiredCssWidth = (680 * zoomPercent) / 100;
  const cssScale = desiredCssWidth / Math.max(baseViewport.width, 1);
  const renderViewport = page.getViewport({
    scale: cssScale * dpr,
    rotation: totalRotation,
  });

  const cssWidth = Math.ceil(renderViewport.width / dpr);
  const cssHeight = Math.ceil(renderViewport.height / dpr);

  canvas.width = Math.ceil(renderViewport.width);
  canvas.height = Math.ceil(renderViewport.height);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Không thể khởi tạo Canvas 2D');
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: ctx,
    viewport: renderViewport,
  }).promise;

  return {
    totalPages: doc.numPages,
    width: cssWidth,
    height: cssHeight,
  };
}

