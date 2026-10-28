import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  FileText,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { PdfFileInfo } from '../../types';
import { renderPageToCanvas } from '../../utils/pdfRenderer';

interface PdfViewerModalProps {
  file: PdfFileInfo | null;
  initialPage?: number;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  file,
  initialPage = 1,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(file?.pageCount || 1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      setCurrentPage(initialPage || 1);
      setTotalPages(file.pageCount || 1);
      setZoom(100);
      setRotation(0);
      setErrorMsg(null);
    }
  }, [file, initialPage]);

  // Render real PDF page onto canvas whenever file, currentPage, zoom, or rotation changes
  useEffect(() => {
    if (!file || !canvasRef.current) return;

    let cancelled = false;
    setLoading(true);
    setErrorMsg(null);

    renderPageToCanvas(file.path, currentPage, canvasRef.current, zoom, rotation)
      .then((res) => {
        if (!cancelled) {
          setTotalPages(res.totalPages);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('PDF Viewer render error:', err);
        if (!cancelled) {
          setErrorMsg(err?.message || 'Không thể hiển thị trang PDF này.');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [file, currentPage, zoom, rotation]);

  // Keyboard shortcuts (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!file) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') {
        setCurrentPage((p) => Math.max(1, p - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentPage((p) => Math.min(totalPages, p + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file, totalPages, onClose]);

  if (!file) return null;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#141126] border border-[#2D2656] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#252044] bg-[#181430]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#251F47] flex items-center justify-center text-[#A78BFA] flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-white truncate max-w-md" title={file.name}>
                {file.name}
              </h3>
              <p className="text-[11px] text-[#7F7A9E]">
                {file.formattedSize} • {totalPages} trang {file.version ? `• PDF ${file.version}` : ''}
              </p>
            </div>
          </div>

          {/* Navigation and Zoom Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#120F24] rounded-lg border border-[#2B2452] p-1">
              <button
                disabled={currentPage <= 1}
                onClick={handlePrevPage}
                className="p-1 rounded text-[#9692AF] hover:text-white disabled:opacity-30"
                title="Trang trước (Phím mũi tên trái)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs px-2.5 font-mono text-white select-none">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={handleNextPage}
                className="p-1 rounded text-[#9692AF] hover:text-white disabled:opacity-30"
                title="Trang sau (Phím mũi tên phải)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center bg-[#120F24] rounded-lg border border-[#2B2452] p-1">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 25))}
                className="p-1 rounded text-[#9692AF] hover:text-white"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs px-2 font-mono text-[#A78BFA] select-none">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(250, zoom + 25))}
                className="p-1 rounded text-[#9692AF] hover:text-white"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleRotate}
              className="p-2 rounded-lg bg-[#120F24] text-[#9692AF] hover:text-white border border-[#2B2452]"
              title="Xoay trang 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#9692AF] hover:text-white hover:bg-red-900/30 transition-colors"
              title="Đóng (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewer Canvas Area */}
        <div className="flex-1 overflow-auto p-6 flex items-start justify-center bg-[#0D0B18] relative">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1633] border border-[#3A306B] text-xs text-white shadow-xl">
                <Loader2 className="w-4 h-4 animate-spin text-[#7657F6]" />
                <span>Đang hiển thị trang {currentPage}...</span>
              </div>
            </div>
          )}

          {errorMsg ? (
            <div className="my-auto p-6 rounded-2xl bg-[#1A1633] border border-red-500/30 text-center max-w-md space-y-2">
              <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
              <p className="text-xs font-semibold text-white">Không thể tải trang PDF</p>
              <p className="text-[11px] text-[#9692AF]">{errorMsg}</p>
            </div>
          ) : (
            <div className="my-auto shadow-2xl rounded-lg overflow-hidden border border-[#2D2656] bg-white">
              <canvas ref={canvasRef} className="block" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
