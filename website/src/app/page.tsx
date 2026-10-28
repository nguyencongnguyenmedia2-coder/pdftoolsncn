import React from 'react';
import Link from 'next/link';
import { Download, BookOpen, HelpCircle } from 'lucide-react';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrustStrip, ProblemSolutionSection } from '@/components/landing/TrustStrip';
import { FeatureGrid } from '@/components/features/FeatureGrid';
import { WorkflowSection } from '@/components/landing/WorkflowSection';
import { PrivacySection } from '@/components/landing/PrivacySection';
import { UseCasesSection } from '@/components/landing/UseCases';
import {
  SystemRequirementsSection,
  DownloadCTA,
} from '@/components/download/DownloadCTA';
import { FAQAccordion } from '@/components/landing/FAQAccordion';
import { FAQ_ITEMS } from '@/content/faq';

export default function LandingPage() {
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Trust / Value Strip */}
      <TrustStrip />

      {/* 4. Problem -> Solution */}
      <ProblemSolutionSection />

      {/* 5. Feature Showcase */}
      <FeatureGrid />

      {/* 6. How It Works */}
      <WorkflowSection />

      {/* 7. Privacy Section */}
      <PrivacySection />

      {/* 8. Use Cases */}
      <UseCasesSection />

      {/* 9. System Requirements */}
      <SystemRequirementsSection />

      {/* 10. Download Section */}
      <DownloadCTA />

      {/* 11. FAQ Section */}
      <section id="faq" className="py-16 lg:py-24 bg-[#151228]/40 border-t border-[#A78BFA]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/25 text-xs font-semibold text-[#A78BFA]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Câu hỏi thường gặp</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
              Giải đáp thắc mắc về PDF Tools NCN
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A0BC]">
              Thông tin rõ ràng về tính năng có sẵn, yêu cầu Microsoft Office / LibreOffice, Tesseract OCR và cơ chế bảo vệ quyền riêng tư cục bộ.
            </p>
          </div>

          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* 12. Bottom Final CTA */}
      <section className="py-16 lg:py-24 border-t border-[#A78BFA]/15 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#7657F6]/10 via-transparent to-[#A78BFA]/10 pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Một ứng dụng. Nhiều tác vụ PDF. Quy trình gọn gàng hơn.
          </h2>
          <p className="text-sm sm:text-base text-[#A5A0BC] max-w-2xl mx-auto">
            Khám phá PDF Tools NCN và tìm công cụ phù hợp cho công việc hàng ngày của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/download"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#7657F6] to-[#5836DB] hover:from-[#8668F8] hover:to-[#6747EE] shadow-glow transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Tải ứng dụng</span>
            </Link>
            <Link
              href="/guide"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-[#F8FAFC] bg-[#1C1834] hover:bg-[#262046] border border-[#A78BFA]/30 transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#A78BFA]" />
              <span>Xem hướng dẫn</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

