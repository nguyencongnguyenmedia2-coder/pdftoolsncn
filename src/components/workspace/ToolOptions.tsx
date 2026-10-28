import React from 'react';
import {
  ToolDef,
  SplitOptions,
  CompressOptions,
  WatermarkOptions,
  ImageToPdfOptions,
  SecurityOptions,
  OrganizePageItem,
  SystemEngineStatus,
} from '../../types';
import {
  RotateCw,
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface ToolOptionsProps {
  tool: ToolDef;
  engineStatus: SystemEngineStatus;
  splitOptions: SplitOptions;
  setSplitOptions: React.Dispatch<React.SetStateAction<SplitOptions>>;
  compressOptions: CompressOptions;
  setCompressOptions: React.Dispatch<React.SetStateAction<CompressOptions>>;
  watermarkOptions: WatermarkOptions;
  setWatermarkOptions: React.Dispatch<React.SetStateAction<WatermarkOptions>>;
  imageToPdfOptions: ImageToPdfOptions;
  setImageToPdfOptions: React.Dispatch<React.SetStateAction<ImageToPdfOptions>>;
  securityOptions: SecurityOptions;
  setSecurityOptions: React.Dispatch<React.SetStateAction<SecurityOptions>>;
  organizePages: OrganizePageItem[];
  setOrganizePages: React.Dispatch<React.SetStateAction<OrganizePageItem[]>>;
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  metaAuthor: string;
  setMetaAuthor: (val: string) => void;
  metaStripAll: boolean;
  setMetaStripAll: (val: boolean) => void;
  ocrLanguage: 'vie' | 'eng' | 'vie+eng';
  setOcrLanguage: (val: 'vie' | 'eng' | 'vie+eng') => void;
  ocrFormat: 'searchable_pdf' | 'txt';
  setOcrFormat: (val: 'searchable_pdf' | 'txt') => void;
  onOpenSettings: () => void;
}

export const ToolOptions: React.FC<ToolOptionsProps> = ({
  tool,
  engineStatus,
  splitOptions,
  setSplitOptions,
  compressOptions,
  setCompressOptions,
  watermarkOptions,
  setWatermarkOptions,
  imageToPdfOptions,
  setImageToPdfOptions,
  securityOptions,
  setSecurityOptions,
  organizePages,
  setOrganizePages,
  metaTitle,
  setMetaTitle,
  metaAuthor,
  setMetaAuthor,
  metaStripAll,
  setMetaStripAll,
  ocrLanguage,
  setOcrLanguage,
  ocrFormat,
  setOcrFormat,
  onOpenSettings,
}) => {
  // Check engine requirement notice
  const renderEngineNotice = () => {
    if (tool.requiresEngine === 'libreoffice') {
      if (engineStatus.libreOfficeAvailable) {
        return (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs text-[#22C55E]">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>
              Engine LibreOffice đã sẵn sàng ({engineStatus.libreOfficeVersion || 'Đã phát hiện'}).
            </span>
          </div>
        );
      }
      return (
        <div className="p-3.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs text-[#FDE68A] space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#F59E0B]">Chưa phát hiện LibreOffice</p>
              <p className="text-[#D1D5DB] mt-1 leading-relaxed">
                Để chuyển đổi Word, Excel, PowerPoint sang PDF và ngược lại trên máy tính offline,
                ứng dụng sử dụng LibreOffice headless (miễn phí, mã nguồn mở).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://www.libreoffice.org/download/download/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#F59E0B] text-black font-semibold rounded-lg hover:bg-[#D97706] transition-colors"
            >
              Tải LibreOffice miễn phí <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onOpenSettings}
              className="text-[#9692AF] hover:text-white underline"
            >
              Cấu hình đường dẫn trong Cài đặt
            </button>
          </div>
        </div>
      );
    }

    if (tool.requiresEngine === 'tesseract') {
      if (engineStatus.tesseractAvailable) {
        return (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs text-[#22C55E]">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>
              Engine Tesseract OCR đã sẵn sàng.
              {engineStatus.vietnameseOcrReady
                ? ' Hỗ trợ Tiếng Việt (vie.traineddata) đầy đủ.'
                : ' (Lưu ý: Chưa phát hiện file ngôn ngữ Tiếng Việt)'}
            </span>
          </div>
        );
      }
      return (
        <div className="p-3.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs text-[#FDE68A] space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#F59E0B]">Chưa phát hiện Tesseract OCR</p>
              <p className="text-[#D1D5DB] mt-1 leading-relaxed">
                Để nhận dạng văn bản tiếng Việt từ PDF scan hoặc ảnh, vui lòng cài đặt Tesseract OCR.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://github.com/UB-Mannheim/tesseract/wiki"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#F59E0B] text-black font-semibold rounded-lg hover:bg-[#D97706] transition-colors"
            >
              Tải Tesseract Windows <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onOpenSettings}
              className="text-[#9692AF] hover:text-white underline"
            >
              Cấu hình trong Cài đặt
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-[#17142A] border border-[#2A234E] rounded-2xl p-5 mb-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#252044] pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Tùy chọn cấu hình:</span>
          <span className="text-[#A78BFA]">{tool.name}</span>
        </h3>
        <span className="text-xs text-[#7F7A9E]">{tool.description}</span>
      </div>

      {/* Engine Status / Warning Notice */}
      {renderEngineNotice()}

      {/* 1. Split Options */}
      {tool.id === 'split' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setSplitOptions({ ...splitOptions, mode: 'all_pages' })}
            className={`p-3 rounded-xl border text-left transition-all ${
              splitOptions.mode === 'all_pages'
                ? 'bg-[#7657F6]/20 border-[#7657F6] text-white'
                : 'bg-[#121025] border-[#29234D] text-[#9692AF] hover:text-white'
            }`}
          >
            <div className="font-semibold text-xs mb-1">Tách từng trang</div>
            <div className="text-[11px] text-[#7F7A9E]">Mỗi trang xuất thành 1 tệp PDF riêng biệt</div>
          </button>

          <button
            type="button"
            onClick={() => setSplitOptions({ ...splitOptions, mode: 'ranges' })}
            className={`p-3 rounded-xl border text-left transition-all ${
              splitOptions.mode === 'ranges'
                ? 'bg-[#7657F6]/20 border-[#7657F6] text-white'
                : 'bg-[#121025] border-[#29234D] text-[#9692AF] hover:text-white'
            }`}
          >
            <div className="font-semibold text-xs mb-1">Theo khoảng trang</div>
            <div className="text-[11px] text-[#7F7A9E]">Nhập phạm vi mong muốn (ví dụ: 1-3, 4-6)</div>
          </button>

          <button
            type="button"
            onClick={() => setSplitOptions({ ...splitOptions, mode: 'fixed_count' })}
            className={`p-3 rounded-xl border text-left transition-all ${
              splitOptions.mode === 'fixed_count'
                ? 'bg-[#7657F6]/20 border-[#7657F6] text-white'
                : 'bg-[#121025] border-[#29234D] text-[#9692AF] hover:text-white'
            }`}
          >
            <div className="font-semibold text-xs mb-1">Chia theo số trang</div>
            <div className="text-[11px] text-[#7F7A9E]">Chia đều mỗi tệp N trang</div>
          </button>

          {splitOptions.mode === 'ranges' && (
            <div className="md:col-span-3 pt-2">
              <label className="block text-xs font-medium text-[#C5C0E6] mb-1.5">
                Khoảng trang cần tách (phân tách bởi dấu phẩy):
              </label>
              <input
                type="text"
                value={splitOptions.ranges || ''}
                onChange={(e) => setSplitOptions({ ...splitOptions, ranges: e.target.value })}
                placeholder="Ví dụ: 1-3, 5, 7-10"
                className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
              />
            </div>
          )}

          {splitOptions.mode === 'fixed_count' && (
            <div className="md:col-span-3 pt-2">
              <label className="block text-xs font-medium text-[#C5C0E6] mb-1.5">
                Số trang trên mỗi file:
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={splitOptions.pagesPerFile || 1}
                onChange={(e) =>
                  setSplitOptions({
                    ...splitOptions,
                    pagesPerFile: parseInt(e.target.value, 10) || 1,
                  })
                }
                className="w-32 px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* 2. Organize Pages Options */}
      {tool.id === 'organize' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A78BFA]">
              Danh sách các trang tài liệu ({organizePages.filter((p) => !p.deleted).length} trang được giữ):
            </span>
            <button
              type="button"
              onClick={() => {
                const nextNum = organizePages.length + 1;
                setOrganizePages([
                  ...organizePages,
                  {
                    pageNumber: nextNum,
                    rotation: 0,
                    deleted: false,
                    blank: true,
                  },
                ]);
              }}
              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[#7657F6]/20 text-[#A78BFA] hover:bg-[#7657F6]/30 border border-[#7657F6]/40 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Chèn trang trắng
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-72 overflow-y-auto p-2 bg-[#121025] rounded-xl border border-[#262047]">
            {organizePages.map((page, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-between transition-all ${
                  page.deleted
                    ? 'opacity-40 border-red-900/50 bg-red-950/20'
                    : 'bg-[#1A1633] border-[#2D2656]'
                }`}
              >
                <div
                  className="w-16 h-20 bg-[#252044] rounded-lg border border-[#3A336B] flex items-center justify-center font-bold text-xs text-[#A78BFA] transition-transform duration-200"
                  style={{ transform: `rotate(${page.rotation}deg)` }}
                >
                  {page.blank ? 'Trắng' : `P.${page.pageNumber}`}
                </div>

                <div className="text-[11px] font-semibold text-white mt-1.5">
                  {page.blank ? 'Trang trắng' : `Trang ${page.pageNumber}`}
                  {page.rotation > 0 && ` (${page.rotation}°)`}
                </div>

                <div className="flex items-center gap-1 mt-2">
                  <button
                    type="button"
                    title="Xoay 90° cùng chiều kim đồng hồ"
                    onClick={() => {
                      const updated = [...organizePages];
                      updated[idx].rotation = ((updated[idx].rotation + 90) % 360) as 0 | 90 | 180 | 270;
                      setOrganizePages(updated);
                    }}
                    className="p-1 rounded bg-[#272147] hover:bg-[#7657F6] text-[#A78BFA] hover:text-white"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    title={page.deleted ? 'Khôi phục trang' : 'Xóa trang'}
                    onClick={() => {
                      const updated = [...organizePages];
                      updated[idx].deleted = !updated[idx].deleted;
                      setOrganizePages(updated);
                    }}
                    className={`p-1 rounded ${
                      page.deleted
                        ? 'bg-green-800 text-white'
                        : 'bg-[#272147] hover:bg-red-600 text-[#EF4444] hover:text-white'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Compress Options */}
      {tool.id === 'compress' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setCompressOptions({ ...compressOptions, level: 'low' })}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                compressOptions.level === 'low'
                  ? 'bg-[#7657F6]/20 border-[#7657F6] text-white'
                  : 'bg-[#121025] border-[#29234D] text-[#9692AF] hover:text-white'
              }`}
            >
              <div className="font-semibold text-xs mb-1">Mức nhẹ (Bảo toàn nét)</div>
              <div className="text-[11px] text-[#7F7A9E]">Giảm ~20-30%, giữ nguyên chất lượng đồ họa tối đa</div>
            </button>

            <button
              type="button"
              onClick={() => setCompressOptions({ ...compressOptions, level: 'medium' })}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                compressOptions.level === 'medium'
                  ? 'bg-[#7657F6]/20 border-[#7657F6] text-white'
                  : 'bg-[#121025] border-[#29234D] text-[#9692AF] hover:text-white'
              }`}
            >
              <div className="font-semibold text-xs mb-1">Cân bằng (Khuyên dùng)</div>
              <div className="text-[11px] text-[#7F7A9E]">Giảm ~40-60%, cân đối tối ưu giữa dung lượng và độ rõ</div>
            </button>

            <button
              type="button"
              onClick={() => setCompressOptions({ ...compressOptions, level: 'high' })}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                compressOptions.level === 'high'
                  ? 'bg-[#7657F6]/20 border-[#7657F6] text-white'
                  : 'bg-[#121025] border-[#29234D] text-[#9692AF] hover:text-white'
              }`}
            >
              <div className="font-semibold text-xs mb-1">Mức mạnh (Email/Lưu trữ)</div>
              <div className="text-[11px] text-[#7F7A9E]">Giảm tới ~70-80%, phù hợp tài liệu gửi thư điện tử</div>
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-[#C5C0E6] cursor-pointer">
            <input
              type="checkbox"
              checked={compressOptions.stripMetadata}
              onChange={(e) =>
                setCompressOptions({ ...compressOptions, stripMetadata: e.target.checked })
              }
              className="rounded bg-[#121025] border-[#2E2756] text-[#7657F6] focus:ring-0"
            />
            <span>Xóa thông tin metadata ẩn (tác giả, ngày tạo, phần mềm) để tăng tỷ lệ tiết kiệm dung lượng</span>
          </label>
        </div>
      )}

      {/* 4. Watermark & Numbering Options */}
      {tool.id === 'watermark' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Chữ Watermark chìm:</label>
              <input
                type="text"
                value={watermarkOptions.text}
                onChange={(e) => setWatermarkOptions({ ...watermarkOptions, text: e.target.value })}
                placeholder="Ví dụ: BẢN QUYỀN - PDF TOOLS NCN"
                className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-[#C5C0E6] mb-1">
                  Cỡ chữ: {watermarkOptions.fontSize}pt
                </label>
                <input
                  type="range"
                  min="14"
                  max="72"
                  value={watermarkOptions.fontSize}
                  onChange={(e) =>
                    setWatermarkOptions({ ...watermarkOptions, fontSize: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-[#7657F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C5C0E6] mb-1">
                  Độ mờ: {Math.round(watermarkOptions.opacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={watermarkOptions.opacity}
                  onChange={(e) =>
                    setWatermarkOptions({ ...watermarkOptions, opacity: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#7657F6]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 border-l border-[#262047] pl-4">
            <label className="flex items-center gap-2 text-xs text-[#C5C0E6] cursor-pointer">
              <input
                type="checkbox"
                checked={watermarkOptions.pageNumbers}
                onChange={(e) =>
                  setWatermarkOptions({ ...watermarkOptions, pageNumbers: e.target.checked })
                }
                className="rounded bg-[#121025] border-[#2E2756] text-[#7657F6] focus:ring-0"
              />
              <span className="font-semibold text-white">Chèn số trang chân trang (Footer)</span>
            </label>

            {watermarkOptions.pageNumbers && (
              <div>
                <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Định dạng số trang:</label>
                <input
                  type="text"
                  value={watermarkOptions.pageNumberFormat}
                  onChange={(e) =>
                    setWatermarkOptions({ ...watermarkOptions, pageNumberFormat: e.target.value })
                  }
                  placeholder="Trang {n} / {total}"
                  className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
                />
                <span className="text-[10px] text-[#7F7A9E] mt-1 block">
                  Dùng {"{n}"} đại diện cho số trang hiện tại, {"{total}"} là tổng số trang
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Image to PDF Options */}
      {tool.id === 'image_to_pdf' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Khổ giấy:</label>
            <select
              value={imageToPdfOptions.pageSize}
              onChange={(e) =>
                setImageToPdfOptions({
                  ...imageToPdfOptions,
                  pageSize: e.target.value as ImageToPdfOptions['pageSize'],
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
            >
              <option value="A4">A4 (Chuẩn văn phòng)</option>
              <option value="A3">A3 (Bản vẽ lớn)</option>
              <option value="Letter">Letter (Mỹ)</option>
              <option value="Fit">Vừa đúng kích thước ảnh</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Hướng trang:</label>
            <select
              value={imageToPdfOptions.orientation}
              onChange={(e) =>
                setImageToPdfOptions({
                  ...imageToPdfOptions,
                  orientation: e.target.value as ImageToPdfOptions['orientation'],
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
            >
              <option value="auto">Tự động xoay theo ảnh</option>
              <option value="portrait">Trang Dọc</option>
              <option value="landscape">Trang Ngang</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Lề trang (mm):</label>
            <input
              type="number"
              min="0"
              max="50"
              value={imageToPdfOptions.marginMm}
              onChange={(e) =>
                setImageToPdfOptions({
                  ...imageToPdfOptions,
                  marginMm: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
            />
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 text-xs text-[#C5C0E6] cursor-pointer">
              <input
                type="checkbox"
                checked={imageToPdfOptions.centerImage}
                onChange={(e) =>
                  setImageToPdfOptions({
                    ...imageToPdfOptions,
                    centerImage: e.target.checked,
                  })
                }
                className="rounded bg-[#121025] border-[#2E2756] text-[#7657F6] focus:ring-0"
              />
              <span>Căn giữa ảnh</span>
            </label>
          </div>
        </div>
      )}

      {/* 6. Security Options */}
      {tool.id === 'security' && (
        <div className="space-y-3">
          <div className="p-3 bg-[#121025] rounded-xl border border-[#2B2550] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <ShieldAlert className="w-4 h-4 text-[#A78BFA]" />
              <span>Thiết lập bảo mật mật khẩu</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs text-[#C5C0E6] mb-1">Mật khẩu mở file (User Password):</label>
                <input
                  type="password"
                  value={securityOptions.userPassword || ''}
                  onChange={(e) => setSecurityOptions({ ...securityOptions, userPassword: e.target.value })}
                  placeholder="Nhập mật khẩu để khóa file..."
                  className="w-full px-3 py-2 text-xs bg-[#191535] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#C5C0E6] mb-1">Xác nhận mật khẩu:</label>
                <input
                  type="password"
                  value={securityOptions.ownerPassword || ''}
                  onChange={(e) => setSecurityOptions({ ...securityOptions, ownerPassword: e.target.value })}
                  placeholder="Nhập lại mật khẩu..."
                  className="w-full px-3 py-2 text-xs bg-[#191535] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[11px] text-[#7F7A9E] italic">
              Để mở khóa tài liệu đang có mật khẩu, hãy nhập mật khẩu hiện tại vào ô trên để phần mềm giải mã và lưu bản mới.
            </p>
          </div>
        </div>
      )}

      {/* 7. OCR Options */}
      {tool.id === 'ocr' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Ngôn ngữ nhận dạng:</label>
            <select
              value={ocrLanguage}
              onChange={(e) => setOcrLanguage(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
            >
              <option value="vie">Tiếng Việt (vie)</option>
              <option value="eng">Tiếng Anh (eng)</option>
              <option value="vie+eng">Song ngữ Tiếng Việt &amp; Tiếng Anh (vie+eng)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Định dạng kết quả đầu ra:</label>
            <select
              value={ocrFormat}
              onChange={(e) => setOcrFormat(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
            >
              <option value="searchable_pdf">PDF có lớp chữ tìm kiếm được (.pdf)</option>
              <option value="txt">Tệp văn bản thuần (.txt)</option>
            </select>
          </div>
        </div>
      )}

      {/* 8. Metadata Options */}
      {tool.id === 'metadata' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Tiêu đề tài liệu (Title):</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Nhập tiêu đề tài liệu mới..."
                className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#C5C0E6] mb-1">Tác giả (Author):</label>
              <input
                type="text"
                value={metaAuthor}
                onChange={(e) => setMetaAuthor(e.target.value)}
                placeholder="Tên tác giả hoặc cơ quan ban hành..."
                className="w-full px-3 py-2 text-xs bg-[#121025] text-white rounded-xl border border-[#2B2550] focus:border-[#7657F6] focus:outline-none"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-[#C5C0E6] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={metaStripAll}
              onChange={(e) => setMetaStripAll(e.target.checked)}
              className="rounded bg-[#121025] border-[#2E2756] text-[#7657F6] focus:ring-0"
            />
            <span className="text-[#EF4444] font-medium">
              Xóa sạch toàn bộ Metadata ẩn (bảo mật tuyệt đối thông tin thiết bị và ngày tạo)
            </span>
          </label>
        </div>
      )}
    </div>
  );
};
