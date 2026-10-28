'use client';

import React from 'react';
import Link from 'next/link';
import { X, Download, ChevronRight, ShieldCheck } from 'lucide-react';
import { MAIN_NAV } from '@/config/navigation';
import { RELEASE_CONFIG } from '@/config/release';
import { trackEvent } from '@/lib/analytics';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Menu điều hướng di động"
    >
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#151228] border-l border-[#A78BFA]/20 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#A78BFA]/15">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <img
                src="/images/logo-ncn.jpg"
                alt="Logo PDF Tools NCN"
                className="w-9 h-9 rounded-xl object-cover border border-[#A78BFA]/30"
              />
              <div>
                <span className="text-sm font-bold text-white block">PDF Tools NCN</span>
                <span className="text-[11px] text-[#A78BFA] block">Windows Desktop Toolkit</span>
              </div>
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng menu"
              className="p-2 rounded-xl text-[#A5A0BC] hover:text-white hover:bg-[#1C1834] focus:outline-none focus:ring-2 focus:ring-[#7657F6]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-5 space-y-1.5" aria-label="Menu chính trên di động">
            {MAIN_NAV.map((item) => (
              <div key={item.href} className="space-y-1">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#F8FAFC] hover:bg-[#1C1834] hover:text-[#A78BFA] transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#A5A0BC]" />
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1 border-l border-[#A78BFA]/15 ml-3">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onClose}
                        className="block px-3 py-1.5 rounded-lg text-xs text-[#A5A0BC] hover:text-white hover:bg-[#1C1834]"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#A78BFA]/15 space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/25 px-3 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>Xử lý tài liệu cục bộ trên máy tính Windows</span>
          </div>

          <Link
            href="/download"
            onClick={() => {
              trackEvent('download_cta_clicked', { location: 'mobile_drawer' });
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7657F6] to-[#5B3BE0] hover:from-[#8567F8] hover:to-[#6949EE] shadow-glow flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Tải ứng dụng (v{RELEASE_CONFIG.version})</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

