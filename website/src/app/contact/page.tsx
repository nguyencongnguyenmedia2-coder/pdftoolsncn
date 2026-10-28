import React from 'react';
import type { Metadata } from 'next';
import { MessageSquare, Lightbulb, Bug, ShieldCheck } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FeedbackForm } from '@/components/forms/FeedbackForm';

export const metadata: Metadata = constructMetadata({
  title: 'Liên hệ hỗ trợ & Đóng góp ý kiến — PDF Tools NCN',
  description:
    'Kênh tiếp nhận phản hồi, hỗ trợ cài đặt, báo lỗi kỹ thuật và đề xuất tính năng mới cho phần mềm PDF Tools NCN trên Windows.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Liên hệ & Hỗ trợ', path: '/contact' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/30 text-xs font-semibold text-[#A78BFA]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Hỗ trợ người dùng &amp; Tiếp nhận góp ý</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Liên hệ với đội ngũ phát triển NCN
              </h1>
              <p className="text-sm text-[#A5A0BC] leading-relaxed">
                Mọi phản hồi về trải nghiệm sử dụng, báo cáo lỗi khi xử lý PDF hoặc đề xuất thêm công cụ mới đều giúp PDF Tools NCN hoàn thiện hơn qua từng bản cập nhật.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-[#151228] border border-[#A78BFA]/18 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-white">Đề xuất tính năng mới</h2>
                  <p className="text-xs text-[#A5A0BC] mt-1">
                    Bạn cần thêm công cụ xử lý PDF chuyên biệt cho công việc kế toán, nhân sự hay kỹ thuật? Hãy mô tả nhu cầu của bạn tại biểu mẫu bên cạnh.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#151228] border border-[#A78BFA]/18 flex items-start gap-3">
                <Bug className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-white">Báo lỗi kỹ thuật (Bug Report)</h2>
                  <p className="text-xs text-[#A5A0BC] mt-1">
                    Khi báo lỗi, vui lòng ghi rõ phiên bản Windows, công cụ đang sử dụng và thông báo lỗi hiển thị để đội ngũ kỹ thuật tái hiện và khắc phục nhanh nhất.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#151228] border border-[#22C55E]/25 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-[#22C55E]">Bảo vệ thông tin liên hệ</h2>
                  <p className="text-xs text-[#A5A0BC] mt-1">
                    Thông tin bạn gửi qua biểu mẫu được kiểm tra xác thực và chỉ dùng để phản hồi yêu cầu hỗ trợ, không chia sẻ cho bên thứ ba.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Form */}
          <div className="lg:col-span-7">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}

