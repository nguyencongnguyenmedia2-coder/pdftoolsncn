import React from 'react';
import { X, HelpCircle, ShieldCheck, Cpu, Zap } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#141126] border border-[#2D2656] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252044] bg-[#181430]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#251F47] flex items-center justify-center text-[#A78BFA]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Hướng dẫn sử dụng PDF Tools NCN</h2>
              <p className="text-xs text-[#9692AF]">Bộ công cụ xử lý PDF chuyên nghiệp chạy độc lập trên Windows</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9692AF] hover:text-white hover:bg-[#252044]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#C5C0E6] leading-relaxed">
          {/* Privacy Box */}
          <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#22C55E] text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Cam kết quyền riêng tư 100% Offline</span>
            </div>
            <p className="text-[#D1D5DB]">
              PDF Tools NCN hoạt động hoàn toàn cục bộ trên máy tính của bạn thông qua nhân xử lý Rust hiệu năng cao.
              Không có bất kỳ dữ liệu, tệp tin hay nội dung tài liệu nào được gửi lên Internet.
            </p>
          </div>

          {/* Quick steps */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#A78BFA]" /> Các bước sử dụng nhanh:
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-[#9692AF]">
              <li>
                <strong className="text-white">Chọn công cụ:</strong> Nhấp chọn công cụ bạn cần ở thanh menu phía trên (Gộp PDF, Chỉnh sửa trang, Nén PDF, Ảnh sang PDF, OCR...).
              </li>
              <li>
                <strong className="text-white">Thêm tệp:</strong> Kéo và thả tệp PDF hoặc ảnh vào vùng làm việc, hoặc nhấn nút &ldquo;Chọn tệp từ máy tính&rdquo;.
              </li>
              <li>
                <strong className="text-white">Tùy chỉnh thông số:</strong> Điều chỉnh khoảng trang, mức độ nén, chữ watermark chìm hoặc khổ giấy nếu cần.
              </li>
              <li>
                <strong className="text-white">Thực hiện:</strong> Nhấn nút &ldquo;Thực hiện&rdquo; màu tím. Tiến trình sẽ hiển thị thời gian thực và tự động thông báo khi hoàn thành kèm nút mở tệp.
              </li>
            </ol>
          </div>

          {/* Core tools details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#A78BFA]" /> Chi tiết từng nhóm chức năng:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#17142A] border border-[#262047]">
                <h4 className="font-bold text-white mb-1 text-xs">Gộp PDF (Merge)</h4>
                <p className="text-[11px] text-[#8C87AC]">
                  Ghép nhiều tệp PDF lại với nhau. Bạn có thể kéo thả thay đổi thứ tự và chọn phạm vi trang riêng biệt cho từng tệp (ví dụ trang 1-5).
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#17142A] border border-[#262047]">
                <h4 className="font-bold text-white mb-1 text-xs">Tách PDF (Split)</h4>
                <p className="text-[11px] text-[#8C87AC]">
                  Hỗ trợ 3 chế độ: tách từng trang thành từng file riêng lẻ, tách theo khoảng trang tùy chỉnh (ví dụ 1-3, 4-6), hoặc chia đều N trang mỗi file.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#17142A] border border-[#262047]">
                <h4 className="font-bold text-white mb-1 text-xs">Chỉnh sửa &amp; Sắp xếp</h4>
                <p className="text-[11px] text-[#8C87AC]">
                  Xem trước từng trang dạng lưới, xoay 90° từng trang theo chiều kim đồng hồ, xóa trang thừa hoặc chèn trang trắng nhanh chóng.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#17142A] border border-[#262047]">
                <h4 className="font-bold text-white mb-1 text-xs">Nén &amp; Tối ưu PDF</h4>
                <p className="text-[11px] text-[#8C87AC]">
                  Sử dụng thuật toán FlateDecode để nén các luồng dữ liệu, loại bỏ đối tượng mồ côi và metadata giúp tiết kiệm từ 30% đến 80% dung lượng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-[#252044] bg-[#181430]">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-[#7657F6] text-white hover:bg-[#8B6EF8]"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
