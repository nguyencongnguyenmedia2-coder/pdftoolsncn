import { FAQItem } from '@/types';

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'what-is-pdf-tools-ncn',
    category: 'general',
    question: 'PDF Tools NCN là gì?',
    answer:
      'PDF Tools NCN là ứng dụng desktop dành cho hệ điều hành Windows 10 và Windows 11 (64-bit), tích hợp các công cụ xử lý tài liệu PDF phổ biến như gộp PDF, tách trang, xoay & sắp xếp trang trực quan, nén giảm dung lượng, đóng dấu watermark, đánh số trang, chuyển đổi định dạng Office/Ảnh và OCR tiếng Việt trong một giao diện tiếng Việt thống nhất.',
  },
  {
    id: 'is-it-free',
    category: 'general',
    question: 'Ứng dụng có miễn phí không?',
    answer:
      'Phiên bản hiện tại (v1.0.0) của PDF Tools NCN được phát hành miễn phí để tải về và sử dụng đầy đủ các tính năng trên máy tính cá nhân Windows, không yêu cầu đăng ký tài khoản và không gắn nhãn bản quyền (watermark) bắt buộc lên tài liệu đầu ra của bạn.',
  },
  {
    id: 'does-it-need-internet',
    category: 'privacy',
    question: 'Ứng dụng có cần kết nối Internet khi sử dụng không?',
    answer:
      'Không. Sau khi bạn đã tải và cài đặt PDF Tools NCN lên máy tính, toàn bộ các chức năng xử lý PDF đều hoạt động offline 100% mà không phụ thuộc vào kết nối mạng.',
  },
  {
    id: 'are-files-uploaded',
    category: 'privacy',
    question: 'Tài liệu của tôi có bị tải lên máy chủ (server) nào không?',
    answer:
      'Không. PDF Tools NCN được thiết kế theo kiến trúc xử lý cục bộ (Local-first). Mọi thao tác đọc tệp, hiển thị hình ảnh từng trang, gộp, tách, nén hay chuyển đổi đều diễn ra trực tiếp trên CPU và ổ cứng máy tính của bạn. Không có bất kỳ tệp tài liệu nào được gửi ra máy chủ bên ngoài.',
  },
  {
    id: 'how-to-merge-pdf',
    category: 'features',
    question: 'Làm thế nào để gộp nhiều file PDF thành một file duy nhất?',
    answer:
      'Bạn mở ứng dụng, chọn công cụ "Gộp PDF", sau đó kéo thả hoặc chọn các tệp PDF từ máy tính. Giao diện sẽ hiển thị hình ảnh trực quan các trang của từng tệp. Bạn có thể dùng mũi tên lên/xuống để đổi thứ tự tệp, nhập khoảng trang cần lấy (ví dụ: 1-5) hoặc giữ mặc định toàn bộ, rồi nhấn "Thực hiện: Gộp PDF".',
  },
  {
    id: 'can-convert-word-to-pdf',
    category: 'engines',
    question: 'Ứng dụng có thể chuyển Word, Excel, PowerPoint sang PDF không?',
    answer:
      'Có. Khi máy tính của bạn đã cài đặt sẵn Microsoft Office (Word, Excel, PowerPoint bản 2016/2019/2021/365) hoặc bộ ứng dụng miễn phí LibreOffice, PDF Tools NCN sẽ tự động kết nối với engine có sẵn trên máy để xuất tệp Word (.docx, .doc), Excel (.xlsx, .xls) và PowerPoint (.pptx, .ppt) sang PDF chuẩn xác.',
  },
  {
    id: 'can-convert-pdf-to-excel',
    category: 'engines',
    question: 'Có thể chuyển đổi ngược từ PDF sang Word hoặc Excel không?',
    answer:
      'Ứng dụng hỗ trợ chuyển đổi PDF sang Word (.docx), Excel (.xlsx) và PowerPoint (.pptx) thông qua Microsoft Office hoặc LibreOffice trên máy. Lưu ý rằng chất lượng giữ bố cục và bảng biểu phụ thuộc vào việc file PDF gốc có lớp văn bản chuẩn hay là file scan hình ảnh. Với PDF scan, bạn nên chạy công cụ OCR trước.',
  },
  {
    id: 'why-libreoffice-or-msoffice',
    category: 'engines',
    question: 'Vì sao các tính năng chuyển đổi Office cần Microsoft Office hoặc LibreOffice?',
    answer:
      'Để giữ bộ cài đặt PDF Tools NCN gọn nhẹ (~3 MB) và xử lý hoàn toàn offline mà không đẩy tài liệu lên đám mây, ứng dụng tận dụng trực tiếp bộ dựng tài liệu chuẩn của Microsoft Office (nếu máy bạn đã có sẵn) hoặc LibreOffice headless (mã nguồn mở, miễn phí). Nếu máy chưa có cả hai công cụ này, ứng dụng sẽ thông báo rõ và cung cấp liên kết tải LibreOffice chính thức.',
  },
  {
    id: 'how-vietnamese-ocr-works',
    category: 'engines',
    question: 'Tính năng OCR tiếng Việt hoạt động như thế nào?',
    answer:
      'Tính năng OCR sử dụng động cơ mã nguồn mở Tesseract OCR được cài đặt trên máy tính của bạn. Khi bạn cài Tesseract kèm gói dữ liệu ngôn ngữ Tiếng Việt (vie.traineddata), PDF Tools NCN sẽ gọi trực tiếp engine này để nhận dạng chữ tiếng Việt có dấu và tiếng Anh từ tệp scan mà không cần gửi ảnh lên dịch vụ trực tuyến.',
  },
  {
    id: 'supported-windows-versions',
    category: 'system',
    question: 'Ứng dụng hỗ trợ những phiên bản Windows nào?',
    answer:
      'PDF Tools NCN hỗ trợ Windows 10 (64-bit, bản cập nhật 1803 trở lên) và Windows 11 (64-bit). Bộ cài đặt định dạng chuẩn Setup.exe (NSIS) giúp cài đặt nhanh trong vài giây và tự động tạo lối tắt trên Desktop cũng như Start Menu.',
  },
  {
    id: 'how-to-update',
    category: 'system',
    question: 'Làm thế nào để kiểm tra và cập nhật phiên bản mới?',
    answer:
      'Bạn có thể xem phiên bản hiện tại ở góc dưới cùng hoặc trong mục Giới thiệu của ứng dụng, sau đó truy cập trang Tải xuống (/download) hoặc Lịch sử cập nhật (/changelog) trên website chính thức của PDF Tools NCN để tải bộ cài đặt mới nhất. Khi cài bản mới đè lên, lịch sử tác vụ và cài đặt cục bộ của bạn vẫn được giữ nguyên.',
  },
  {
    id: 'where-to-contact-support',
    category: 'general',
    question: 'Tôi có thể báo lỗi hoặc đề xuất thêm tính năng mới ở đâu?',
    answer:
      'Bạn có thể gửi trực tiếp phản hồi, báo lỗi kỹ thuật hoặc yêu cầu tính năng mới tại trang Liên hệ (/contact) trên website này. Đội ngũ phát triển NCN tiếp nhận mọi ý kiến đóng góp để hoàn thiện sản phẩm qua từng phiên bản.',
  },
];

