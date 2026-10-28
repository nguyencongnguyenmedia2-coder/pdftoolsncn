export type AnalyticsEventName =
  | 'download_cta_clicked'
  | 'download_started'
  | 'feature_opened'
  | 'guide_opened'
  | 'contact_submitted';

interface AnalyticsEventPayload {
  location?: string;
  version?: string;
  feature?: string;
  topic?: string;
  [key: string]: string | number | boolean | undefined;
}

const ANALYTICS_ENABLED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';

/**
 * Ghi nhận sự kiện chuyển đổi có kiểm soát quyền riêng tư:
 * - Phân biệt rõ click vào nút CTA (download_cta_clicked) và bắt đầu tải file thực tế (download_started).
 * - Không thu thập bất kỳ dữ liệu tài liệu hay thông tin nhạy cảm nào của người dùng.
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsEventPayload = {}
): void {
  if (typeof window === 'undefined') return;

  // Check if user has opted out via localStorage
  try {
    const consent = window.localStorage.getItem('ncn_analytics_consent');
    if (consent === 'declined') return;
  } catch (_) {}

  if (!ANALYTICS_ENABLED) {
    if (process.env.NODE_ENV === 'development') {
      // Helpful non-intrusive debug log in dev mode only
      console.info(`[NCN Event] ${eventName}`, payload);
    }
    return;
  }

  // Dispatch custom DOM event for pluggable analytics providers (Plausible / Vercel Analytics / PostHog)
  try {
    window.dispatchEvent(
      new CustomEvent('ncn:analytics', {
        detail: {
          event: eventName,
          payload,
          timestamp: new Date().toISOString(),
        },
      })
    );
  } catch (_) {}
}

