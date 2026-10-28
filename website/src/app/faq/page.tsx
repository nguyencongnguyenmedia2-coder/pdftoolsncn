import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, MessageSquarePlus } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FAQAccordion } from '@/components/landing/FAQAccordion';
import { FAQ_ITEMS } from '@/content/faq';

export const metadata: Metadata = constructMetadata({
  title: 'Câu hỏi thường gặp (FAQ) về PDF Tools NCN',
  description:
    'Giải đáp chi tiết các câu hỏi thường gặp về PDF Tools NCN: quyền riêng tư cục bộ, cách gộp/tách/nén PDF, yêu cầu Microsoft Office/LibreOffice và OCR Tiếng Việt.',
  path: '/faq',
  keywords: ['FAQ PDF Tools NCN', 'Hỏi đáp phần mềm PDF Windows', 'PDF Tools NCN có miễn phí không'],
});

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="pt-8 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumb items={[{ name: 'Câu hỏi thường gặp (FAQ)', path: '/faq' }]} />

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/30 text-xs font-semibold text-[#A78BFA]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Trung tâm giải đáp</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Câu hỏi thường gặp (FAQ)
          </h1>
          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            Tổng hợp các câu trả lời minh bạch dựa trên chức năng thực tế của phần mềm PDF Tools NCN trên Windows.
          </p>
        </div>

        <FAQAccordion items={FAQ_ITEMS} />

        <div className="p-6 rounded-3xl bg-[#151228] border border-[#A78BFA]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Bạn vẫn còn câu hỏi khác cần giải đáp?
            </h2>
            <p className="text-xs text-[#A5A0BC] mt-1">
              Gửi câu hỏi hoặc góp ý trực tiếp cho đội ngũ phát triển NCN.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#7657F6] hover:bg-[#6545E6] transition-colors flex-shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Liên hệ hỗ trợ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

