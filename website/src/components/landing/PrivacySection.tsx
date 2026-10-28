import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HardDrive, Lock, FolderCheck, ArrowRight } from 'lucide-react';

export const PrivacySection: React.FC = () => {
  const pillars = [
    {
      icon: HardDrive,
      title: 'Ưu tiên xử lý trực tiếp trên máy tính',
      description:
        'Các chức năng đọc cấu trúc PDF, hiển thị hình ảnh trang, gộp, tách, xoay trang, nén và đóng dấu đều vận hành trực tiếp trên CPU và bộ nhớ cục bộ của thiết bị.',
    },
    {
      icon: ShieldCheck,
      title: 'Không tự ý tải tài liệu lên máy chủ',
      description:
        'Ứng dụng không gửi tệp PDF, hợp đồng hay hình ảnh của bạn lên bất kỳ dịch vụ đám mây hay máy chủ bên thứ ba nào trong quá trình xử lý offline.',
    },
    {
      icon: FolderCheck,
      title: 'Người dùng toàn quyền kiểm soát tệp',
      description:
        'Bạn chủ động chọn tệp đầu vào, chọn thư mục xuất kết quả trên ổ cứng và có thể xóa lịch sử tác vụ lưu trong SQLite cục bộ bất kỳ lúc nào.',
    },
    {
      icon: Lock,
      title: 'Minh bạch về cơ chế hoạt động',
      description:
        'Mọi tệp kết quả được lưu thành bản mới để bảo toàn tệp gốc. Công cụ kiểm tra & xóa Metadata giúp bạn loại bỏ thông tin thiết bị ẩn trước khi chia sẻ file.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#151228]/60 border-y border-[#A78BFA]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-bold text-[#22C55E]">
              <ShieldCheck className="w-4 h-4" />
              <span>Quyền riêng tư &amp; Xử lý cục bộ</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
              Tài liệu của bạn, quyền kiểm soát của bạn.
            </h2>

            <p className="text-sm sm:text-base text-[#A5A0BC] leading-relaxed">
              Khi làm việc với hợp đồng kinh tế, bảng lương, chứng từ kế toán hay hồ sơ cá nhân, việc giữ tài liệu nằm yên trên máy tính của chính mình là cách thiết thực để giảm thiểu rủi ro rò rỉ dữ liệu.
            </p>

            <div className="pt-2">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#F8FAFC] bg-[#1C1834] hover:bg-[#7657F6] border border-[#A78BFA]/30 transition-all"
              >
                <span>Xem chính sách quyền riêng tư</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-[#1C1834] border border-[#A78BFA]/18 space-y-2.5 shadow-card"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#F8FAFC]">{item.title}</h3>
                  <p className="text-xs text-[#A5A0BC] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

