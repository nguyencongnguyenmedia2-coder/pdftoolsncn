export type ToolId =
  | 'merge'
  | 'split'
  | 'organize'
  | 'compress'
  | 'pdf_to_word'
  | 'pdf_to_excel'
  | 'pdf_to_ppt'
  | 'pdf_to_image'
  | 'pdf_to_text'
  | 'word_to_pdf'
  | 'excel_to_pdf'
  | 'ppt_to_pdf'
  | 'image_to_pdf'
  | 'text_to_pdf'
  | 'ocr'
  | 'security'
  | 'watermark'
  | 'metadata';

export interface ToolDef {
  id: ToolId;
  name: string;
  category: 'organize' | 'convert' | 'security' | 'edit' | 'ocr';
  icon: string;
  badge?: string;
  description: string;
  acceptsMultiple: boolean;
  acceptedExtensions: string[];
  requiresEngine?: 'libreoffice' | 'tesseract' | null;
}

export interface PdfFileInfo {
  path: string;
  name: string;
  size: number;
  formattedSize: string;
  pageCount?: number;
  encrypted?: boolean;
  version?: string;
  title?: string;
  author?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modificationDate?: string;
  thumbnail?: string; // Data URL if available
  error?: string;
}

export interface TaskRecord {
  id: string;
  toolId: ToolId;
  toolName: string;
  inputFiles: string[];
  outputFiles: string[];
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  startedAt: string;
  finishedAt?: string;
  errorMessage?: string;
  inputSize: number;
  outputSize: number;
}

export interface MergeOptions {
  pageRanges?: Record<string, string>; // filePath -> range string like "1-3, 5"
}

export interface SplitOptions {
  mode: 'all_pages' | 'ranges' | 'fixed_count';
  ranges?: string; // e.g. "1-3, 4-5"
  pagesPerFile?: number;
}

export interface OrganizePageItem {
  pageNumber: number;
  rotation: 0 | 90 | 180 | 270;
  deleted: boolean;
  blank?: boolean;
}

export interface OrganizeOptions {
  pages: OrganizePageItem[];
}

export interface CompressOptions {
  level: 'low' | 'medium' | 'high'; // low (nhẹ), medium (cân bằng), high (mạnh)
  stripMetadata: boolean;
  grayscale: boolean;
  imageDpi?: number;
}

export interface SecurityOptions {
  mode: 'encrypt' | 'decrypt';
  userPassword?: string;
  ownerPassword?: string;
  allowPrint?: boolean;
  allowCopy?: boolean;
  allowModify?: boolean;
}

export interface WatermarkOptions {
  text: string;
  fontSize: number;
  opacity: number; // 0.1 to 1.0
  rotation: number; // -90 to 90
  color: string; // hex
  position: 'center' | 'top' | 'bottom' | 'diagonal';
  pageNumbers: boolean;
  pageNumberPosition: 'bottom-center' | 'bottom-right' | 'top-right';
  pageNumberFormat: string; // "Trang {n} / {total}"
}

export interface ImageToPdfOptions {
  pageSize: 'A4' | 'A3' | 'Letter' | 'Fit';
  orientation: 'portrait' | 'landscape' | 'auto';
  marginMm: number;
  centerImage: boolean;
}

export interface PdfToImageOptions {
  format: 'png' | 'jpg';
  dpi: number;
  quality: number; // 1-100
  selectedPages?: string;
}

export interface OcrOptions {
  language: 'vie' | 'eng' | 'vie+eng';
  outputFormat: 'searchable_pdf' | 'txt';
  selectedPages?: string;
}

export interface AppSettings {
  language: 'vi' | 'en';
  theme: 'dark' | 'light';
  defaultOutputDir: string;
  duplicateAction: 'ask' | 'rename' | 'overwrite';
  keepTempFiles: boolean;
  maxParallelTasks: number;
  libreOfficePath?: string;
  tesseractPath?: string;
}

export interface SystemEngineStatus {
  libreOfficeAvailable: boolean;
  libreOfficePath?: string;
  libreOfficeVersion?: string;
  tesseractAvailable: boolean;
  tesseractPath?: string;
  tesseractVersion?: string;
  vietnameseOcrReady: boolean;
}
