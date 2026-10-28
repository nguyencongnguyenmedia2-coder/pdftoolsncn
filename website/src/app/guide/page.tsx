import React from 'react';
import type { Metadata } from 'next';
import { BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { GUIDE_ARTICLES } from '@/content/guides';
import { DownloadCTA } from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Hướng dẫn cài đặt & sử dụng PDF Tools NCN trên Windows',
  description:
    'Tài liệu hướng dẫn từng bước cách cài đặt PDF Tools NCN, gộp/tách/chỉnh sửa trang PDF trực quan, nén giảm dung lượng và cấu hình Microsoft Office, LibreOffice, Tesseract OCR.',
  path: '/guide',
  keywords: ['Hướng dẫn sử dụng PDF Tools NCN', 'Cách gộp PDF trên máy tính', 'Cấu hình OCR tiếng Việt'],
});

export default function GuidePage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb items={[{ name: 'Hướng dẫn sử dụng', path: '/guide' }]} />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/30 text-xs font-semibold text-[#A78BFA]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tài liệu hướng dẫn chính thức</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hướng dẫn cài đặt &amp; sử dụng PDF Tools NCN
          </h1>
          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            Làm chủ toàn bộ các công cụ xử lý PDF trên máy tính Windows của bạn chỉ trong vài phút với hướng dẫn chi tiết từng bước dưới đây.
          </p>
        </div>

        {/* Articles */}
        <div className="space-y-10">
          {GUIDE_ARTICLES.map((article) => (
            <article
              key={article.id}
              id={article.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#151228] border border-[#A78BFA]/20 space-y-6 shadow-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#A78BFA]/15 pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    {article.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A5A0BC] mt-1">
                    {article.summary}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/30 text-xs font-bold text-[#A78BFA]">
                  {article.requirementBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/15 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                      <span>
                        Bước {idx + 1}: {st.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#F8FAFC]/90 leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                ))}
              </div>

              {article.tips && article.tips.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#0D0B18] border border-[#A78BFA]/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#22C55E]">
                    <Lightbulb className="w-4 h-4" />
                    <span>Mẹo hữu ích:</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#A5A0BC] space-y-1">
                    {article.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <DownloadCTA />
      </div>
    </div>
  );
}

