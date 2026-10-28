'use client';

import React from 'react';
import Link from 'next/link';
import { Download, ArrowRight, Monitor, ShieldCheck, Languages, HardDrive } from 'lucide-react';
import { PRODUCT_CONFIG } from '@/config/product';
import { RELEASE_CONFIG } from '@/config/release';
import { ProductMockup } from './ProductMockup';
import { ReleaseBadge } from '@/components/ui/ReleaseBadge';
import { trackEvent } from '@/lib/analytics';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle Ambient Purple Glows */}
      <div
        className="absolute top-8 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#7657F6]/15 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-[420px] h-[420px] bg-[#A78BFA]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/30 text-[11px] font-bold tracking-wider uppercase text-[#A78BFA]">
                <span>{PRODUCT_CONFIG.eyebrow}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.15]">
                Xử lý PDF dễ dàng.
                <span className="block mt-1.5 bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-[#7657F6] bg-clip-text text-transparent">
                  Hoàn thành công việc nhanh hơn.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed max-w-xl">
                {PRODUCT_CONFIG.heroSubheadline}
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href="/download"
                onClick={() => trackEvent('download_cta_clicked', { location: 'hero_primary' })}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#7657F6] via-[#6646EC] to-[#5836DB] hover:from-[#8668F8] hover:to-[#6747EE] shadow-glow hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              >
                <Download className="w-4 h-4" />
                <span>Tải PDF Tools NCN</span>
                <span className="text-xs px-2 py-0.5 rounded-lg bg-white/20 font-mono">
                  {RELEASE_CONFIG.fileSize}
                </span>
              </Link>

              <Link
                href="/features"
                onClick={() => trackEvent('feature_opened', { location: 'hero_secondary' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-[#F8FAFC] bg-[#151228] hover:bg-[#1C1834] border border-[#A78BFA]/25 hover:border-[#A78BFA]/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#7657F6]"
              >
                <span>Khám phá tính năng</span>
                <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
              </Link>
            </div>

            {/* Release Status Badge */}
            <div>
              <ReleaseBadge />
            </div>

            {/* Supporting Facts Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#A78BFA]/15">
              <div className="flex items-center gap-2.5 text-xs text-[#F8FAFC]">
                <div className="w-8 h-8 rounded-xl bg-[#1C1834] border border-[#A78BFA]/20 flex items-center justify-center text-[#A78BFA] flex-shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Ứng dụng Desktop Windows</div>
                  <div className="text-[11px] text-[#A5A0BC]">Cài đặt độc lập qua Setup.exe</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#F8FAFC]">
                <div className="w-8 h-8 rounded-xl bg-[#1C1834] border border-[#A78BFA]/20 flex items-center justify-center text-[#A78BFA] flex-shrink-0">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Giao diện Tiếng Việt</div>
                  <div className="text-[11px] text-[#A5A0BC]">Trực quan cho mọi đối tượng</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#F8FAFC]">
                <div className="w-8 h-8 rounded-xl bg-[#1C1834] border border-[#22C55E]/25 flex items-center justify-center text-[#22C55E] flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Ưu tiên xử lý cục bộ</div>
                  <div className="text-[11px] text-[#A5A0BC]">Không tải tài liệu lên server</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#F8FAFC]">
                <div className="w-8 h-8 rounded-xl bg-[#1C1834] border border-[#A78BFA]/20 flex items-center justify-center text-[#A78BFA] flex-shrink-0">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Xem hình ảnh trang thật</div>
                  <div className="text-[11px] text-[#A5A0BC]">Gộp, xoay &amp; nén PDF dễ dàng</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Product Mockup */}
          <div className="lg:col-span-6">
            <ProductMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

