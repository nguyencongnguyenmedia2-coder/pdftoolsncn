import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Split, RotateCw, Trash2, Copy, Minimize2, Download } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FeatureStatusBadge } from '@/components/ui/ReleaseBadge';
import { DownloadCTA } from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Phần mềm Tách PDF & Chỉnh sửa trang trực quan trên Windows',
  description:
    'Tách file PDF theo từng trang, khoảng trang hoặc số trang cố định. Xem hình ảnh thật của từng trang để xoay 90°, đổi vị trí, xóa trang thừa và nén PDF ngay bên dưới.',
  path: '/features/split-pdf',
  keywords: ['Phần mềm tách PDF', 'Xoay trang PDF', 'Xóa trang PDF', 'Cắt file PDF trên máy tính'],
});

export default function SplitPdfFeaturePage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <Breadcrumb
          items={[
            { name: 'Tính năng', path: '/features' },
            { name: 'Tách & Chỉnh sửa trang PDF', path: '/features/split-pdf' },
          ]}
        />

        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center text-[#A78BFA]">
              <Split className="w-6 h-6" />
            </div>
            <FeatureStatusBadge status="available" label="Đã có (Native + Xem trước ảnh thật)" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tách PDF &amp; Chỉnh sửa từng trang với hình ảnh trực quan
          </h1>

          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            PDF Tools NCN cung cấp hai công cụ bổ trợ chặt chẽ: <strong>Tách PDF</strong> (chia tệp lớn thành nhiều tệp nhỏ theo quy tắc) và <strong>Chỉnh sửa trang</strong> (hiển thị toàn bộ hình ảnh thực tế từng trang để bạn xoay, đổi vị trí, nhân bản, chèn trang trắng, xóa trang thừa và kết hợp nén dung lượng ngay lập tức).
          </p>

          <div className="pt-1">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#7657F6] to-[#5836DB] shadow-glow"
            >
              <Download className="w-4 h-4" />
              <span>Tải PDF Tools NCN cho Windows</span>
            </Link>
          </div>
        </div>

        {/* 3 Modes of Split + Visual Organize features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#151228] border border-[#A78BFA]/20 space-y-4">
            <h2 className="text-lg font-extrabold text-white">
              3 Chế độ Tách PDF chuyên dụng
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A5A0BC]">
              <li className="p-3.5 rounded-xl bg-[#1C1834] border border-[#A78BFA]/15">
                <strong className="text-white block mb-0.5">1. Tách rời từng trang:</strong>
                Mỗi trang trong tài liệu gốc được xuất thành 1 tệp PDF độc lập (ví dụ: 20 trang xuất ra 20 tệp).
              </li>
              <li className="p-3.5 rounded-xl bg-[#1C1834] border border-[#A78BFA]/15">
                <strong className="text-white block mb-0.5">2. Tách theo khoảng trang tùy chọn:</strong>
                Nhập các khoảng trang phân cách bởi dấu phẩy (ví dụ: <code>1-3, 5, 7-10</code>) để trích xuất chính xác các phần cần dùng.
              </li>
              <li className="p-3.5 rounded-xl bg-[#1C1834] border border-[#A78BFA]/15">
                <strong className="text-white block mb-0.5">3. Chia đều theo số trang cố định:</strong>
                Chia tệp PDF lớn thành các tệp nhỏ mà mỗi tệp chứa đúng N trang theo chỉ định.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#151228] border border-[#A78BFA]/20 space-y-4">
            <h2 className="text-lg font-extrabold text-white">
              Tổ hợp thao tác trong Chỉnh sửa trang
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#1C1834] border border-[#A78BFA]/15 space-y-1.5">
                <RotateCw className="w-4 h-4 text-[#A78BFA]" />
                <div className="font-bold text-white">Xoay 90° / 180° / 270°</div>
                <p className="text-[#A5A0BC]">Xoay riêng từng trang bị ngược hoặc xoay đồng loạt tất cả trang.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1C1834] border border-[#A78BFA]/15 space-y-1.5">
                <Trash2 className="w-4 h-4 text-red-400" />
                <div className="font-bold text-white">Xóa &amp; Khôi phục trang</div>
                <p className="text-[#A5A0BC]">Đánh dấu xóa các trang thừa và khôi phục lại bất kỳ lúc nào trước khi xuất.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1C1834] border border-[#A78BFA]/15 space-y-1.5">
                <Copy className="w-4 h-4 text-[#A78BFA]" />
                <div className="font-bold text-white">Đổi vị trí &amp; Nhân bản</div>
                <p className="text-[#A5A0BC]">Di chuyển trang sang trái/phải, nhân bản trang hoặc chèn thêm trang trắng.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1C1834] border border-[#22C55E]/30 space-y-1.5">
                <Minimize2 className="w-4 h-4 text-[#22C55E]" />
                <div className="font-bold text-[#22C55E]">Nén PDF tích hợp</div>
                <p className="text-[#A5A0BC]">Chọn mức nén Nhẹ / Cân bằng / Mạnh ngay bên dưới khung chỉnh sửa trang.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <DownloadCTA />
      </div>
    </div>
  );
}

