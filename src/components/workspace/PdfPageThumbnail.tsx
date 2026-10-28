import React, { useEffect, useRef, useState } from 'react';
import { Loader2, FileText } from 'lucide-react';
import { getCachedThumbnail, renderPageToDataUrl } from '../../utils/pdfRenderer';

interface PdfPageThumbnailProps {
  filePath: string;
  pageNumber: number;
  rotation?: number;
  width?: number;
  blank?: boolean;
  className?: string;
  onClick?: () => void;
}

export const PdfPageThumbnail: React.FC<PdfPageThumbnailProps> = ({
  filePath,
  pageNumber,
  rotation = 0,
  width = 180,
  blank = false,
  className = '',
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(() =>
    blank ? null : getCachedThumbnail(filePath, pageNumber, width) || null
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(!blank && !dataUrl);
  const [error, setError] = useState<boolean>(false);

  // Observe visibility so large PDFs (e.g., 50+ pages) render smoothly without lag
  useEffect(() => {
    if (blank) return;
    const cached = getCachedThumbnail(filePath, pageNumber, width);
    if (cached) {
      setDataUrl(cached);
      setLoading(false);
      return;
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '280px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [filePath, pageNumber, width, blank]);

  // Trigger actual PDF.js render when visible
  useEffect(() => {
    if (blank || !filePath || !isVisible) return;

    const cached = getCachedThumbnail(filePath, pageNumber, width);
    if (cached) {
      setDataUrl(cached);
      setLoading(false);
      setError(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    renderPageToDataUrl(filePath, pageNumber, width)
      .then((res) => {
        if (!cancelled) {
          setDataUrl(res.dataUrl);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn(`Thumbnail render error (${filePath} p.${pageNumber}):`, err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [filePath, pageNumber, width, blank, isVisible]);

  if (blank) {
    return (
      <div
        ref={containerRef}
        onClick={onClick}
        className={`relative bg-white rounded-lg border border-slate-300 shadow-md flex flex-col items-center justify-center text-slate-400 select-none overflow-hidden ${
          onClick ? 'cursor-pointer hover:ring-2 hover:ring-[#7657F6]' : ''
        } ${className}`}
      >
        <span className="text-[11px] font-semibold text-slate-500">Trang trắng</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative bg-[#1F1A3A] rounded-lg border border-[#3A336B] shadow-md flex items-center justify-center overflow-hidden select-none ${
        onClick ? 'cursor-pointer hover:ring-2 hover:ring-[#7657F6]' : ''
      } ${className}`}
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={`Trang ${pageNumber}`}
          draggable={false}
          className="w-full h-full object-contain bg-white transition-transform duration-200"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      ) : loading ? (
        <div className="flex flex-col items-center justify-center gap-1.5 p-2 text-[#A78BFA]">
          <Loader2 className="w-5 h-5 animate-spin text-[#7657F6]" />
          <span className="text-[10px] text-[#9692AF]">Trang {pageNumber}</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center gap-1 p-2 text-[#9692AF]">
          <FileText className="w-5 h-5 text-[#7657F6]" />
          <span className="text-[10px] font-semibold">P.{pageNumber}</span>
        </div>
      ) : null}
    </div>
  );
};

