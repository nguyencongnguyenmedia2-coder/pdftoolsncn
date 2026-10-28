'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Download, ChevronDown } from 'lucide-react';
import { MAIN_NAV } from '@/config/navigation';
import { RELEASE_CONFIG } from '@/config/release';
import { MobileMenu } from './MobileMenu';
import { trackEvent } from '@/lib/analytics';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#A78BFA]/15 bg-[#0D0B18]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#7657F6] rounded-xl"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#A78BFA]/35 shadow-glow flex-shrink-0">
              <img
                src="/images/logo-ncn.jpg"
                alt="Logo PDF Tools NCN"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                  PDF Tools <span className="text-[#A78BFA]">NCN</span>
                </span>
                <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                  Windows EXE
                </span>
              </div>
              <p className="text-[11px] text-[#A5A0BC] hidden sm:block">
                Gộp • Chỉnh sửa • Nén &amp; Chuyển đổi PDF cục bộ
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Điều hướng chính">
            {MAIN_NAV.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href.split('#')[0]) && item.href !== '/#loi-ich';

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#1C1834] text-[#A78BFA]'
                          : 'text-[#F8FAFC] hover:text-[#A78BFA] hover:bg-[#151228]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#A5A0BC]" />
                    </Link>

                    {dropdownOpen && (
                      <div className="absolute left-0 top-full pt-2 w-72 z-50">
                        <div className="bg-[#151228] border border-[#A78BFA]/20 rounded-2xl p-2 shadow-2xl space-y-1">
                          {item.children.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setDropdownOpen(false)}
                              className="block p-2.5 rounded-xl hover:bg-[#1C1834] transition-colors"
                            >
                              <div className="text-xs font-bold text-white">{sub.label}</div>
                              <div className="text-[11px] text-[#A5A0BC] mt-0.5">
                                {sub.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#1C1834] text-[#A78BFA]'
                      : 'text-[#F8FAFC] hover:text-[#A78BFA] hover:bg-[#151228]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/download"
              onClick={() => trackEvent('download_cta_clicked', { location: 'navbar' })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7657F6] to-[#5C3DE0] hover:from-[#876AF8] hover:to-[#6949EE] shadow-glow transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải miễn phí</span>
              <span className="hidden sm:inline text-[10px] px-1.5 py-0.2 rounded bg-white/20 font-mono">
                v{RELEASE_CONFIG.version}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2 rounded-xl bg-[#151228] border border-[#A78BFA]/20 text-[#F8FAFC] hover:text-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#7657F6]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

