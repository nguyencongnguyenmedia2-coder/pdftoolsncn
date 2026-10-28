'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { contactFormSchema, ContactFormValues } from '@/lib/validation';
import { RELEASE_CONFIG } from '@/config/release';
import { trackEvent } from '@/lib/analytics';

export const FeedbackForm: React.FC<{ defaultCategory?: ContactFormValues['category'] }> = ({
  defaultCategory = 'support',
}) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      category: defaultCategory,
      appVersion: RELEASE_CONFIG.version,
      subject: '',
      message: '',
      websiteTrap: '',
      consentPrivacy: false,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Không thể gửi biểu mẫu lúc này. Vui lòng thử lại.');
      }

      setSubmitStatus('success');
      setServerMessage(
        data.message ||
          'Cảm ơn bạn! Phản hồi của bạn đã được ghi nhận vào hệ thống hỗ trợ PDF Tools NCN.'
      );
      trackEvent('contact_submitted', { topic: values.category });
      reset();
    } catch (err: any) {
      setSubmitStatus('error');
      setServerMessage(err?.message || 'Đã xảy ra lỗi kết nối khi gửi phản hồi.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="p-6 sm:p-8 rounded-3xl bg-[#1C1834] border border-[#A78BFA]/20 shadow-card space-y-5"
    >
      {/* Anti-spam Honeypot Field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="websiteTrap">Không điền vào trường này</label>
        <input id="websiteTrap" type="text" tabIndex={-1} autoComplete="off" {...register('websiteTrap')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-[#F8FAFC] mb-1.5">
            Họ và tên <span className="text-red-400">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register('fullName')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0B18] border border-[#A78BFA]/25 text-xs sm:text-sm text-white placeholder-[#A5A0BC]/50 focus:outline-none focus:border-[#7657F6]"
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-400 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold text-[#F8FAFC] mb-1.5">
            Địa chỉ Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="ban@congty.vn"
            {...register('email')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0B18] border border-[#A78BFA]/25 text-xs sm:text-sm text-white placeholder-[#A5A0BC]/50 focus:outline-none focus:border-[#7657F6]"
          />
          {errors.email && (
            <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-xs font-bold text-[#F8FAFC] mb-1.5">
            Chủ đề phản hồi <span className="text-red-400">*</span>
          </label>
          <select
            id="category"
            {...register('category')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0B18] border border-[#A78BFA]/25 text-xs sm:text-sm text-white focus:outline-none focus:border-[#7657F6]"
          >
            <option value="support">Hỗ trợ cài đặt &amp; sử dụng</option>
            <option value="feature">Đề xuất tính năng mới</option>
            <option value="bug">Báo lỗi kỹ thuật (Bug report)</option>
            <option value="business">Hợp tác / Triển khai doanh nghiệp</option>
          </select>
          {errors.category && (
            <p className="text-[11px] text-red-400 mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="appVersion" className="block text-xs font-bold text-[#F8FAFC] mb-1.5">
            Phiên bản ứng dụng đang dùng
          </label>
          <input
            id="appVersion"
            type="text"
            placeholder="1.0.0"
            {...register('appVersion')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0B18] border border-[#A78BFA]/25 text-xs sm:text-sm text-white placeholder-[#A5A0BC]/50 focus:outline-none focus:border-[#7657F6]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-bold text-[#F8FAFC] mb-1.5">
          Tiêu đề <span className="text-red-400">*</span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Ví dụ: Đề xuất thêm tính năng tách PDF theo bookmark..."
          {...register('subject')}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0B18] border border-[#A78BFA]/25 text-xs sm:text-sm text-white placeholder-[#A5A0BC]/50 focus:outline-none focus:border-[#7657F6]"
        />
        {errors.subject && (
          <p className="text-[11px] text-red-400 mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-[#F8FAFC] mb-1.5">
          Nội dung chi tiết <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Mô tả chi tiết câu hỏi, ý kiến đóng góp hoặc tình huống lỗi bạn gặp phải..."
          {...register('message')}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0B18] border border-[#A78BFA]/25 text-xs sm:text-sm text-white placeholder-[#A5A0BC]/50 focus:outline-none focus:border-[#7657F6]"
        />
        {errors.message && (
          <p className="text-[11px] text-red-400 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-xs text-[#A5A0BC] cursor-pointer">
          <input
            type="checkbox"
            {...register('consentPrivacy')}
            className="mt-0.5 rounded bg-[#0D0B18] border-[#A78BFA]/30 text-[#7657F6] focus:ring-[#7657F6]"
          />
          <span>
            Tôi đồng ý gửi thông tin liên hệ này theo{' '}
            <Link href="/privacy" className="text-[#A78BFA] underline hover:text-white">
              Chính sách quyền riêng tư
            </Link>{' '}
            để nhận phản hồi hỗ trợ.
          </span>
        </label>
        {errors.consentPrivacy && (
          <p className="text-[11px] text-red-400 mt-1">{errors.consentPrivacy.message}</p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-start gap-2.5 text-xs text-[#22C55E]">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{serverMessage}</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{serverMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitStatus === 'submitting'}
        className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#7657F6] to-[#5836DB] hover:from-[#8668F8] hover:to-[#6747EE] shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {submitStatus === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Đang gửi phản hồi...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Gửi phản hồi &amp; Yêu cầu hỗ trợ</span>
          </>
        )}
      </button>
    </form>
  );
};

