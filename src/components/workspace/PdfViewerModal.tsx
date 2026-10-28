import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  FileText,
} from 'lucide-react';
import { PdfFileInfo } from '../../types';

interface PdfViewerModalProps {
  file: PdfFileInfo | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ file, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!file) return null;

  const totalPages = file.pageCount || 1;

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
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#141126] border border-[#2D2656] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
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
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs px-2 font-mono text-white">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={handleNextPage}
                className="p-1 rounded text-[#9692AF] hover:text-white disabled:opacity-30"
                title="Trang sau"
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
              <span className="text-xs px-2 font-mono text-[#A78BFA]">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-1 rounded text-[#9692AF] hover:text-white"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleRotate}
              className="p-2 rounded-lg bg-[#120F24] text-[#9692AF] hover:text-white border border-[#2B2452]"
              title="Xoay trang"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#9692AF] hover:text-white hover:bg-red-900/30 transition-colors"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewer Canvas Area */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-[#0D0B18]">
          <div
            className="transition-transform duration-200 shadow-2xl bg-white text-slate-800 rounded-lg p-8 flex flex-col justify-between"
            style={{
              width: `${(595 * zoom) / 100}px`,
              height: `${(842 * zoom) / 100}px`,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {/* Mock Page Content for Preview */}
            <div className="space-y-4">
              <div className="border-b pb-3 flex justify-between items-center text-xs text-slate-500 font-mono">
                <span>PDF Tools NCN Viewer</span>
                <span>Trang {currentPage} / {totalPages}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {file.title || file.name}
              </h2>
              {file.author && (
                <p className="text-xs text-slate-600">Tác giả: {file.author}</p>
              )}
              <div className="space-y-2 pt-4">
                <div className="h-2.5 bg-slate-200 rounded w-full" />
                <div className="h-2.5 bg-slate-200 rounded w-11/12" />
                <div className="h-2.5 bg-slate-200 rounded w-4/5" />
                <div className="h-2.5 bg-slate-200 rounded w-full" />
                <div className="h-2.5 bg-slate-200 rounded w-3/4" />
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-400 border-t pt-2 font-mono">
              Được xem trước bảo mật trên máy tính với PDF Tools NCN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
