import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck2, Image as ImageIcon, Cpu, AlertTriangle, Download } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FeatureStatusBadge } from '@/components/ui/ReleaseBadge';
import { DownloadCTA } from '@/components/download/DownloadCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Chuyển đổi Word, Excel, PowerPoint, Ảnh sang PDF và ngược lại',
  description:
    'Chuyển đổi tài liệu Word (.docx), Excel (.xlsx), PowerPoint (.pptx) và Hình ảnh (JPG, PNG) sang PDF trên máy tính Windows. Tự động kết nối Microsoft Office hoặc LibreOffice cục bộ.',
  path: '/features/convert-pdf',
  keywords: ['Chuyển Word sang PDF', 'Chuyển Excel sang PDF', 'Chuyển PDF sang Word', 'Ghép ảnh thành PDF'],
});

export default function ConvertPdfFeaturePage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <Breadcrumb
          items={[
            { name: 'Tính năng', path: '/features' },
            { name: 'Chuyển đổi PDF', path: '/features/convert-pdf' },
          ]}
        />

        <div className="max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <FeatureStatusBadge status="available" label="Ảnh & TXT ↔ PDF: Native" />
            <FeatureStatusBadge
              status="requires_office"
              label="Word / Excel / PPT ↔ PDF: Tích hợp MS Office & LibreOffice"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Chuyển đổi đa định dạng sang PDF và ngược lại ngay trên thiết bị
          </h1>

          <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
            PDF Tools NCN kết hợp bộ xử lý ảnh/văn bản nội tại (Native Rust) cùng cơ chế kết nối tự động với <strong>Microsoft Office</strong> (Word, Excel, PowerPoint đã cài trên máy) hoặc <strong>LibreOffice headless</strong> để chuyển đổi tài liệu văn phòng mà không cần đẩy file lên mạng.
          </p>

          <div className="pt-1">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#7657F6] to-[#5836DB] shadow-glow"
            >
              <Download className="w-4 h-4" />
              <span>Tải PDF Tools NCN cho Windows</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-3">
            <FileCheck2 className="w-6 h-6 text-[#A78BFA]" />
            <h2 className="text-base font-bold text-white">Word, Excel, PPT sang PDF</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Hỗ trợ các định dạng <code>.docx, .doc, .xlsx, .xls, .pptx, .ppt, .odt, .ods, .odp</code>. Giữ nguyên phông chữ, bảng biểu và bố cục trang in nhờ sử dụng trực tiếp engine Microsoft Office hoặc LibreOffice trên máy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-3">
            <ImageIcon className="w-6 h-6 text-[#22C55E]" />
            <h2 className="text-base font-bold text-white">Ghép nhiều Ảnh sang PDF</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Hoạt động độc lập 100% không cần phần mềm phụ trợ. Hỗ trợ ghép hàng loạt ảnh <code>.jpg, .jpeg, .png, .bmp</code> thành tệp PDF chuẩn khổ A4, A3, Letter hoặc vừa đúng kích thước ảnh với tùy chọn lề trang linh hoạt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/20 space-y-3">
            <Cpu className="w-6 h-6 text-[#A78BFA]" />
            <h2 className="text-base font-bold text-white">PDF sang Word, Excel, PPT, TXT</h2>
            <p className="text-xs text-[#A5A0BC] leading-relaxed">
              Trích xuất văn bản thuần sang <code>.txt</code> bằng nhân nội tại, hoặc chuyển đổi PDF sang <code>.docx, .xlsx, .pptx</code> thông qua cơ chế PDF Reflow của Microsoft Office / LibreOffice.
            </p>
          </div>
        </div>

        {/* Transparent Notice about PDF to Office */}
        <div className="p-6 rounded-3xl bg-[#151228] border border-amber-500/25 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm text-[#A5A0BC]">
            <h3 className="font-bold text-white">
              Lưu ý minh bạch về chất lượng chuyển đổi PDF sang Office
            </h3>
            <p className="leading-relaxed">
              Kết quả chuyển đổi từ PDF ngược sang Word, Excel hoặc PowerPoint phụ thuộc trực tiếp vào cấu trúc bên trong của tệp PDF gốc. Các tệp PDF được xuất từ phần mềm văn phòng (có sẵn lớp văn bản chuẩn) sẽ giữ lại bố cục tốt hơn nhiều so với tệp PDF quét từ máy scan (chỉ chứa hình ảnh). Đối với PDF scan, bạn nên sử dụng công cụ <Link href="/features/ocr" className="text-[#A78BFA] underline">OCR Tiếng Việt</Link> trước.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <DownloadCTA />
      </div>
    </div>
  );
}

