import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';

// Simple in-memory rate limiter per IP (protects against rapid form spam)
const ipRateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local-client';
    const now = Date.now();
    const record = ipRateLimitMap.get(clientIp);

    if (record && now < record.resetAt) {
      if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            error:
              'Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau ít phút.',
          },
          { status: 429 }
        );
      }
      record.count += 1;
    } else {
      ipRateLimitMap.set(clientIp, { count: 1, resetAt: now + WINDOW_MS });
    }

    const body = await req.json();

    // Check honeypot anti-spam trap first
    if (body.websiteTrap && String(body.websiteTrap).length > 0) {
      return NextResponse.json({
        ok: true,
        message: 'Đã tiếp nhận phản hồi.',
      });
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message || 'Dữ liệu biểu mẫu không hợp lệ.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { fullName, email, category, appVersion, subject, message } = parsed.data;

    /**
     * Adapter mở rộng:
     * Nếu cấu hình biến môi trường CONTACT_WEBHOOK_URL hoặc SUPABASE_URL ở giai đoạn sau,
     * hệ thống sẽ chuyển tiếp dữ liệu đã xác thực sang dịch vụ lưu trữ mà không cần sửa giao diện.
     */
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          category,
          appVersion,
          subject,
          message,
          submittedAt: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({
      ok: true,
      message: `Cảm ơn ${fullName}! Yêu cầu [${subject}] của bạn đã được ghi nhận thành công.`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Không thể xử lý yêu cầu lúc này. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

