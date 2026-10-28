import React from 'react';
import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { RELEASE_CONFIG } from '@/config/release';

export const metadata: Metadata = constructMetadata({
  title: 'Điều khoản sử dụng — PDF Tools NCN',
  description:
    'Điều khoản cấp phép và sử dụng phần mềm desktop PDF Tools NCN trên hệ điều hành Windows.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={[{ name: 'Điều khoản sử dụng', path: '/terms' }]} />

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/30 text-xs font-semibold text-[#A78BFA]">
            <FileText className="w-3.5 h-3.5" />
            <span>Hiệu lực từ: {RELEASE_CONFIG.releaseDate}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Điều khoản sử dụng
          </h1>
          <p className="text-sm text-[#A5A0BC] leading-relaxed">
            Vui lòng đọc kỹ các điều khoản dưới đây trước khi tải về, cài đặt và sử dụng phần mềm <strong>PDF Tools NCN</strong>.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#A5A0BC] leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 space-y-2">
            <h2 className="text-base font-bold text-white">1. Quyền sử dụng phần mềm</h2>
            <p>
              Thương hiệu NCN cấp cho bạn quyền cài đặt và sử dụng phần mềm <strong>PDF Tools NCN</strong> trên máy tính chạy hệ điều hành Windows để phục vụ nhu cầu học tập, công việc cá nhân và văn phòng hợp pháp. Bạn không được phép dịch ngược mã nguồn, đóng gói lại dưới tên thương hiệu khác để bán thương mại trái phép.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 space-y-2">
            <h2 className="text-base font-bold text-white">
              2. Trách nhiệm đối với tài liệu được xử lý
            </h2>
            <p>
              Người dùng hoàn toàn chịu trách nhiệm về tính hợp pháp và quyền sở hữu đối với các tệp PDF, tài liệu văn phòng và hình ảnh đưa vào phần mềm để xử lý. Tính năng mở khóa hoặc gỡ mật khẩu PDF chỉ được phép sử dụng trên các tài liệu mà bạn có quyền truy cập hợp pháp và biết mật khẩu mở tệp.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 space-y-2">
            <h2 className="text-base font-bold text-white">
              3. Phần mềm và thư viện mã nguồn mở tích hợp
            </h2>
            <p>
              PDF Tools NCN sử dụng các thư viện mã nguồn mở uy tín (Tauri, React, lopdf, pdfjs-dist, rusqlite) theo đúng giấy phép tương ứng (MIT / Apache-2.0). Đối với các tác vụ chuyển đổi Office hoặc OCR, phần mềm có thể tương tác với Microsoft Office (theo bản quyền sẵn có trên máy người dùng), LibreOffice (MPL-2.0) hoặc Tesseract OCR (Apache-2.0) do người dùng cài đặt.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 space-y-2">
            <h2 className="text-base font-bold text-white">
              4. Giới hạn trách nhiệm và sao lưu dữ liệu
            </h2>
            <p>
              Mặc dù PDF Tools NCN luôn xuất kết quả thành tệp mới để tránh ghi đè lên tệp gốc, người dùng vẫn nên duy trì bản sao lưu cho các hồ sơ quan trọng. Phần mềm được cung cấp &ldquo;nguyên trạng&rdquo; (as-is) và đội ngũ phát triển không cam kết rằng việc chuyển đổi định dạng hay nén sẽ đạt độ chính xác tuyệt đối 100% với mọi cấu trúc PDF đặc thù.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

