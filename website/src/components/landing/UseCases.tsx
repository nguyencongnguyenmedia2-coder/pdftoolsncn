import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Calculator,
  GraduationCap,
  BookOpen,
  Building2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { USE_CASES } from '@/content/guides';

const ROLE_ICONS: Record<string, React.ElementType> = {
  Briefcase,
  Calculator,
  GraduationCap,
  BookOpen,
  Building2,
};

export const UseCasesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/25 text-xs font-semibold text-[#A78BFA]">
            Ứng dụng thực tiễn
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Thiết kế phù hợp cho nhiều nhóm công việc hàng ngày
          </h2>
          <p className="text-sm sm:text-base text-[#A5A0BC]">
            Dù bạn là nhân viên văn phòng, kế toán, sinh viên, giáo viên hay quản lý doanh nghiệp, PDF Tools NCN đều cung cấp bộ công cụ sát với nhu cầu thực tế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc) => {
            const Icon = ROLE_ICONS[uc.icon] || Briefcase;
            return (
              <div
                key={uc.id}
                className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/18 hover:border-[#7657F6]/60 transition-all flex flex-col justify-between shadow-card"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">
                        {uc.role}
                      </span>
                      <h3 className="text-sm font-bold text-[#F8FAFC] leading-snug mt-0.5">
                        {uc.headline}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#A5A0BC] leading-relaxed">{uc.description}</p>

                  <ul className="space-y-1.5 pt-2 border-t border-[#A78BFA]/12">
                    {uc.tasks.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#F8FAFC]/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {uc.recommendedTools.map((toolName) => (
                      <span
                        key={toolName}
                        className="px-2 py-0.5 rounded-md bg-[#1C1834] border border-[#A78BFA]/20 text-[10px] font-medium text-[#A78BFA]"
                      >
                        {toolName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#A78BFA]/12">
                  <Link
                    href={uc.ctaHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A78BFA] hover:text-white transition-colors"
                  >
                    <span>{uc.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

