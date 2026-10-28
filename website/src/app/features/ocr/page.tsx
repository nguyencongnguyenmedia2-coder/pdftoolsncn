import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ScanText, Languages, Settings, Download, CheckCircle2 } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FeatureStatusBadge } from '@/components/ui/ReleaseBadge';
import { DownloadCTA } from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'OCR Tài liệu Tiếng Việt trên Windows — Nhận dạng chữ từ PDF Scan',
  description:
    'Nhận dạng ký tự quang học (OCR) hỗ trợ tiếng Việt có dấu và tiếng Anh từ tệp PDF scan hoặc hình ảnh trên máy tính Windows thông qua động cơ Tesseract OCR cục bộ.',
  path: '/features/ocr',
  keywords: ['OCR tiếng Việt offline', 'Nhận dạng chữ trong PDF scan', 'Chuyển ảnh scan sang chữ tiếng Việt'],
});

export default function OcrFeaturePage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <Breadcrumb
          items={[
            { name: 'Tính năng', path: '/features' },
            { name: 'OCR Tài liệu Tiếng Việt', path: '/features/ocr' },
          ]}
        />

        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center text-[#A78BFA]">
              <ScanText className="w-6 h-6" />
            </div>
            <FeatureStatusBadge status="requires_ocr" label="Đã có (Tích hợp Tesseract OCR cục bộ)" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Nhận dạng văn bản Tiếng Việt (OCR) từ tài liệu scan &amp; ảnh
          </h1>

          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            Với các tài liệu giấy được quét bằng máy scan hoặc chụp ảnh, nội dung bên trong chỉ là lớp hình ảnh tĩnh không thể bôi đen hay sao chép chữ. Công cụ OCR trong PDF Tools NCN kết nối với động cơ mã nguồn mở <strong>Tesseract OCR</strong> trên máy tính để trích xuất văn bản tiếng Việt có dấu và tiếng Anh hoàn toàn offline.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-2.5">
            <Languages className="w-6 h-6 text-[#A78BFA]" />
            <h2 className="text-base font-bold text-white">Hỗ trợ Tiếng Việt &amp; Song ngữ</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Cho phép chọn chế độ nhận dạng chuyên Tiếng Việt (<code>vie</code>), Tiếng Anh (<code>eng</code>) hoặc kết hợp Song ngữ Việt - Anh (<code>vie+eng</code>) cho các tài liệu kỹ thuật.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-2.5">
            <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
            <h2 className="text-base font-bold text-white">Xuất PDF tìm kiếm được hoặc TXT</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Tùy chọn xuất kết quả thành tệp PDF có lớp chữ tìm kiếm được (Searchable PDF) hoặc xuất thẳng ra tệp văn bản thuần (<code>.txt</code>) để chỉnh sửa nhanh.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-2.5">
            <Settings className="w-6 h-6 text-[#A78BFA]" />
            <h2 className="text-base font-bold text-white">Tự động phát hiện &amp; Hướng dẫn rõ ràng</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Ứng dụng tự động kiểm tra sự tồn tại của <code>tesseract.exe</code> và gói dữ liệu <code>vie.traineddata</code>. Nếu máy chưa cài, ứng dụng hiển thị liên kết tải chính thức và cho phép trỏ đường dẫn tùy chỉnh trong phần Cài đặt.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <DownloadCTA />
      </div>
    </div>
  );
}

