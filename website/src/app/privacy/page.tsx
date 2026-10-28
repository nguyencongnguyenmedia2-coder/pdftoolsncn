import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { RELEASE_CONFIG } from '@/config/release';

export const metadata: Metadata = constructMetadata({
  title: 'Chính sách quyền riêng tư — PDF Tools NCN',
  description:
    'Chính sách quyền riêng tư minh bạch của ứng dụng desktop PDF Tools NCN và website phân phối chính thức. Cam kết xử lý tài liệu cục bộ trên thiết bị người dùng.',
  path: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={[{ name: 'Chính sách quyền riêng tư', path: '/privacy' }]} />

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-semibold text-[#22C55E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cập nhật lần cuối: {RELEASE_CONFIG.releaseDate}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Chính sách quyền riêng tư
          </h1>
          <p className="text-sm text-[#A5A0BC] leading-relaxed">
            Chính sách này mô tả chính xác cách ứng dụng desktop <strong>PDF Tools NCN</strong> và website giới thiệu sản phẩm xử lý dữ liệu của người dùng.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#A5A0BC] leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 space-y-2.5">
            <h2 className="text-base font-bold text-white">
              1. Nguyên tắc xử lý tệp tài liệu trong ứng dụng Desktop
            </h2>
            <p>
              Ứng dụng desktop <strong>PDF Tools NCN</strong> cài đặt trên Windows hoạt động theo nguyên tắc ưu tiên xử lý cục bộ (Local-first):
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[#F8FAFC]/90">
              <li>
                Toàn bộ các thao tác đọc tệp, hiển thị hình ảnh trang xem trước, gộp, tách, xoay trang, nén dung lượng, đóng dấu watermark, chuyển đổi Office và OCR đều được thực thi trực tiếp trên máy tính của bạn.
              </li>
              <li>
                Ứng dụng <strong>không tự động tải nội dung tài liệu PDF, văn bản Office hay hình ảnh</strong> của bạn lên bất kỳ máy chủ từ xa nào.
              </li>
              <li>
                Các công cụ chuyển đổi Office và OCR gọi trực tiếp các chương trình cục bộ trên máy của bạn (như Microsoft Office, LibreOffice hoặc Tesseract OCR) thông qua tiến trình hệ thống nội bộ.
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 space-y-2.5">
            <h2 className="text-base font-bold text-white">
              2. Dữ liệu lưu trữ cục bộ trên máy tính của bạn
            </h2>
            <p>
              Để mang lại sự thuận tiện khi sử dụng, ứng dụng sử dụng một cơ sở dữ liệu SQLite cục bộ (lưu tại thư mục cấu hình người dùng Windows) nhằm ghi nhớ:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[#F8FAFC]/90">
              <li>Cài đặt tùy chọn của bạn (thư mục lưu mặc định, đường dẫn LibreOffice/Tesseract tùy chỉnh).</li>
              <li>Danh sách lịch sử tác vụ gần đây (tên công cụ, đường dẫn tệp đầu vào/đầu ra, thời gian thực hiện).</li>
            </ul>
            <p>
              Ứng dụng <strong>không lưu trữ bản sao nội dung tài liệu</strong> trong cơ sở dữ liệu lịch sử. Bạn có thể nhấn nút <em>&ldquo;Xóa lịch sử&rdquo;</em> ngay trong giao diện ứng dụng bất kỳ lúc nào để làm trống hoàn toàn danh sách này.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 space-y-2.5">
            <h2 className="text-base font-bold text-white">
              3. Khi nào ứng dụng hoặc người dùng có phát sinh kết nối mạng?
            </h2>
            <p>
              Trong quá trình xử lý PDF thông thường, ứng dụng không yêu cầu kết nối Internet. Kết nối mạng chỉ phát sinh khi chính bạn chủ động nhấp vào các liên kết ngoài (ví dụ: liên kết mở trình duyệt để tải LibreOffice, tải Tesseract OCR hoặc truy cập trang hướng dẫn chính thức).
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 space-y-2.5">
            <h2 className="text-base font-bold text-white">
              4. Dữ liệu thu thập trên Website phân phối này
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-[#F8FAFC]/90">
              <li>
                <strong>Biểu mẫu Liên hệ &amp; Góp ý (/contact):</strong> Khi bạn chủ động gửi biểu mẫu hỗ trợ, chúng tôi chỉ ghi nhận Họ tên, Email, Chủ đề, Phiên bản ứng dụng và Nội dung tin nhắn do bạn cung cấp nhằm mục đích phản hồi hỗ trợ kỹ thuật.
              </li>
              <li>
                <strong>Số liệu chuyển đổi ẩn danh:</strong> Nếu tính năng thống kê website được bật, hệ thống chỉ ghi nhận sự kiện tổng hợp (như lượt nhấp nút tải bộ cài hoặc mở trang hướng dẫn) và không thu thập thông tin định danh cá nhân trái phép.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

