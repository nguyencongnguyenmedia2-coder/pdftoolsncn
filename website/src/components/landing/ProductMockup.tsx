'use client';

import React, { useState } from 'react';
import {
  Layers,
  Edit3,
  FileText,
  Sheet,
  Image as ImageIcon,
  Minimize2,
  Upload,
  RotateCw,
  Trash2,
  Play,
  ShieldCheck,
  CheckCircle2,
  FolderOpen,
} from 'lucide-react';

type MockTab = 'merge' | 'organize' | 'word' | 'excel' | 'image' | 'compress';

export const ProductMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MockTab>('merge');
  const [compressLevel, setCompressLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const tools = [
    { id: 'merge' as const, name: 'Gộp PDF', icon: Layers, badge: 'Phổ biến' },
    { id: 'organize' as const, name: 'Chỉnh sửa trang', icon: Edit3 },
    { id: 'word' as const, name: 'Word > PDF', icon: FileText },
    { id: 'excel' as const, name: 'Excel > PDF', icon: Sheet },
    { id: 'image' as const, name: 'Ảnh > PDF', icon: ImageIcon },
    { id: 'compress' as const, name: 'Nén PDF', icon: Minimize2, badge: 'Tối ưu' },
  ];

  return (
    <div
      className="relative w-full rounded-2xl bg-[#0D0B18] border border-[#A78BFA]/30 shadow-glow-lg overflow-hidden select-none"
      aria-label="Mô phỏng giao diện ứng dụng desktop PDF Tools NCN trên Windows"
    >
      {/* Windows Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#151228] border-b border-[#A78BFA]/15">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/logo-ncn.jpg"
            alt="Biểu tượng ứng dụng PDF Tools NCN"
            className="w-5 h-5 rounded-md object-cover"
          />
          <span className="text-[11px] font-semibold text-[#F8FAFC]">
            PDF Tools NCN — Gộp, Chỉnh sửa &amp; Chuyển đổi PDF
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            Xử lý trên thiết bị
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-2 text-[#A5A0BC] text-xs font-mono">
          <span className="px-1.5 hover:text-white">─</span>
          <span className="px-1.5 hover:text-white">□</span>
          <span className="px-1.5 hover:text-red-400">✕</span>
        </div>
      </div>

      {/* App Dashboard Body */}
      <div className="p-4 sm:p-5 space-y-4 bg-gradient-to-b from-[#0D0B18] to-[#131026]">
        {/* 6 Tool Cards Selector */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTab(tool.id)}
                className={`relative p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#7657F6] to-[#5836DB] text-white border-[#A78BFA] shadow-glow'
                    : 'bg-[#17142A] text-[#A5A0BC] border-[#A78BFA]/15 hover:text-white hover:border-[#A78BFA]/40'
                }`}
              >
                {tool.badge && (
                  <span
                    className={`absolute top-1 right-1 text-[8px] font-bold px-1 rounded ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-[#7657F6]/20 text-[#A78BFA]'
                    }`}
                  >
                    {tool.badge}
                  </span>
                )}
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-semibold line-clamp-1">{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Workspace Preview inside Mockup */}
        <div className="rounded-2xl bg-[#151228] border border-[#A78BFA]/20 p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#A78BFA]/15 pb-2">
            <div className="text-xs font-bold text-white">
              Chế độ đang chọn:{' '}
              <span className="text-[#A78BFA]">
                {tools.find((t) => t.id === activeTab)?.name}
              </span>
            </div>
            <span className="text-[10px] text-[#22C55E] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Sẵn sàng xử lý cục bộ
            </span>
          </div>

          {/* Visual Page Thumbnails Grid (faithful to real app) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#A5A0BC]">
              <span>Xem trước hình ảnh thực tế từng trang tài liệu:</span>
              <span className="text-[#A78BFA] font-medium">3 trang được chọn</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 p-2.5 rounded-xl bg-[#0D0B18] border border-[#A78BFA]/15">
              {[
                { page: 1, title: 'BÌA HỒ SƠ 2026', subtitle: 'Hợp đồng & Phụ lục', rot: 0 },
                { page: 2, title: 'BẢNG BÁO GIÁ', subtitle: 'Chi tiết hạng mục', rot: 0 },
                { page: 3, title: 'ĐIỀU KHOẢN KÝ', subtitle: 'Xác nhận hai bên', rot: 0 },
              ].map((item) => (
                <div
                  key={item.page}
                  className="p-2 rounded-xl bg-[#1C1834] border border-[#A78BFA]/25 flex flex-col items-center"
                >
                  {/* Simulated Real PDF Page Canvas */}
                  <div className="w-full aspect-[1/1.3] bg-white rounded-md p-2 flex flex-col justify-between text-left shadow-sm">
                    <div>
                      <div className="w-8 h-1.5 rounded bg-[#7657F6] mb-1" />
                      <div className="text-[8px] font-extrabold text-slate-900 leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[7px] text-slate-500 mt-0.5">{item.subtitle}</div>
                      <div className="mt-1.5 space-y-1">
                        <div className="h-1 bg-slate-200 rounded w-full" />
                        <div className="h-1 bg-slate-200 rounded w-4/5" />
                        <div className="h-1 bg-slate-200 rounded w-11/12" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[7px] text-slate-400 border-t border-slate-100 pt-1 font-mono">
                      <span>NCN PDF</span>
                      <span>Trang {item.page}/3</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full mt-1.5 px-0.5">
                    <span className="text-[10px] font-semibold text-white">
                      Trang {item.page}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="p-0.5 rounded bg-[#272147] text-[#A78BFA]">
                        <RotateCw className="w-2.5 h-2.5" />
                      </span>
                      <span className="p-0.5 rounded bg-[#272147] text-red-400">
                        <Trash2 className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Compression Bar underneath Page Editing */}
          <div className="p-2.5 rounded-xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <Minimize2 className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Nén &amp; Giảm dung lượng PDF tích hợp:</span>
              </span>
              <span className="text-[10px] text-[#22C55E] font-semibold">
                25.01 MB → ~9.80 MB
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'low' as const, label: 'Nén Nhẹ (~25%)' },
                { id: 'medium' as const, label: 'Cân bằng (~55%)' },
                { id: 'high' as const, label: 'Nén Mạnh (~75%)' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setCompressLevel(lvl.id)}
                  className={`py-1 px-2 rounded-lg text-[10px] font-semibold border transition-colors ${
                    compressLevel === lvl.id
                      ? 'bg-[#7657F6]/25 border-[#7657F6] text-white'
                      : 'bg-[#121025] border-[#A78BFA]/15 text-[#A5A0BC]'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dropzone + Output Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0D0B18] border border-dashed border-[#A78BFA]/30 text-[11px] text-[#A5A0BC] flex-1">
              <Upload className="w-3.5 h-3.5 text-[#A78BFA] flex-shrink-0" />
              <span className="truncate">Hop_Dong_Thiet_Bi_2026.pdf (25.01 MB • 51 trang)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0D0B18] border border-[#A78BFA]/15 text-[10px] text-[#A5A0BC]">
              <FolderOpen className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span className="font-mono text-white">C:\PDF_Tools_Output</span>
            </div>
          </div>

          {/* Execute Button */}
          <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7657F6] via-[#6542F0] to-[#5836DB] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>
              Thực hiện: {tools.find((t) => t.id === activeTab)?.name} &amp; Xuất tệp
            </span>
          </div>
        </div>

        {/* Bottom Privacy Strip inside App Window */}
        <div className="flex items-center justify-between text-[10px] text-[#A5A0BC] px-1">
          <span className="flex items-center gap-1 text-[#A78BFA]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            Xử lý trực tiếp trên máy tính cá nhân của bạn
          </span>
          <span className="font-mono">v1.0.0 • Windows x64</span>
        </div>
      </div>
    </div>
  );
};

