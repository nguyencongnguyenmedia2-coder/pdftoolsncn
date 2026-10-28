import React from 'react';
import type { Metadata } from 'next';
import { History, PlusCircle, Sparkles, Wrench } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CHANGELOG_RELEASES } from '@/content/guides';
import { DownloadCTA } from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Lịch sử cập nhật phiên bản (Changelog) — PDF Tools NCN',
  description:
    'Theo dõi chi tiết các tính năng mới, cải tiến hiệu năng và sửa lỗi qua từng phiên bản phát hành của phần mềm PDF Tools NCN cho Windows.',
  path: '/changelog',
});

export default function ChangelogPage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumb items={[{ name: 'Lịch sử cập nhật (Changelog)', path: '/changelog' }]} />

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/30 text-xs font-semibold text-[#A78BFA]">
            <History className="w-3.5 h-3.5" />
            <span>Nhật ký phát hành</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lịch sử cập nhật phiên bản
          </h1>
          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            Ghi nhận minh bạch các tính năng đã hoàn thiện, nâng cấp thuật toán xử lý PDF và các bản vá lỗi kỹ thuật của PDF Tools NCN.
          </p>
        </div>

        <div className="space-y-8">
          {CHANGELOG_RELEASES.map((rel) => (
            <div
              key={rel.version}
              className="p-6 sm:p-8 rounded-3xl bg-[#151228] border border-[#A78BFA]/25 space-y-6 shadow-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#A78BFA]/15 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-xl bg-[#7657F6] text-white text-sm font-extrabold font-mono">
                    v{rel.version}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-semibold text-[#22C55E]">
                    {rel.badge}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#A5A0BC]">
                  Ngày phát hành: {rel.date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed">
                {rel.summary}
              </p>

              <div className="space-y-5">
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#22C55E] flex items-center gap-1.5">
                    <PlusCircle className="w-4 h-4" />
                    <span>Tính năng mới (Added)</span>
                  </h2>
                  <ul className="space-y-1.5 text-xs text-[#A5A0BC] list-disc list-inside">
                    {rel.added.map((item, i) => (
                      <li key={i} className="text-[#F8FAFC]/90 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Cải tiến &amp; Tối ưu (Improved)</span>
                  </h2>
                  <ul className="space-y-1.5 text-xs text-[#A5A0BC] list-disc list-inside">
                    {rel.improved.map((item, i) => (
                      <li key={i} className="text-[#F8FAFC]/90 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4" />
                    <span>Sửa lỗi (Fixed)</span>
                  </h2>
                  <ul className="space-y-1.5 text-xs text-[#A5A0BC] list-disc list-inside">
                    {rel.fixed.map((item, i) => (
                      <li key={i} className="text-[#F8FAFC]/90 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <DownloadCTA />
      </div>
    </div>
  );
}

