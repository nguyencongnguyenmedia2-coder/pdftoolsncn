import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FEATURE_GROUPS, ALL_FEATURES } from '@/content/features';
import { FeatureCard } from '@/components/features/FeatureCard';
import { DownloadCTA } from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Tổng hợp tính năng xử lý PDF trên Windows',
  description:
    'Khám phá toàn bộ các nhóm công cụ trong PDF Tools NCN: Gộp PDF, Tách & Chỉnh sửa trang trực quan, Nén giảm dung lượng, Chuyển đổi Word/Excel/PPT/Ảnh và OCR Tiếng Việt.',
  path: '/features',
  keywords: ['Tính năng PDF Tools NCN', 'Bộ công cụ PDF Windows', 'Phần mềm xử lý PDF offline'],
});

export default function FeaturesPage() {
  const dedicatedPages = [
    {
      title: 'Gộp PDF (Merge PDF)',
      href: '/features/merge-pdf',
      summary: 'Ghép nhiều file PDF, sắp xếp thứ tự và chọn phạm vi trang trực quan.',
    },
    {
      title: 'Tách & Chỉnh sửa trang (Split & Organize)',
      href: '/features/split-pdf',
      summary: 'Tách từng trang, khoảng trang, xoay 90° và xóa trang thừa với hình ảnh thật.',
    },
    {
      title: 'Nén & Tối ưu PDF (Compress PDF)',
      href: '/features/compress-pdf',
      summary: 'Giảm dung lượng PDF theo 3 mức Nhẹ, Cân bằng và Mạnh ngay sau khi sửa trang.',
    },
    {
      title: 'Chuyển đổi PDF (Word, Excel, PPT, Ảnh)',
      href: '/features/convert-pdf',
      summary: 'Chuyển đổi hai chiều giữa PDF và các định dạng văn phòng, hình ảnh phổ biến.',
    },
    {
      title: 'OCR Tiếng Việt (Nhận dạng ký tự)',
      href: '/features/ocr',
      summary: 'Quét nhận dạng chữ tiếng Việt và tiếng Anh từ tài liệu scan bằng Tesseract OCR.',
    },
  ];

  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Tính năng', path: '/features' }]} />

        <div className="max-w-3xl space-y-4 mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/30 text-xs font-semibold text-[#A78BFA]">
            5 Nhóm Công Cụ Chuyên Biệt
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tổng hợp tính năng của PDF Tools NCN
          </h1>
          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            Mỗi công cụ được thiết kế để giải quyết nhanh gọn các thao tác tài liệu hàng ngày trên máy tính Windows, phân định rõ các tính năng chạy trực tiếp (Native) và các tính năng tích hợp cùng Microsoft Office, LibreOffice hoặc Tesseract OCR.
          </p>
        </div>

        {/* Quick Links to 5 Dedicated Feature Subpages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {dedicatedPages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="p-4 rounded-2xl bg-[#151228] border border-[#A78BFA]/20 hover:border-[#7657F6] transition-all flex flex-col justify-between group"
            >
              <div>
                <h2 className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                  {p.title}
                </h2>
                <p className="text-[11px] text-[#A5A0BC] mt-1.5 leading-relaxed">{p.summary}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A78BFA] mt-3">
                <span>Tìm hiểu sâu</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>

        {/* All 5 Feature Groups */}
        <div className="space-y-16">
          {FEATURE_GROUPS.map((group) => {
            const items = ALL_FEATURES.filter((f) => f.groupId === group.id);
            return (
              <section key={group.id} id={group.id} className="space-y-6">
                <div className="border-b border-[#A78BFA]/15 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      {group.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A5A0BC] mt-1">
                      {group.description}
                    </p>
                  </div>
                  <Link
                    href="/download"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A78BFA] hover:text-white"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải ứng dụng để trải nghiệm</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <div className="mt-16">
        <DownloadCTA />
      </div>
    </div>
  );
}

