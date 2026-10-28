import React from 'react';
import { Heart, BookOpen, User } from 'lucide-react';

interface FooterProps {
  onOpenHelp: () => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelp, onOpenAbout }) => {
  return (
    <footer className="border-t border-[#231E44] bg-[#0E0C1C] py-3.5 px-6 text-xs text-[#827D9F] select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Author / Brand */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 text-white hover:text-[#A78BFA] transition-colors font-medium"
          >
            <div className="w-5 h-5 rounded-full bg-[#7657F6]/30 flex items-center justify-center text-[#A78BFA]">
              <User className="w-3 h-3" />
            </div>
            <span>PDF Tools NCN</span>
          </button>
          <span className="text-[#3F3963]">•</span>
          <span className="text-[#6B658C]">v1.0.0</span>
        </div>

        {/* Center: Community Pledge */}
        <div className="text-center text-[11px] text-[#7F7A9E] max-w-xl">
          <span>App này được phát triển nhằm đóng góp miễn phí 100% cho cộng đồng; nghiêm cấm mua bán dưới bất kỳ hình thức nào.</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1B1733] hover:bg-[#28214D] text-[#C4BFEB] hover:text-white border border-[#2F275C] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>Hướng Dẫn</span>
          </button>

          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#3B172E] hover:bg-[#4F1D3D] text-[#F472B6] hover:text-white border border-[#5E2248] transition-colors"
          >
            <span>Ủng hộ</span>
            <Heart className="w-3.5 h-3.5 fill-current text-[#F43F5E]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
