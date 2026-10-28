import React from 'react';
import { FeatureStatus } from '@/types';
import { RELEASE_CONFIG } from '@/config/release';
import { CheckCircle2, Cpu, ScanText, Clock, Sparkles } from 'lucide-react';

interface StatusBadgeProps {
  status: FeatureStatus;
  label: string;
}

export const FeatureStatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  switch (status) {
    case 'available':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
          <CheckCircle2 className="w-3 h-3" />
          <span>{label}</span>
        </span>
      );
    case 'requires_office':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#7657F6]/20 text-[#A78BFA] border border-[#A78BFA]/30">
          <Cpu className="w-3 h-3" />
          <span>{label}</span>
        </span>
      );
    case 'requires_ocr':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-400/30">
          <ScanText className="w-3 h-3" />
          <span>{label}</span>
        </span>
      );
    case 'beta':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-400/30">
          <Sparkles className="w-3 h-3" />
          <span>{label}</span>
        </span>
      );
    case 'coming_soon':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-500/15 text-[#A5A0BC] border border-slate-500/30">
          <Clock className="w-3 h-3" />
          <span>{label}</span>
        </span>
      );
  }
};

export const ReleaseBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151228] border border-[#A78BFA]/25 text-xs text-[#F8FAFC] shadow-sm ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 font-semibold text-[#A78BFA]">
        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
        Phiên bản v{RELEASE_CONFIG.version}
      </span>
      <span className="text-[#A5A0BC]">•</span>
      <span className="text-[#A5A0BC]">{RELEASE_CONFIG.supportedWindows}</span>
      <span className="text-[#A5A0BC] hidden sm:inline">•</span>
      <span className="text-[#22C55E] font-medium hidden sm:inline">
        Bộ cài {RELEASE_CONFIG.fileSize}
      </span>
    </div>
  );
};

