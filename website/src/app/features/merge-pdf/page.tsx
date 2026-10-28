import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, CheckCircle2, Download, Eye, ArrowUpDown, FileStack } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FeatureStatusBadge } from '@/components/ui/ReleaseBadge';
import { DownloadCTA } from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Phần mềm Gộp PDF trên máy tính Windows — Xem trước trang trực quan',
  description:
    'Ghép nối nhiều tệp PDF thành một tài liệu hoàn chỉnh trên Windows với PDF Tools NCN. Xem trước hình ảnh từng trang, đổi thứ tự tệp và chọn khoảng trang cần gộp hoàn toàn offline.',
  path: '/features/merge-pdf',
  keywords: ['Phần mềm gộp PDF', 'Ghép file PDF trên máy tính', 'Gộp PDF offline Windows'],
});

export default function MergePdfFeaturePage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <Breadcrumb
          items={[
            { name: 'Tính năng', path: '/features' },
            { name: 'Gộp PDF', path: '/features/merge-pdf' },
          ]}
        />

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center text-[#A78BFA]">
                <Layers className="w-6 h-6" />
              </div>
              <FeatureStatusBadge status="available" label="Đã có (Hoạt động Native Offline)" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Gộp nhiều file PDF nhanh chóng, nhìn rõ hình ảnh từng trang
            </h1>

            <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
              Không còn cảnh gộp nhầm thứ tự tệp hay phải mở từng file PDF bên ngoài để kiểm tra nội dung. Trong PDF Tools NCN, mỗi tệp PDF bạn thêm vào đều hiển thị ngay ảnh bìa và lưới hình ảnh thực tế của các trang bên trong.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#7657F6] to-[#5836DB] shadow-glow"
              >
                <Download className="w-4 h-4" />
                <span>Tải PDF Tools NCN để Gộp PDF</span>
              </Link>
              <Link
                href="/features/split-pdf"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white bg-[#1C1834] border border-[#A78BFA]/25"
              >
                <span>Xem thêm: Tách &amp; Chỉnh sửa trang</span>
              </Link>
            </div>
          </div>

          {/* Visual Illustration of Merge Tool */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#151228] border border-[#A78BFA]/25 space-y-4 shadow-card">
            <div className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider">
              Minh họa quy trình Gộp PDF trực quan
            </div>
            {[
              { idx: 1, name: '01_Hop_Dong_Chinh_2026.pdf', pages: '12 trang', range: 'Tất cả (1-12)' },
              { idx: 2, name: '02_Phu_Luc_Bang_Gia.pdf', pages: '5 trang', range: 'Trang 1-3' },
              { idx: 3, name: '03_Bien_Ban_Nghiem_Thu.pdf', pages: '4 trang', range: 'Tất cả (1-4)' },
            ].map((f) => (
              <div
                key={f.idx}
                className="p-3.5 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-extrabold text-[#7657F6]">#{f.idx}</span>
                  <div className="w-9 h-12 rounded bg-white text-slate-900 p-1 flex flex-col justify-between flex-shrink-0">
                    <div className="w-full h-1 bg-[#7657F6] rounded" />
                    <span className="text-[7px] font-bold text-center">PDF</span>
                    <div className="h-0.5 bg-slate-300 w-full" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{f.name}</div>
                    <div className="text-[11px] text-[#A5A0BC]">{f.pages}</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#0D0B18] border border-[#A78BFA]/20 text-[10px] font-mono text-[#A78BFA] flex-shrink-0">
                  {f.range}
                </span>
              </div>
            ))}
            <div className="p-3 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-bold text-[#22C55E] text-center">
              → Xuất thành: Bo_Ho_So_Hoan_Chinh.pdf (19 trang)
            </div>
          </div>
        </div>

        {/* 3 Key Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 space-y-2.5">
            <Eye className="w-6 h-6 text-[#A78BFA]" />
            <h2 className="text-base font-bold text-white">Xem lưới hình ảnh từng trang</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Mỗi tệp PDF trong danh sách chờ gộp đều có thể mở rộng để xem hình ảnh thu nhỏ của toàn bộ các trang, hoặc nhấn vào từng trang để phóng to kiểm tra nội dung.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 space-y-2.5">
            <ArrowUpDown className="w-6 h-6 text-[#A78BFA]" />
            <h2 className="text-base font-bold text-white">Đổi thứ tự &amp; Chọn khoảng trang</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Sắp xếp thứ tự tệp trước sau dễ dàng. Nếu một tệp có 50 trang nhưng bạn chỉ cần lấy trang 1 đến trang 5 để ghép vào hồ sơ, chỉ cần nhập `1-5` tại ô phạm vi trang.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 space-y-2.5">
            <FileStack className="w-6 h-6 text-[#22C55E]" />
            <h2 className="text-base font-bold text-white">Xử lý cục bộ, bảo toàn chất lượng</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Quá trình ghép nối các cây đối tượng (PDF Object Tree) diễn ra trực tiếp bằng nhân Rust trên máy tính của bạn, giữ nguyên độ nét văn bản và hình ảnh của các trang gốc.
            </p>
          </div>
        </div>

        {/* Step-by-step */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151228] border border-[#A78BFA]/20 space-y-4">
          <h2 className="text-xl font-extrabold text-white">
            Hướng dẫn 4 bước Gộp PDF trên PDF Tools NCN
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Mở ứng dụng và chọn thẻ "Gộp PDF" ở vị trí đầu tiên trên bảng công cụ.',
              'Kéo thả nhiều tệp PDF vào khung làm việc hoặc nhấn nút "Chọn tệp từ máy tính".',
              'Kiểm tra hình ảnh các trang, dùng mũi tên Lên/Xuống để sắp xếp thứ tự và nhập phạm vi trang nếu cần.',
              'Nhấn nút "Thực hiện: Gộp PDF" để lưu tệp hoàn chỉnh vào thư mục đầu ra.',
            ].map((step, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/15 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>Bước {i + 1}</span>
                </div>
                <p className="text-xs text-[#F8FAFC] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <DownloadCTA />
      </div>
    </div>
  );
}

