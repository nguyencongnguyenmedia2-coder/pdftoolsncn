'use client';

import React from 'react';
import Link from 'next/link';
import { Download, ShieldCheck } from 'lucide-react';
import { FOOTER_LINKS } from '@/config/navigation';
import { PRODUCT_CONFIG } from '@/config/product';
import { RELEASE_CONFIG } from '@/config/release';
import { trackEvent } from '@/lib/analytics';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="border-t border-[#A78BFA]/15 bg-[#0A0814] text-[#A5A0BC] pb-20 sm:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
            {/* Column 1: Brand & Description (2 cols wide on lg) */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/images/logo-ncn.jpg"
                  alt="Logo PDF Tools NCN"
                  className="w-10 h-10 rounded-xl object-cover border border-[#A78BFA]/30"
                />
                <div>
                  <span className="text-base font-extrabold text-white block">
                    {PRODUCT_CONFIG.name}
                  </span>
                  <span className="text-xs text-[#A78BFA] font-medium">
                    Thương hiệu {PRODUCT_CONFIG.brand}
                  </span>
                </div>
              </Link>

              <p className="text-xs leading-relaxed text-[#A5A0BC]">
                {PRODUCT_CONFIG.tagline} {PRODUCT_CONFIG.subTagline}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#151228] border border-[#22C55E]/30 text-xs text-[#22C55E]">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Ưu tiên xử lý cục bộ trên Windows 10/11 (64-bit)</span>
              </div>
            </div>

            {/* Column 2: Sản phẩm */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
                Sản phẩm
              </h3>
              <ul className="space-y-2.5 text-xs">
                {FOOTER_LINKS.product.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#A78BFA] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Hướng dẫn */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
                Hướng dẫn
              </h3>
              <ul className="space-y-2.5 text-xs">
                {FOOTER_LINKS.guides.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#A78BFA] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Hỗ trợ */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
                Hỗ trợ
              </h3>
              <ul className="space-y-2.5 text-xs">
                {FOOTER_LINKS.support.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#A78BFA] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Pháp lý */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
                Pháp lý &amp; Bản quyền
              </h3>
              <ul className="space-y-2.5 text-xs">
                {FOOTER_LINKS.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#A78BFA] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-[#A78BFA]/10 text-[11px] text-[#A5A0BC] space-y-1">
                <div>Phiên bản: v{RELEASE_CONFIG.version}</div>
                <div>Kích thước: {RELEASE_CONFIG.fileSize}</div>
                <div>Hệ điều hành: {RELEASE_CONFIG.supportedWindows}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#A78BFA]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A5A0BC]">
            <p>© {currentYear} NCN. All rights reserved.</p>
            <p className="text-center sm:text-right">
              PDF Tools NCN — Phần mềm xử lý tài liệu PDF trên máy tính Windows.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Download Bar (non-intrusive, only on small screens) */}
      <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-[#151228]/95 backdrop-blur-md border-t border-[#A78BFA]/20 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-bold text-white truncate">PDF Tools NCN (Windows)</div>
          <div className="text-[10px] text-[#22C55E]">
            v{RELEASE_CONFIG.version} • {RELEASE_CONFIG.fileSize} • Xử lý cục bộ
          </div>
        </div>
        <Link
          href="/download"
          onClick={() => trackEvent('download_cta_clicked', { location: 'mobile_sticky_bar' })}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#7657F6] hover:bg-[#6445E8] flex items-center gap-1.5 flex-shrink-0 shadow-glow"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Tải bộ cài</span>
        </Link>
      </div>
    </>
  );
};

