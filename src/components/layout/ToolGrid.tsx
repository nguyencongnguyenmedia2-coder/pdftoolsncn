import React, { useState, useMemo } from 'react';
import {
  Layers,
  Edit3,
  Type,
  FileText,
  Presentation,
  Sheet,
  Image,
  FileCheck2,
  MonitorPlay,
  TableProperties,
  FileImage,
  Split,
  Minimize2,
  Lock,
  ScanText,
  FileQuestion,
  Search,
  X,
} from 'lucide-react';
import { ToolId } from '../../types';
import { TOOLS } from '../../data/tools';

interface ToolGridProps {
  selectedToolId: ToolId;
  onSelectTool: (id: ToolId) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  Edit3,
  Type,
  FileText,
  Presentation,
  Sheet,
  Image,
  FileCheck2,
  MonitorPlay,
  TableProperties,
  FileImage,
  Split,
  Minimize2,
  Lock,
  ScanText,
  FileQuestion,
};

export const ToolGrid: React.FC<ToolGridProps> = ({
  selectedToolId,
  onSelectTool,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'organize' | 'convert' | 'security' | 'edit' | 'ocr'>('all');

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-5 pb-3">
      {/* Search and Category Filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        {/* Category Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-[#15122B] rounded-xl border border-[#272147] overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-[#7657F6] text-white shadow-sm'
                : 'text-[#9692AF] hover:text-white hover:bg-[#1E193C]'
            }`}
          >
            Tất cả công cụ
          </button>
          <button
            onClick={() => setActiveCategory('organize')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === 'organize'
                ? 'bg-[#7657F6] text-white shadow-sm'
                : 'text-[#9692AF] hover:text-white hover:bg-[#1E193C]'
            }`}
          >
            Gộp &amp; Tách
          </button>
          <button
            onClick={() => setActiveCategory('convert')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === 'convert'
                ? 'bg-[#7657F6] text-white shadow-sm'
                : 'text-[#9692AF] hover:text-white hover:bg-[#1E193C]'
            }`}
          >
            Chuyển đổi
          </button>
          <button
            onClick={() => setActiveCategory('edit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === 'edit'
                ? 'bg-[#7657F6] text-white shadow-sm'
                : 'text-[#9692AF] hover:text-white hover:bg-[#1E193C]'
            }`}
          >
            Chỉnh sửa &amp; Dấu
          </button>
          <button
            onClick={() => setActiveCategory('security')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === 'security'
                ? 'bg-[#7657F6] text-white shadow-sm'
                : 'text-[#9692AF] hover:text-white hover:bg-[#1E193C]'
            }`}
          >
            Bảo mật
          </button>
          <button
            onClick={() => setActiveCategory('ocr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === 'ocr'
                ? 'bg-[#7657F6] text-white shadow-sm'
                : 'text-[#9692AF] hover:text-white hover:bg-[#1E193C]'
            }`}
          >
            OCR
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#757094]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm công cụ PDF..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#15122B] text-white rounded-xl border border-[#272147] focus:border-[#7657F6] focus:outline-none focus:ring-1 focus:ring-[#7657F6] transition-all placeholder-[#666185]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#757094] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of tools (5 columns on large screen, matching reference UI) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {filteredTools.map((tool) => {
          const isSelected = tool.id === selectedToolId;
          const IconComponent = ICON_MAP[tool.icon] || FileText;

          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`relative group flex flex-col items-center justify-center p-3.5 rounded-2xl text-center border transition-all duration-200 select-none ${
                isSelected
                  ? 'bg-gradient-to-b from-[#6F4EFA] to-[#5836DB] text-white border-[#8E72FA] shadow-glow transform -translate-y-0.5'
                  : 'bg-[#17142A] text-[#9692AF] hover:text-white hover:bg-[#201B3A] border-[#262047] hover:border-[#4B3F7B]'
              }`}
              title={tool.description}
            >
              {/* Badge if available */}
              {tool.badge && (
                <span
                  className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30'
                  }`}
                >
                  {tool.badge}
                </span>
              )}

              {/* Tool Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110 ${
                  isSelected
                    ? 'bg-white/20 text-white shadow-inner'
                    : 'bg-[#201B3C] text-[#A78BFA] border border-[#302859]'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Tool Name */}
              <span className="text-xs font-semibold tracking-tight line-clamp-1 mb-0.5">
                {tool.name}
              </span>

              {/* Short Description */}
              <span
                className={`text-[10px] line-clamp-1 ${
                  isSelected ? 'text-white/80' : 'text-[#7A7596]'
                }`}
              >
                {tool.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
