import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Terminal, HelpCircle } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { RELEASE_CONFIG } from '@/config/release';
import {
  DownloadCTA,
  SystemRequirementsSection,
} from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Tải PDF Tools NCN cho Windows 10/11 (64-bit) — Bộ cài Setup.exe',
  description:
    'Tải bộ cài đặt chính thức PDF Tools NCN cho Windows 10 và Windows 11 (64-bit). Kiểm tra mã băm SHA-256, yêu cầu hệ thống và hướng dẫn cài đặt chi tiết.',
  path: '/download',
  keywords: ['Tải PDF Tools NCN', 'Download phần mềm PDF Windows', 'Bộ cài PDF Tools NCN Setup.exe'],
});

export default function DownloadPage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Tải ứng dụng', path: '/download' }]} />

        <div className="max-w-3xl space-y-3 mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tải {RELEASE_CONFIG.productName} cho Windows
          </h1>
          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            Bộ cài đặt chính thức dành cho hệ điều hành {RELEASE_CONFIG.supportedWindows}. Sau khi cài đặt, ứng dụng hoạt động độc lập trên máy tính của bạn mà không cần kết nối mạng.
          </p>
        </div>
      </div>

      {/* Main Download Box with Version, Size, SHA-256, Release Notes */}
      <DownloadCTA />

      {/* Highlights of this version */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151228] border border-[#A78BFA]/20 space-y-5">
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Điểm nổi bật trong phiên bản v{RELEASE_CONFIG.version}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {RELEASE_CONFIG.highlights.map((hl, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/15 text-xs sm:text-sm text-[#F8FAFC]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#0D0B18] border border-[#A78BFA]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
              <Terminal className="w-4 h-4" />
              <span>Hướng dẫn kiểm tra SHA-256 trên Windows PowerShell:</span>
            </div>
            <pre className="text-[11px] font-mono text-[#F8FAFC] overflow-x-auto p-2.5 rounded-xl bg-[#151228]">
              Get-FileHash .\PDF-Tools-NCN_1.0.0_x64-setup.exe -Algorithm SHA256
            </pre>
            <p className="text-[11px] text-[#A5A0BC]">
              So sánh giá trị Hash trả về với mã SHA-256 hiển thị ở trên để xác nhận bộ cài đặt toàn vẹn 100%.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#A78BFA]/15 text-xs text-[#A5A0BC]">
            <span className="inline-flex items-center gap-1.5 text-[#22C55E]">
              <ShieldCheck className="w-4 h-4" />
              Tuân thủ{' '}
              <Link href="/privacy" className="underline hover:text-white">
                Chính sách quyền riêng tư
              </Link>{' '}
              &amp;{' '}
              <Link href="/terms" className="underline hover:text-white">
                Điều khoản sử dụng
              </Link>
            </span>

            <Link
              href="/guide"
              className="inline-flex items-center gap-1.5 font-bold text-[#A78BFA] hover:text-white"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Xem hướng dẫn cài đặt &amp; sử dụng chi tiết</span>
            </Link>
          </div>
        </div>
      </div>

      <SystemRequirementsSection />
    </div>
  );
}

