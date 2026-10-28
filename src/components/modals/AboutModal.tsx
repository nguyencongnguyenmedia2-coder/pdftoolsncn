import React from 'react';
import { X, ShieldCheck, Heart, Cpu } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#141126] border border-[#2D2656] rounded-2xl flex flex-col shadow-2xl overflow-hidden text-center p-6 space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#9692AF] hover:text-white hover:bg-[#252044]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#5836DB] via-[#7657F6] to-[#A78BFA] p-0.5 shadow-glow">
          <div className="w-full h-full bg-[#120F24] rounded-[14px] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#A78BFA]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M9 13v-1h2a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1H9" />
              <path d="M9 17v-4" />
              <path d="M14 13h1.5a1.5 1.5 0 0 1 0 3H14" />
              <path d="M14 13v4" />
            </svg>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">PDF Tools NCN</h2>
          <p className="text-xs text-[#A78BFA] font-medium">Phiên bản 1.0.0 (Windows 64-bit Native)</p>
          <p className="text-xs text-[#8F8AAB] mt-1">
            Ứng dụng Windows EXE xử lý PDF chuyên nghiệp, an toàn và bảo mật trên thiết bị.
          </p>
        </div>

        {/* Privacy Note */}
        <div className="p-3 bg-[#1B1638] rounded-xl border border-[#2D255A] text-left text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#22C55E]">
            <ShieldCheck className="w-4 h-4" />
            <span>Xử lý 100% Cục bộ &amp; Miễn phí</span>
          </div>
          <p className="text-[11px] text-[#A6A0C7] leading-relaxed">
            Phần mềm được phát triển phục vụ cộng đồng, không chứa quảng cáo, không thu thập dữ liệu cá nhân, không tải file lên server.
          </p>
        </div>

        {/* Tech stack */}
        <div className="text-left text-[11px] text-[#8681A6] space-y-1 bg-[#120F24] p-3 rounded-xl border border-[#221B47]">
          <div className="font-semibold text-white flex items-center gap-1 mb-1 text-xs">
            <Cpu className="w-3.5 h-3.5 text-[#7657F6]" /> Công nghệ &amp; Thư viện sử dụng:
          </div>
          <p>• Framework: Tauri 2.x + React 18 + TypeScript + Vite</p>
          <p>• Native Core: Rust, lopdf, image, rusqlite (SQLite)</p>
          <p>• Giao diện: Tailwind CSS, Lucide Icons</p>
          <p>• Bản quyền: Giấy phép nguồn mở MIT / Apache 2.0</p>
        </div>

        {/* Footer */}
        <div className="pt-2 text-xs text-[#7F7A9E] flex items-center justify-center gap-1">
          <span>Phát triển bởi NCN Team</span>
          <span>•</span>
          <span className="flex items-center text-[#EF4444] gap-0.5">
            Dành cho cộng đồng <Heart className="w-3.5 h-3.5 fill-current" />
          </span>
        </div>
      </div>
    </div>
  );
};
