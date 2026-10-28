import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Split,
  LayoutGrid,
  Stamp,
  FileText,
  PenTool,
  FileCheck2,
  FileSpreadsheet,
  Image as ImageIcon,
  Minimize2,
  FileSearch,
  ScanText,
  Lock,
  ArrowUpRight,
  Check,
  Info,
} from 'lucide-react';
import { FeatureItem } from '@/types';
import { FeatureStatusBadge } from '@/components/ui/ReleaseBadge';

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  Split,
  LayoutGrid,
  Stamp,
  FileText,
  PenTool,
  FileCheck2,
  FileSpreadsheet,
  Image: ImageIcon,
  Minimize2,
  FileSearch,
  ScanText,
  Lock,
};

interface FeatureCardProps {
  feature: FeatureItem;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const Icon = ICON_MAP[feature.icon] || FileText;

  return (
    <div className="group p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 hover:border-[#7657F6] transition-all flex flex-col justify-between shadow-card">
      <div className="space-y-4">
        {/* Header with Icon & Real Status Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#151228] border border-[#A78BFA]/25 flex items-center justify-center text-[#A78BFA] group-hover:bg-[#7657F6] group-hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <FeatureStatusBadge status={feature.status} label={feature.statusLabel} />
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#A78BFA] transition-colors">
            {feature.title}
          </h3>
          <p className="text-xs text-[#A5A0BC] mt-1.5 leading-relaxed">
            {feature.shortDescription}
          </p>
        </div>

        {/* Feature Highlights */}
        <ul className="space-y-1.5 pt-2 border-t border-[#A78BFA]/12">
          {feature.highlights.slice(0, 3).map((hl, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-[#F8FAFC]/90">
              <Check className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" />
              <span>{hl}</span>
            </li>
          ))}
        </ul>

        {/* Dependency Notice if required */}
        {feature.dependencyNote && (
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#151228] border border-[#A78BFA]/20 text-[11px] text-[#A5A0BC]">
            <Info className="w-3.5 h-3.5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
            <span>{feature.dependencyNote}</span>
          </div>
        )}
      </div>

      {/* Footer Link if feature has a dedicated detail page */}
      {feature.slug && (
        <div className="pt-4 mt-4 border-t border-[#A78BFA]/12">
          <Link
            href={`/features/${feature.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A78BFA] hover:text-white transition-colors"
          >
            <span>Xem chi tiết công cụ</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

