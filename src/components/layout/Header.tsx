import React from 'react';
import {
  ShieldCheck,
  History,
  Settings as SettingsIcon,
  HelpCircle,
  Info,
} from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onOpenAbout: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onOpenSettings,
  onOpenHelp,
  onOpenAbout,
  historyCount,
}) => {
  return (
    <header className="border-b border-[#241E3D] bg-[#0F0C1E]/95 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand logo & title */}
        <div className="flex items-center space-x-3.5 cursor-pointer select-none" onClick={onOpenAbout}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-[#5836DB] via-[#7657F6] to-[#A78BFA] p-0.5 shadow-glow">
            <div className="w-full h-full bg-[#120F24] rounded-[10px] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#A78BFA]"
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
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#0D0B18]" />
          </div>

          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#C4B5FD] bg-clip-text text-transparent">
                PDF Tools NCN
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-1.5 animate-pulse" />
                Xử lý trên thiết bị
              </span>
            </div>
            <p className="text-xs text-[#9692AF] flex items-center gap-1.5 mt-0.5">
              <span>Gộp • Chỉnh sửa • Chuyển đổi PDF</span>
              <span className="text-[#4E4870]">•</span>
              <span className="text-[#A78BFA] font-medium flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-0.5 inline" /> Miễn phí &amp; Bảo mật 100%
              </span>
            </p>
          </div>
        </div>

        {/* Action icons / Navigation buttons */}
        <div className="flex items-center space-x-2">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            title="Lịch sử tác vụ"
            className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#C5C0E6] bg-[#1A1633] hover:bg-[#26204A] hover:text-white border border-[#2B2550] transition-colors"
          >
            <History className="w-4 h-4 text-[#A78BFA]" />
            <span className="hidden sm:inline">Lịch sử</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#7657F6] text-white">
                {historyCount > 99 ? '99+' : historyCount}
              </span>
            )}
          </button>

          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            title="Hướng dẫn sử dụng"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#C5C0E6] bg-[#1A1633] hover:bg-[#26204A] hover:text-white border border-[#2B2550] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#A78BFA]" />
            <span className="hidden sm:inline">Hướng dẫn</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            title="Cài đặt hệ thống"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#C5C0E6] bg-[#1A1633] hover:bg-[#26204A] hover:text-white border border-[#2B2550] transition-colors"
          >
            <SettingsIcon className="w-4 h-4 text-[#A78BFA]" />
            <span className="hidden sm:inline">Cài đặt</span>
          </button>

          {/* About Button */}
          <button
            onClick={onOpenAbout}
            title="Thông tin phần mềm"
            className="p-1.5 rounded-lg text-[#9692AF] hover:text-white hover:bg-[#1A1633] border border-transparent hover:border-[#2B2550] transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
