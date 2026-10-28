import React from 'react';
import {
  Download,
  LayoutGrid,
  FileUp,
  Sliders,
  FolderCheck,
} from 'lucide-react';
import { WORKFLOW_STEPS } from '@/content/guides';

const STEP_ICONS: Record<string, React.ElementType> = {
  Download,
  LayoutGrid,
  FileUp,
  Sliders,
  FolderCheck,
};

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/25 text-xs font-semibold text-[#A78BFA]">
            Quy trình sử dụng
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Bắt đầu chỉ với vài thao tác.
          </h2>
          <p className="text-sm sm:text-base text-[#A5A0BC]">
            Từ lúc cài đặt đến khi hoàn thành xử lý tệp PDF đầu tiên chỉ mất chưa đầy một phút.
          </p>
        </div>

        {/* 5 Steps with Horizontal Progress Line on Desktop */}
        <div className="relative">
          <div
            className="hidden lg:block absolute top-10 left-12 right-12 h-0.5 bg-gradient-to-r from-[#7657F6]/20 via-[#7657F6] to-[#22C55E]/40"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {WORKFLOW_STEPS.map((item) => {
              const Icon = STEP_ICONS[item.icon] || Download;
              return (
                <div
                  key={item.step}
                  className="p-5 rounded-2xl bg-[#151228] border border-[#A78BFA]/18 hover:border-[#7657F6] transition-all flex flex-col items-start shadow-card"
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7657F6] to-[#5836DB] text-white flex items-center justify-center shadow-glow">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1C1834] border border-[#A78BFA]/25 text-[11px] font-bold text-[#A78BFA]">
                      Bước {item.step}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#F8FAFC] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A5A0BC] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

