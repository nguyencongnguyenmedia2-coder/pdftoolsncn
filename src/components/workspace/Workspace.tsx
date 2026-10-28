import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Trash2,
  FolderOpen,
  Play,
  CheckCircle,
  AlertCircle,
  Eye,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
} from 'lucide-react';
import { PdfFileInfo, ToolDef } from '../../types';
import {
  selectFiles,
  selectOutputDirectory,
  openInExplorer,
  registerBrowserFile,
} from '../../services/tauriApi';
import { PdfPageThumbnail } from './PdfPageThumbnail';

interface WorkspaceProps {
  tool: ToolDef;
  files: PdfFileInfo[];
  setFiles: React.Dispatch<React.SetStateAction<PdfFileInfo[]>>;
  outputDir: string;
  setOutputDir: (dir: string) => void;
  onExecute: () => void;
  isProcessing: boolean;
  progress: number;
  resultMessage: string | null;
  resultOutputFiles: string[];
  errorMessage: string | null;
  onPreviewFile: (file: PdfFileInfo, initialPage?: number) => void;
  pageRanges: Record<string, string>;
  setPageRanges: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  tool,
  files,
  setFiles,
  outputDir,
  setOutputDir,
  onExecute,
  isProcessing,
  progress,
  resultMessage,
  resultOutputFiles,
  errorMessage,
  onPreviewFile,
  pageRanges,
  setPageRanges,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  // Track which files have "show all pages" expanded when pageCount > 12
  const [expandedAllPages, setExpandedAllPages] = useState<Record<string, boolean>>({});
  // Allow collapsing the page strip for individual files if desired (open by default)
  const [collapsedFileStrip, setCollapsedFileStrip] = useState<Record<string, boolean>>({});

  // File picking
  const handlePickFiles = async () => {
    const selected = await selectFiles(
      `Chọn tệp cho: ${tool.name}`,
      tool.acceptsMultiple,
      tool.acceptedExtensions
    );

    if (selected.length === 0) return;

    const newFiles: PdfFileInfo[] = selected.map((filePath) => {
      const name = filePath.split(/[/\\]/).pop() || filePath;
      return {
        path: filePath,
        name,
        size: 0,
        formattedSize: 'Đang tải...',
      };
    });

    if (tool.acceptsMultiple) {
      setFiles((prev) => {
        const existingPaths = new Set(prev.map((f) => f.path));
        const filtered = newFiles.filter((f) => !existingPaths.has(f.path));
        return [...prev, ...filtered];
      });
    } else {
      setFiles([newFiles[0]]);
    }
  };

  // Drag and drop in webview
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const newItems: PdfFileInfo[] = droppedFiles.map((f) => {
        const filePath = (f as any).path || f.name;
        registerBrowserFile(filePath, f);
        return {
          path: filePath,
          name: f.name,
          size: f.size,
          formattedSize: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        };
      });

