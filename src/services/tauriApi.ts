import { invoke } from '@tauri-apps/api/core';
import { open as openDialog } from '@tauri-apps/plugin-dialog';
import {
  AppSettings,
  CompressOptions,
  ImageToPdfOptions,
  OrganizePageItem,
  PdfFileInfo,
  SplitOptions,
  SystemEngineStatus,
  TaskRecord,
  WatermarkOptions,
} from '../types';

export const isTauriEnvironment = (): boolean => {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
};

// Select files dialog
export async function selectFiles(
  title: string,
  multiple: boolean,
  extensions: string[]
): Promise<string[]> {
  if (isTauriEnvironment()) {
    try {
      const selected = await openDialog({
        multiple,
        title,
        filters: [
          {
            name: 'Supported Documents',
            extensions: extensions.map((e) => e.replace('.', '')),
          },
          { name: 'All Files', extensions: ['*'] },
        ],
      });
      if (!selected) return [];
      if (Array.isArray(selected)) return selected;
      return [selected];
    } catch (e) {
      console.error('File dialog error:', e);
      return [];
    }
  } else {
    // Web fallback for browser preview
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = multiple;
      input.accept = extensions.join(',');
      input.onchange = () => {
        if (!input.files || input.files.length === 0) {
          resolve([]);
          return;
        }
        const fileNames = Array.from(input.files).map((f) => f.name);
        resolve(fileNames);
      };
      input.click();
    });
  }
}

// Select output directory
export async function selectOutputDirectory(title: string = 'Chọn thư mục lưu file'): Promise<string | null> {
  if (isTauriEnvironment()) {
    try {
      const selected = await openDialog({
        directory: true,
        multiple: false,
        title,
      });
      return typeof selected === 'string' ? selected : null;
    } catch (e) {
      console.error('Directory dialog error:', e);
      return null;
    }
  }
  return 'C:\\PDF_Tools_Output';
}

// Open folder or file in Explorer
export async function openInExplorer(path: string): Promise<void> {
  if (isTauriEnvironment()) {
    return invoke('cmd_open_in_explorer', { path });
  } else {
    alert(`Mở thư mục/tệp: ${path}`);
  }
}

// PDF info
export async function getPdfInfo(path: string): Promise<PdfFileInfo> {
  if (isTauriEnvironment()) {
    return invoke('cmd_get_pdf_info', { path });
  }
  // Mock for browser mode
  return {
    path,
    name: path.split(/[/\\]/).pop() || 'sample.pdf',
    size: 2450000,
    formattedSize: '2.45 MB',
    pageCount: 6,
    encrypted: false,
    version: '1.7',
    title: 'Tài liệu hướng dẫn',
    author: 'NCN Team',
  };
}

// Merge PDFs
export async function mergePdfs(
  files: string[],
  pageRanges: Record<string, string> | undefined,
  outputPath: string
): Promise<string> {
  if (isTauriEnvironment()) {
    return invoke('cmd_merge_pdfs', { files, pageRanges, outputPath });
  }
  return outputPath;
}

// Split PDF
export async function splitPdf(
  file: string,
  mode: SplitOptions['mode'],
  ranges?: string,
  pagesPerFile?: number,
  outputDir?: string
): Promise<string[]> {
  const targetDir = outputDir || 'C:\\PDF_Tools_Output';
  if (isTauriEnvironment()) {
    return invoke('cmd_split_pdf', {
      file,
      mode,
      ranges,
      pagesPerFile,
      outputDir: targetDir,
    });
  }
  return [`${targetDir}\\sample_part_1.pdf`, `${targetDir}\\sample_part_2.pdf`];
}

// Organize PDF
export async function organizePdf(
  file: string,
  pages: OrganizePageItem[],
  outputPath: string
): Promise<string> {
  const instructions = pages.map((p) => ({
    originalPage: p.blank ? null : p.pageNumber,
    rotation: p.rotation,
    deleted: p.deleted,
    blank: p.blank ?? false,
  }));
  if (isTauriEnvironment()) {
    return invoke('cmd_organize_pdf', {
      file,
      instructions,
      outputPath,
    });
  }
  return outputPath;
}

// Compress PDF
export async function compressPdf(
  file: string,
  level: CompressOptions['level'],
  stripMetadata: boolean,
  outputPath: string
): Promise<any> {
  if (isTauriEnvironment()) {
    return invoke('cmd_compress_pdf', {
      file,
      level,
      stripMetadata,
      outputPath,
    });
  }
  return {
    outputPath,
    originalSize: 2500000,
    compressedSize: 1200000,
    savedBytes: 1300000,
    savedPercentage: 52.0,
  };
}

