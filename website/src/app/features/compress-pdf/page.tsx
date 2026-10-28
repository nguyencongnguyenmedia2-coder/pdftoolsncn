import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Minimize2, CheckCircle2, Download, Layers } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FeatureStatusBadge } from '@/components/ui/ReleaseBadge';
import { DownloadCTA } from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Phần mềm Nén PDF trên máy tính — Giảm dung lượng PDF Offline',
  description:
    'Nén giảm dung lượng tệp PDF trên Windows với 3 mức Nhẹ, Cân bằng và Mạnh. Tối ưu luồng dữ liệu, nén ảnh JPEG nhúng và tích hợp trực tiếp dưới phần Chỉnh sửa trang.',
  path: '/features/compress-pdf',
  keywords: ['Nén PDF trên máy tính', 'Giảm dung lượng PDF offline', 'Phần mềm nén file PDF nhẹ'],
});

export default function CompressPdfFeaturePage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <Breadcrumb
          items={[
            { name: 'Tính năng', path: '/features' },
            { name: 'Nén PDF', path: '/features/compress-pdf' },
          ]}
        />

        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center text-[#A78BFA]">
              <Minimize2 className="w-6 h-6" />
            </div>
            <FeatureStatusBadge status="available" label="Đã có (Native + Tích hợp trong Chỉnh sửa trang)" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Nén &amp; Tối ưu dung lượng PDF chủ động trên máy tính
          </h1>

          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            Các tệp PDF báo giá, catalog sản phẩm hoặc hồ sơ scan thường có dung lượng lớn (20–50 MB) gây khó khăn khi đính kèm email. PDF Tools NCN giúp bạn thu gọn kích thước tệp với 3 mức độ kiểm soát rõ ràng và báo cáo chính xác phần trăm dung lượng tiết kiệm được.
          </p>

          <div className="pt-1">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#7657F6] to-[#5836DB] shadow-glow"
            >
              <Download className="w-4 h-4" />
              <span>Tải PDF Tools NCN để Nén PDF</span>
            </Link>
          </div>
        </div>

        {/* 3 Compression Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-2.5">
            <span className="text-xs font-bold text-[#A78BFA] uppercase">Mức 1</span>
            <h2 className="text-lg font-extrabold text-white">Mức Nhẹ (Bảo toàn nét)</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Nén luồng dữ liệu FlateDecode, dọn dẹp các đối tượng thừa và giữ chất lượng ảnh JPEG ở mức cao (80%, độ phân giải tối đa 2200px). Phù hợp cho tài liệu cần in ấn.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#7657F6] shadow-glow space-y-2.5">
            <span className="text-xs font-bold text-[#22C55E] uppercase">Mức 2 • Khuyên dùng</span>
            <h2 className="text-lg font-extrabold text-white">Mức Cân bằng</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Cân đối giữa dung lượng tệp và độ sắc nét khi xem trên màn hình (chất lượng ảnh 62%, chiều rộng tối đa 1600px), giúp giảm đáng kể kích thước các file catalog nhiều ảnh.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-2.5">
            <span className="text-xs font-bold text-[#A78BFA] uppercase">Mức 3</span>
            <h2 className="text-lg font-extrabold text-white">Mức Mạnh (Email / Lưu trữ)</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Tối ưu hóa kích thước nhỏ nhất có thể kết hợp tự động loại bỏ toàn bộ Metadata và XMP ẩn, giúp gửi tệp nhanh qua Email hoặc ứng dụng nhắn tin.
            </p>
          </div>
        </div>

        {/* Highlight: Integrated underneath Page Editing */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151228] border border-[#22C55E]/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#22C55E]">
            <Layers className="w-4 h-4" />
            <span>Tiện ích 2 trong 1</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Nén PDF ngay bên dưới phần Chỉnh sửa trang
          </h2>
          <p className="text-xs sm:text-sm text-[#A5A0BC] leading-relaxed">
            Bạn không cần phải thực hiện chỉnh sửa trang rồi lại mở sang công cụ Nén PDF một lần nữa. Ngay bên dưới danh sách trang trong mục <strong>Chỉnh sửa trang</strong>, PDF Tools NCN đã tích hợp sẵn bảng chọn mức nén và nút <strong>Nén PDF ngay</strong> để bạn hoàn thành cả việc xoay/xóa trang lẫn giảm dung lượng chỉ trong một lượt thao tác.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-white">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Hiển thị dung lượng gốc và sau khi nén
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Báo cáo % dung lượng tiết kiệm được
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <DownloadCTA />
      </div>
    </div>
  );
}

