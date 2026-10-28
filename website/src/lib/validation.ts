import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Vui lòng nhập họ tên hoặc tên gọi của bạn (ít nhất 2 ký tự).')
    .max(80, 'Họ tên không vượt quá 80 ký tự.'),
  email: z
    .string()
    .trim()
    .email('Vui lòng nhập địa chỉ email hợp lệ để chúng tôi phản hồi.')
    .max(120, 'Email không vượt quá 120 ký tự.'),
  category: z.enum(['support', 'feature', 'bug', 'business'], {
    errorMap: () => ({ message: 'Vui lòng chọn chủ đề liên hệ.' }),
  }),
  appVersion: z
    .string()
    .trim()
    .max(30, 'Phiên bản không vượt quá 30 ký tự.')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .trim()
    .min(5, 'Tiêu đề cần có ít nhất 5 ký tự.')
    .max(150, 'Tiêu đề không vượt quá 150 ký tự.'),
  message: z
    .string()
    .trim()
    .min(15, 'Nội dung chi tiết cần có ít nhất 15 ký tự.')
    .max(2500, 'Nội dung không vượt quá 2500 ký tự.'),
  // Honeypot anti-spam field (must remain empty)
  websiteTrap: z.string().max(0, 'Phát hiện spam tự động.').optional().or(z.literal('')),
  consentPrivacy: z.boolean().refine((val) => val === true, {
    message: 'Vui lòng đồng ý với chính sách quyền riêng tư trước khi gửi.',
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

