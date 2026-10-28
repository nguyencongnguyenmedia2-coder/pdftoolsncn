export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description: string;
  }[];
}

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Trang chủ',
    href: '/',
  },
  {
    label: 'Tính năng',
    href: '/features',
    children: [
      {
        label: 'Tổng hợp tính năng',
        href: '/features',
        description: 'Toàn bộ các nhóm công cụ xử lý PDF trong ứng dụng',
      },
      {
        label: 'Gộp PDF',
        href: '/features/merge-pdf',
        description: 'Ghép nhiều file PDF, sắp xếp thứ tự và chọn khoảng trang',
      },
      {
        label: 'Tách & Chỉnh sửa trang',
        href: '/features/split-pdf',
        description: 'Tách trang, xoay 90°, đổi thứ tự và xóa trang trực quan',
      },
      {
        label: 'Nén PDF',
        href: '/features/compress-pdf',
        description: 'Giảm dung lượng tệp PDF với 3 mức nén tùy chọn',
      },
      {
        label: 'Chuyển đổi PDF',
        href: '/features/convert-pdf',
        description: 'Chuyển đổi Word, Excel, PowerPoint, Ảnh sang PDF và ngược lại',
      },
      {
        label: 'OCR Tiếng Việt',
        href: '/features/ocr',
        description: 'Nhận dạng văn bản tiếng Việt từ tài liệu PDF scan và ảnh',
      },
    ],
  },
  {
    label: 'Lợi ích',
    href: '/#loi-ich',
  },
  {
    label: 'Hướng dẫn',
    href: '/guide',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: 'Liên hệ',
    href: '/contact',
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Tổng quan tính năng', href: '/features' },
    { label: 'Gộp & Sắp xếp PDF', href: '/features/merge-pdf' },
    { label: 'Tách & Chỉnh sửa trang', href: '/features/split-pdf' },
    { label: 'Nén giảm dung lượng PDF', href: '/features/compress-pdf' },
    { label: 'Chuyển đổi Office & Ảnh', href: '/features/convert-pdf' },
    { label: 'Nhận dạng ký tự OCR', href: '/features/ocr' },
  ],
  guides: [
    { label: 'Tải & Cài đặt ứng dụng', href: '/download' },
    { label: 'Hướng dẫn sử dụng chi tiết', href: '/guide' },
    { label: 'Cấu hình Office & OCR', href: '/guide#cau-hinh-engine' },
    { label: 'Lịch sử cập nhật (Changelog)', href: '/changelog' },
  ],
  support: [
    { label: 'Câu hỏi thường gặp (FAQ)', href: '/faq' },
    { label: 'Gửi phản hồi & Góp ý', href: '/contact' },
    { label: 'Đề xuất tính năng mới', href: '/contact?type=feature' },
    { label: 'Báo lỗi kỹ thuật', href: '/contact?type=bug' },
  ],
  legal: [
    { label: 'Chính sách quyền riêng tư', href: '/privacy' },
    { label: 'Điều khoản sử dụng', href: '/terms' },
  ],
};

