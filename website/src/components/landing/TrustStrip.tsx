import React from 'react';
import {
  Layers,
  Languages,
  ShieldCheck,
  Sparkles,
  Files,
  Scissors,
  FileSpreadsheet,
  Image as ImageIcon,
  Minimize2,
  Stamp,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCT_CONFIG } from '@/config/product';

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  Languages,
  ShieldCheck,
  Sparkles,
  Files,
  Scissors,
  FileSpreadsheet,
  Image: ImageIcon,
  Minimize2,
  Stamp,
};

export const TrustStrip: React.FC = () => {
  return (
    <section
      id="loi-ich"
      className="py-12 border-y border-[#A78BFA]/15 bg-[#151228]/70"
      aria-label="Giá trị cốt lõi của PDF Tools NCN"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CONFIG.valueStrip.map((item) => {
            const Icon = ICON_MAP[item.icon] || Layers;
            return (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 shadow-card flex flex-col justify-between hover:border-[#A78BFA]/40 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#7657F6]/20 border border-[#7657F6]/35 flex items-center justify-center text-[#A78BFA] mb-3.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-sm font-bold text-[#F8FAFC] mb-1.5">{item.title}</h2>
                  <p className="text-xs text-[#A5A0BC] leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/25 text-xs font-semibold text-[#A78BFA]">
            Giải quyết vấn đề thực tế
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Không cần mở quá nhiều công cụ chỉ để xử lý một tài liệu.
          </h2>
          <p className="text-sm sm:text-base text-[#A5A0BC]">
            PDF Tools NCN tập trung các tác vụ PDF thường gặp hàng ngày vào một ứng dụng desktop thống nhất, giúp bạn thao tác liền mạch trên máy tính cá nhân.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_CONFIG.problemsAndSolutions.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Files;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#151228] border border-[#A78BFA]/18 hover:border-[#7657F6]/50 transition-all flex flex-col justify-between space-y-4 shadow-card"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#1C1834] border border-[#A78BFA]/25 flex items-center justify-center text-[#A78BFA]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#A5A0BC]">Tình huống #{idx + 1}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0D0B18]/80 border border-red-500/15">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                      Bất tiện thường gặp
                    </div>
                    <p className="text-xs text-[#A5A0BC] leading-relaxed">{item.problem}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C1834] border border-[#22C55E]/25">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#22C55E] mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Giải pháp trong PDF Tools NCN</span>
                  </div>
                  <p className="text-xs text-[#F8FAFC] leading-relaxed">{item.solution}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

