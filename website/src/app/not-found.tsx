import React from 'react';
import Link from 'next/link';
import { Home, Download, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#1C1834] border border-[#A78BFA]/25 text-center space-y-5 shadow-card">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#7657F6]/20 border border-[#7657F6]/40 text-2xl font-extrabold text-[#A78BFA]">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white">
          Không tìm thấy trang bạn yêu cầu
        </h1>
        <p className="text-xs sm:text-sm text-[#A5A0BC] leading-relaxed">
          Đường dẫn này không tồn tại hoặc đã được di chuyển. Bạn có thể quay về trang chủ hoặc truy cập trực tiếp danh mục tính năng của PDF Tools NCN.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#7657F6] hover:bg-[#6545E6] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang chủ</span>
          </Link>
          <Link
            href="/features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#151228] hover:bg-[#241E42] border border-[#A78BFA]/25 transition-colors"
          >
            <Compass className="w-4 h-4 text-[#A78BFA]" />
            <span>Xem tính năng</span>
          </Link>
          <Link
            href="/download"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Tải ứng dụng</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

