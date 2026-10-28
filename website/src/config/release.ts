import { ReleaseConfig } from '@/types';

/**
 * Cấu hình phát hành duy nhất cho bộ cài đặt PDF Tools NCN trên Windows.
 * Có thể ghi đè URL bộ cài qua biến môi trường NEXT_PUBLIC_INSTALLER_URL khi dùng CDN / GitHub Releases / Cloudflare R2.
 */
export const RELEASE_CONFIG: ReleaseConfig = {
  productName: 'PDF Tools NCN',
  publisher: 'NCN Software',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  releaseDate: process.env.NEXT_PUBLIC_RELEASE_DATE || '28/10/2026',
  installerUrl:
    process.env.NEXT_PUBLIC_INSTALLER_URL ||
    '/releases/PDF-Tools-NCN_1.0.0_x64-setup.exe',
  fileSize: '2.97 MB',
  fileSizeBytes: 3115737,
  supportedWindows: 'Windows 10 / Windows 11 (64-bit)',
  architecture: 'x64 (64-bit)',
  sha256: 'd2a4b4abe4e788b5baed73048c54a5c9d0deaf94b9ba6abfc1fe48d33a14fa89',
  releaseNotesUrl: '/changelog',
  downloadAvailable: process.env.NEXT_PUBLIC_DOWNLOAD_AVAILABLE !== 'false',
  minimumRequirements: {
    os: 'Windows 10 (build 1803 trở lên) hoặc Windows 11 (64-bit)',
    cpu: 'Bộ vi xử lý Intel/AMD x64 từ 1.6 GHz trở lên (2 nhân)',
    ram: 'Tối thiểu 4 GB RAM (Khuyến nghị 8 GB khi xử lý PDF trên 100 trang)',
    disk: 'Trống tối thiểu 50 MB cho ứng dụng + dung lượng lưu tệp đầu ra',
    runtime: 'Microsoft Edge WebView2 Runtime (đã tích hợp sẵn trên Windows 10/11 hiện đại)',
    optionalEngines: [
      'Microsoft Office (2016/2019/2021/365) hoặc LibreOffice (tùy chọn khi cần chuyển đổi Word, Excel, PowerPoint ↔ PDF)',
      'Tesseract OCR kèm gói ngôn ngữ vie.traineddata (tùy chọn khi cần nhận dạng văn bản OCR từ PDF scan)',
    ],
  },
  highlights: [
    'Hiển thị hình ảnh thực tế từng trang PDF khi gộp, tách, xoay và xóa trang.',
    'Tích hợp tính năng Nén & Tối ưu dung lượng PDF ngay dưới phần Chỉnh sửa trang.',
    'Tự động nhận diện Microsoft Office có sẵn trên máy hoặc LibreOffice headless để chuyển đổi tài liệu.',
    'Hỗ trợ đóng dấu Watermark chìm, đánh số trang và quản lý Metadata cục bộ.',
  ],
};