// Watermark and numbering
export async function watermarkPdf(
  file: string,
  options: WatermarkOptions,
  outputPath: string
): Promise<string> {
  if (isTauriEnvironment()) {
    return invoke('cmd_watermark_pdf', {
      file,
      watermarkText: options.text || null,
      opacity: options.opacity,
      rotation: options.rotation,
      size: options.fontSize,
      pageNumbers: options.pageNumbers,
      pageNumberFormat: options.pageNumberFormat || null,
      outputPath,
    });
  }
  return outputPath;
}

// Images to PDF
export async function imagesToPdf(
  images: string[],
  options: ImageToPdfOptions,
  outputPath: string
): Promise<string> {
  if (isTauriEnvironment()) {
    return invoke('cmd_images_to_pdf', {
      images,
      pageSize: options.pageSize,
      orientation: options.orientation,
      marginMm: options.marginMm,
      centerImage: options.centerImage,
      outputPath,
    });
  }
  return outputPath;
}

// Text to PDF
export async function textToPdf(textFile: string, outputPath: string): Promise<string> {
  if (isTauriEnvironment()) {
    return invoke('cmd_text_to_pdf', { textFile, outputPath });
  }
  return outputPath;
}

// PDF to Text
export async function pdfToText(file: string, outputPath: string): Promise<string> {
  if (isTauriEnvironment()) {
    return invoke('cmd_pdf_to_text', { file, outputPath });
  }
  return outputPath;
}

// Edit metadata
export async function editMetadata(
  file: string,
  title?: string,
  author?: string,
  creator?: string,
  stripAll?: boolean,
  outputPath?: string
): Promise<string> {
  const out = outputPath || file.replace('.pdf', '_metadata.pdf');
  if (isTauriEnvironment()) {
    return invoke('cmd_edit_metadata', {
      file,
      title: title || null,
      author: author || null,
      creator: creator || null,
      stripAll: !!stripAll,
      outputPath: out,
    });
  }
  return out;
}

// Engine status
export async function getEngineStatus(
  loCustom?: string,
  tessCustom?: string
): Promise<SystemEngineStatus> {
  if (isTauriEnvironment()) {
    return invoke('cmd_get_engine_status', { loCustom, tessCustom });
  }
  return {
    libreOfficeAvailable: false,
    libreOfficePath: undefined,
    libreOfficeVersion: undefined,
    msOfficeAvailable: true,
    msOfficeVersion: '16.0 (2021)',
    officeReady: true,
    officeEngineName: 'Microsoft Office',
    tesseractAvailable: false,
    tesseractPath: undefined,
    tesseractVersion: undefined,
    vietnameseOcrReady: false,
  };
}

// Convert Office to PDF
export async function convertOfficeToPdf(
  file: string,
  outputDir: string,
  loCustom?: string
): Promise<string> {
  if (isTauriEnvironment()) {
    return invoke('cmd_convert_office_to_pdf', {
      file,
      outputDir,
      loCustom: loCustom || null,
    });
  }
  throw new Error('Chưa cài đặt LibreOffice để chuyển đổi Office.');
}

// Convert PDF to Office
export async function convertPdfToOffice(
  file: string,
  format: string,
  outputDir: string,
  loCustom?: string
): Promise<string> {
  if (isTauriEnvironment()) {
    return invoke('cmd_convert_pdf_to_office', {
      file,
      format,
      outputDir,
      loCustom: loCustom || null,
    });
  }
  throw new Error('Chưa cài đặt LibreOffice để chuyển đổi sang Word/Excel/PPT.');
}

// Run OCR
export async function runOcr(
  file: string,
  language: string,
  format: string,
  outputBase: string,
  tessCustom?: string
): Promise<string> {
  if (isTauriEnvironment()) {
    return invoke('cmd_run_ocr', {
      file,
      language,
      format,
      outputBase,
      tessCustom: tessCustom || null,
    });
  }
  throw new Error('Chưa cài đặt Tesseract OCR để nhận dạng ký tự.');
}

// Task history
export async function getTasksHistory(limit: number = 50): Promise<TaskRecord[]> {
  if (isTauriEnvironment()) {
    return invoke('cmd_get_tasks', { limit });
  }
  return [];
}

export async function saveTaskHistory(task: TaskRecord): Promise<void> {
  if (isTauriEnvironment()) {
    return invoke('cmd_save_task', { task });
  }
}

export async function clearTasksHistory(): Promise<void> {
  if (isTauriEnvironment()) {
    return invoke('cmd_clear_tasks');
  }
}

// Settings
export async function getSavedSettings(): Promise<AppSettings | null> {
  if (isTauriEnvironment()) {
    return invoke('cmd_get_settings');
  }
  const raw = localStorage.getItem('pdf_tools_ncn_settings');
  return raw ? JSON.parse(raw) : null;
}

export async function saveAppSettings(settings: AppSettings): Promise<void> {
  if (isTauriEnvironment()) {
    await invoke('cmd_save_settings', { settings });
  }
  localStorage.setItem('pdf_tools_ncn_settings', JSON.stringify(settings));
}