      if (tool.acceptsMultiple) {
        setFiles((prev) => [...prev, ...newItems]);
      } else {
        setFiles([newItems[0]]);
      }
    }
  };

  // Reorder file item
  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setFiles(updated);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSelectOutputFolder = async () => {
    const dir = await selectOutputDirectory('Chọn thư mục xuất file');
    if (dir) {
      setOutputDir(dir);
    }
  };

  // Show visual page gallery inside each file card when not already in 'organize' tool
  // (since 'organize' already displays the interactive page editor right above)
  const showVisualPageGallery = tool.id !== 'organize';

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-12">
      {/* Main Workspace Card */}
      <div className="bg-[#121025] border border-[#231E44] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7657F6]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Dropzone Area */}
        {files.length === 0 ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] ${
              isDragOver
                ? 'border-[#7657F6] bg-[#7657F6]/10 scale-[1.01]'
                : 'border-[#2D2656] hover:border-[#52448B] bg-[#16132D]/60'
            }`}
          >
            {/* Upload Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#231C44] border border-[#3A2F6E] flex items-center justify-center text-[#A78BFA] mb-4 shadow-lg">
              <Upload className="w-8 h-8 animate-bounce-subtle" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
              Kéo thả file vào đây
            </h3>
            <p className="text-xs text-[#9692AF] mb-5">
              Hỗ trợ {tool.acceptedExtensions.join(', ')} • {tool.acceptsMultiple ? 'Nhiều tệp' : '1 tệp duy nhất'}
            </p>

            <button
              type="button"
              onClick={handlePickFiles}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#7657F6] to-[#5836DB] hover:from-[#8B6EF8] hover:to-[#6844EE] shadow-glow hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Chọn tệp từ máy tính
            </button>

            {/* Offline Privacy Guarantee Badge */}
            <div className="flex items-center gap-1.5 mt-8 px-4 py-1.5 rounded-full bg-[#1A1633] border border-[#2B2452] text-[11px] text-[#A78BFA]">
              <span>🔒</span>
              <span>File của bạn được xử lý 100% offline trên thiết bị, không tải lên bất kỳ máy chủ nào.</span>
            </div>
          </div>
        ) : (
          /* File List and Workspace Controls */
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#231E44] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Danh sách tệp ({files.length} tệp đã chọn):
                </span>
                {tool.acceptsMultiple && (
                  <span className="text-xs text-[#7F7A9E] hidden sm:inline">
                    (Có thể dùng mũi tên để sắp xếp thứ tự trước khi gộp)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {tool.acceptsMultiple && (
                  <button
                    onClick={handlePickFiles}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#A78BFA] bg-[#221C44] hover:bg-[#2F275C] border border-[#3B3273] transition-colors"
                  >
                    + Thêm tệp khác
                  </button>
                )}
                <button
                  onClick={() => setFiles([])}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#EF4444] bg-[#2A1525] hover:bg-[#3D1A33] border border-[#4E1F3D] transition-colors"
                >
                  Xóa tất cả
                </button>
              </div>
            </div>

            {/* List of Files */}
            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {files.map((file, idx) => {
                const isPdf = file.name.toLowerCase().endsWith('.pdf');
                const totalPages = file.pageCount || 1;
                const isStripCollapsed = !!collapsedFileStrip[file.path];
                const isAllExpanded = !!expandedAllPages[file.path];
                const previewCount = isAllExpanded ? totalPages : Math.min(totalPages, 12);

                return (
                  <div
                    key={file.path || idx}
                    className="p-3.5 rounded-2xl bg-[#17142A] border border-[#2A244E] hover:border-[#4B3E7F] transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="w-6 text-center text-xs font-bold text-[#7657F6]">
                          #{idx + 1}
                        </span>

                        {/* Real PDF Cover Thumbnail or File Icon */}
                        {isPdf ? (
                          <PdfPageThumbnail
                            filePath={file.path}
                            pageNumber={1}
                            width={100}
                            className="w-12 h-16 flex-shrink-0"
                            onClick={() => onPreviewFile(file, 1)}
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-[#251F47] flex items-center justify-center text-[#A78BFA] flex-shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-white truncate" title={file.path}>
                            {file.name}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-[#7F7A9E] mt-0.5">
                            <span>{file.formattedSize}</span>
                            {file.pageCount && (
                              <span className="text-[#A78BFA] font-medium">• {file.pageCount} trang</span>
                            )}
                            {file.encrypted && (
                              <span className="text-[#EF4444] font-medium">• Có mật khẩu</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Merge Page Range selector */}
                      {tool.id === 'merge' && (
                        <div className="mx-2 flex items-center gap-1.5">
                          <label className="text-[11px] text-[#9692AF] hidden md:inline">
                            Phạm vi trang gộp:
                          </label>
                          <input
                            type="text"
                            value={pageRanges[file.path] || ''}
                            onChange={(e) =>
                              setPageRanges({ ...pageRanges, [file.path]: e.target.value })
                            }
                            placeholder="Tất cả (VD: 1-5)"
                            className="w-28 px-2.5 py-1.5 text-[11px] bg-[#121025] text-white rounded-lg border border-[#2D2654] focus:outline-none focus:border-[#7657F6]"
                          />
                        </div>
                      )}

                      {/* Actions for this file */}
                      <div className="flex items-center gap-1">
                        {isPdf && showVisualPageGallery && (
                          <button
                            type="button"
                            onClick={() =>
                              setCollapsedFileStrip((prev) => ({
                                ...prev,
                                [file.path]: !prev[file.path],
                              }))
                            }
                            className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-[#C5C0E6] hover:text-white bg-[#221C44] hover:bg-[#2F275C] border border-[#362D66] flex items-center gap-1 transition-colors"
                            title={isStripCollapsed ? 'Hiện lưới ảnh các trang' : 'Ẩn lưới ảnh các trang'}
                          >
                            <LayoutGrid className="w-3.5 h-3.5 text-[#A78BFA]" />
                            <span className="hidden sm:inline">
                              {isStripCollapsed ? 'Hiện trang' : 'Ẩn trang'}
                            </span>
                            {isStripCollapsed ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronUp className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        {tool.acceptsMultiple && (
                          <>
                            <button
                              disabled={idx === 0}
                              onClick={() => moveFile(idx, 'up')}
                              className="p-1.5 rounded-lg text-[#7F7A9E] hover:text-white hover:bg-[#272147] disabled:opacity-20"
                              title="Di chuyển tệp lên"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              disabled={idx === files.length - 1}
                              onClick={() => moveFile(idx, 'down')}
                              className="p-1.5 rounded-lg text-[#7F7A9E] hover:text-white hover:bg-[#272147] disabled:opacity-20"
                              title="Di chuyển tệp xuống"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {isPdf && (
                          <button
                            onClick={() => onPreviewFile(file, 1)}
                            className="p-1.5 rounded-lg text-[#A78BFA] hover:text-white hover:bg-[#272147] transition-colors"
                            title="Xem trước PDF toàn màn hình"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => removeFile(idx)}
                          className="p-1.5 rounded-lg text-[#EF4444] hover:text-white hover:bg-red-900/40 transition-colors"
                          title="Xóa tệp khỏi danh sách"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Visual PDF Pages Gallery for Merge / Split / Watermark / Compress */}
                    {isPdf && showVisualPageGallery && !isStripCollapsed && (
                      <div className="pt-2 border-t border-[#252044]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] text-[#9692AF]">
                            Hình ảnh các trang trong <strong className="text-white">{file.name}</strong> (Nhấn vào trang bất kỳ để phóng to):
                          </span>
                          {totalPages > 12 && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedAllPages((prev) => ({
                                  ...prev,
                                  [file.path]: !prev[file.path],
                                }))
                              }
                              className="text-[11px] font-semibold text-[#A78BFA] hover:text-white underline"
                            >
                              {isAllExpanded
                                ? 'Thu gọn bớt (12 trang đầu)'
                                : `Xem toàn bộ ${totalPages} trang`}
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-80 overflow-y-auto p-2.5 rounded-xl bg-[#121025] border border-[#241E42]">
                          {Array.from({ length: previewCount }, (_, pIdx) => {
                            const pageNum = pIdx + 1;
                            return (
                              <div
                                key={pageNum}
                                onClick={() => onPreviewFile(file, pageNum)}
                                className="group cursor-pointer p-2 rounded-xl bg-[#1A1633] border border-[#2D2656] hover:border-[#7657F6] flex flex-col items-center transition-all"
                              >
                                <PdfPageThumbnail
                                  filePath={file.path}
                                  pageNumber={pageNum}
                                  width={160}
                                  className="w-full aspect-[1/1.38]"
                                />
                                <span className="text-[11px] font-medium text-[#C5C0E6] group-hover:text-white mt-1.5">
                                  Trang {pageNum}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Destination directory selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#17142A] border border-[#2A244E]">
              <div className="flex items-center gap-2 min-w-0">
                <FolderOpen className="w-4 h-4 text-[#A78BFA] flex-shrink-0" />
                <span className="text-xs text-[#9692AF] flex-shrink-0">Lưu kết quả tại:</span>
                <span className="text-xs font-mono text-white truncate max-w-md" title={outputDir}>
                  {outputDir}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSelectOutputFolder}
                className="px-3 py-1 rounded-lg text-xs font-medium text-[#C5C0E6] bg-[#221C44] hover:bg-[#2D255C] border border-[#352D66] transition-colors flex-shrink-0"
              >
                Đổi thư mục...
              </button>
            </div>

            {/* Real Processing Progress Bar */}
            {isProcessing && (
              <div className="p-4 rounded-xl bg-[#1A1633] border border-[#7657F6]/40 space-y-2 animate-pulse-subtle">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7657F6] animate-ping" />
                    Đang xử lý tác vụ {tool.name}...
                  </span>
                  <span className="text-[#A78BFA] font-mono font-bold">{progress}%</span>
                </div>
                <div className="w-full bg-[#121025] rounded-full h-2 overflow-hidden border border-[#2D2656]">
                  <div
                    className="bg-gradient-to-r from-[#7657F6] to-[#A78BFA] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Result Success Banner */}
            {resultMessage && (
              <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#22C55E]">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{resultMessage}</span>
                </div>
                {resultOutputFiles.length > 0 && (
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    {resultOutputFiles.map((outPath, i) => (
                      <button
                        key={i}
                        onClick={() => openInExplorer(outPath)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#22C55E]/20 text-[#22C55E] hover:bg-[#22C55E]/30 border border-[#22C55E]/40 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Mở tệp #{i + 1}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => openInExplorer(outputDir)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1F1A3A] text-white hover:bg-[#2B2452] border border-[#3E3473] transition-colors"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Mở thư mục chứa kết quả</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#FCA5A5] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" />
                <div className="whitespace-pre-line leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {/* Big Action Execution Button */}
            <div className="pt-3">
              <button
                type="button"
                disabled={isProcessing || files.length === 0}
                onClick={onExecute}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7657F6] via-[#6542F0] to-[#5836DB] hover:from-[#8B6EF8] hover:to-[#6844EE] shadow-glow hover:shadow-glow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Thực hiện: {tool.name}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
