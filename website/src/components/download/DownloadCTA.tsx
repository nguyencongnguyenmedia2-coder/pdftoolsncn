'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Monitor,
  Cpu,
  HardDrive,
  Check,
  Copy,
  FileCode2,
  ShieldCheck,
  Calendar,
  Info,
  BookOpen,
} from 'lucide-react';
import { RELEASE_CONFIG } from '@/config/release';
import { trackEvent } from '@/lib/analytics';

export const SystemRequirementsSection: React.FC = () => {
  return (
    <section className="py-14 bg-[#151228]/50 border-t border-[#A78BFA]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/25 text-xs font-semibold text-[#A78BFA]">
            Thông số kỹ thuật thực tế
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
            Yêu cầu hệ thống &amp; Tương thích
          </h2>
          <p className="text-xs sm:text-sm text-[#A5A0BC]">
            Thông tin cấu hình được trích xuất trực tiếp từ bản đóng gói phát hành v{RELEASE_CONFIG.version}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
              <Monitor className="w-4 h-4" />
              <span>Hệ điều hành &amp; Kiến trúc</span>
            </div>
            <p className="text-sm font-bold text-white">{RELEASE_CONFIG.supportedWindows}</p>
            <p className="text-xs text-[#A5A0BC]">{RELEASE_CONFIG.minimumRequirements.os}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
              <Cpu className="w-4 h-4" />
              <span>Bộ nhớ RAM &amp; Vi xử lý</span>
            </div>
            <p className="text-sm font-bold text-white">{RELEASE_CONFIG.minimumRequirements.ram}</p>
            <p className="text-xs text-[#A5A0BC]">{RELEASE_CONFIG.minimumRequirements.cpu}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
              <HardDrive className="w-4 h-4" />
              <span>Dung lượng &amp; Phiên bản</span>
            </div>
            <p className="text-sm font-bold text-white">
              Bộ cài đặt: {RELEASE_CONFIG.fileSize} (v{RELEASE_CONFIG.version})
            </p>
            <p className="text-xs text-[#A5A0BC]">
              Cập nhật ngày: {RELEASE_CONFIG.releaseDate} • {RELEASE_CONFIG.minimumRequirements.disk}
            </p>
          </div>
        </div>

        <div className="mt-5 p-5 rounded-2xl bg-[#1C1834]/80 border border-[#A78BFA]/18 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Info className="w-4 h-4 text-[#A78BFA]" />
            <span>Engine bổ sung tùy chọn (Chỉ cần khi dùng chuyển đổi Office hoặc OCR):</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#A5A0BC]">
            {RELEASE_CONFIG.minimumRequirements.optionalEngines.map((eng, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <span>{eng}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export const DownloadCTA: React.FC = () => {
  const [copiedSha, setCopiedSha] = useState(false);

  const handleCopySha = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(RELEASE_CONFIG.sha256);
      setCopiedSha(true);
      setTimeout(() => setCopiedSha(false), 2500);
    }
  };

  return (
    <section id="tai-ung-dung" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#1C1834] to-[#151228] border border-[#A78BFA]/30 shadow-glow-lg space-y-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-bold text-[#22C55E]">
                <ShieldCheck className="w-4 h-4" />
                <span>Bộ cài đặt Windows 64-bit chính thức</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Sẵn sàng xử lý PDF thuận tiện hơn?
              </h2>
              <p className="text-xs sm:text-sm text-[#A5A0BC] max-w-xl">
                Tải bộ cài đặt {RELEASE_CONFIG.productName} và chủ động thực hiện mọi thao tác gộp, tách, chỉnh sửa trang, nén và chuyển đổi tài liệu ngay trên máy tính của bạn.
              </p>
            </div>

            {/* Download Action Button */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              {RELEASE_CONFIG.downloadAvailable && RELEASE_CONFIG.installerUrl ? (
                <a
                  href={RELEASE_CONFIG.installerUrl}
                  download
                  onClick={() => {
                    trackEvent('download_cta_clicked', { location: 'download_section' });
                    trackEvent('download_started', {
                      version: RELEASE_CONFIG.version,
                      location: 'download_section',
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-[#7657F6] via-[#6646EC] to-[#5836DB] hover:from-[#8668F8] hover:to-[#6747EE] shadow-glow hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  <span>Tải PDF Tools NCN cho Windows</span>
                </a>
              ) : (
                <div className="px-6 py-4 rounded-2xl bg-[#151228] border border-amber-500/30 text-xs font-semibold text-amber-300 text-center">
                  Bản cài đặt đang được hoàn thiện. Vui lòng quay lại sau.
                </div>
              )}

              <div className="flex items-center justify-center gap-4 text-xs text-[#A5A0BC]">
                <Link href="/guide" className="hover:text-[#A78BFA] underline inline-flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Hướng dẫn cài đặt
                </Link>
                <span>•</span>
                <Link href={RELEASE_CONFIG.releaseNotesUrl} className="hover:text-[#A78BFA] underline">
                  Release Notes (v{RELEASE_CONFIG.version})
                </Link>
              </div>
            </div>
          </div>

          {/* Release Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#A78BFA]/15">
            <div className="p-3 rounded-xl bg-[#0D0B18]/70 border border-[#A78BFA]/15">
              <div className="text-[11px] text-[#A5A0BC]">Phiên bản</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                v{RELEASE_CONFIG.version} (Stable)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0D0B18]/70 border border-[#A78BFA]/15">
              <div className="text-[11px] text-[#A5A0BC] flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Ngày phát hành
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {RELEASE_CONFIG.releaseDate}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0D0B18]/70 border border-[#A78BFA]/15">
              <div className="text-[11px] text-[#A5A0BC]">Kích thước bộ cài</div>
              <div className="text-xs sm:text-sm font-bold text-[#22C55E] mt-0.5">
                {RELEASE_CONFIG.fileSize} (Setup.exe)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0D0B18]/70 border border-[#A78BFA]/15">
              <div className="text-[11px] text-[#A5A0BC]">Nhà phát hành</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {RELEASE_CONFIG.publisher}
              </div>
            </div>
          </div>

          {/* SHA-256 Checksum Verification Box */}
          <div className="p-3.5 rounded-2xl bg-[#0D0B18] border border-[#A78BFA]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#A78BFA]">
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Mã kiểm tra toàn vẹn SHA-256 (PDF-Tools-NCN_1.0.0_x64-setup.exe):</span>
              </div>
              <code className="block text-[11px] text-[#F8FAFC] font-mono break-all mt-1">
                {RELEASE_CONFIG.sha256}
              </code>
            </div>

            <button
              type="button"
              onClick={handleCopySha}
              className="px-3 py-1.5 rounded-xl bg-[#1C1834] hover:bg-[#7657F6] text-xs font-semibold text-white border border-[#A78BFA]/25 flex items-center gap-1.5 flex-shrink-0 transition-colors"
            >
              {copiedSha ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép SHA-256</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

