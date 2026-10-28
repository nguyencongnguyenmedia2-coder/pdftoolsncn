import { ChangelogRelease, GuideArticle, UseCaseItem } from '@/types';

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Tải và cài đặt PDF Tools NCN',
    description:
      'Tải bộ cài đặt Setup.exe (2.97 MB) cho Windows 10/11 64-bit và hoàn tất cài đặt chỉ trong vài giây.',
    icon: 'Download',
  },
  {
    step: 2,
    title: 'Chọn công cụ cần dùng',
    description:
      'Chọn tác vụ mong muốn trên bảng điều khiển 5 cột hoặc dùng ô tìm kiếm nhanh công cụ tiếng Việt.',
    icon: 'LayoutGrid',
  },
  {
    step: 3,
    title: 'Thêm tài liệu PDF hoặc file tương thích',
    description:
      'Kéo thả tệp vào khung làm việc hoặc chọn tệp từ máy tính. Xem ngay hình ảnh thực tế của từng trang.',
    icon: 'FileUp',
  },
  {
    step: 4,
    title: 'Thiết lập tùy chọn xử lý',
    description:
      'Sắp xếp thứ tự, xoay/xóa trang, chọn mức nén dung lượng, nhập khoảng trang hoặc cấu hình watermark.',
    icon: 'Sliders',
  },
  {
    step: 5,
    title: 'Lưu kết quả vào thư mục mong muốn',
    description:
      'Nhấn nút Thực hiện và mở trực tiếp tệp kết quả hoặc thư mục đầu ra ngay trên Windows Explorer.',
    icon: 'FolderCheck',
  },
];

export const USE_CASES: UseCaseItem[] = [
  {
    id: 'office-worker',
    role: 'Nhân viên văn phòng',
    icon: 'Briefcase',
    headline: 'Gộp hợp đồng, phụ lục, báo cáo và chuẩn bị hồ sơ trình ký nhanh chóng.',
    description:
      'Thay vì phải gửi các hợp đồng nội bộ lên công cụ trực tuyến, nhân viên văn phòng có thể gộp nhiều file PDF, xoay lại các trang scan bị ngược và nén nhẹ dung lượng ngay trên máy tính.',
    tasks: [
      'Gộp hợp đồng chính và các phụ lục PDF thành 1 file duy nhất',
      'Xoay các trang scan bị ngược chiều và xóa trang thừa',
      'Nén giảm dung lượng PDF dưới giới hạn đính kèm của Email công ty',
    ],
    recommendedTools: ['Gộp PDF', 'Chỉnh sửa trang', 'Nén PDF', 'Word > PDF'],
    ctaText: 'Khám phá công cụ quản lý PDF',
    ctaHref: '/features/merge-pdf',
  },
  {
    id: 'accountant',
    role: 'Kế toán & Tài chính',
    icon: 'Calculator',
    headline: 'Sắp xếp chứng từ, hóa đơn, sổ phụ ngân hàng và bảo mật dữ liệu tài chính.',
    description:
      'Chứng từ kế toán và báo cáo thuế đòi hỏi tính riêng tư cao. PDF Tools NCN xử lý toàn bộ tệp trên ổ cứng cục bộ, hỗ trợ ghép ảnh chụp hóa đơn thành PDF chuẩn A4 và đánh số trang hồ sơ.',
    tasks: [
      'Ghép ảnh chụp hóa đơn, biên lai thành tệp PDF chuẩn khổ A4',
      'Tách riêng từng trang chứng từ từ tệp PDF tổng hợp hàng tháng',
      'Đánh số trang chân trang (Trang 1/N) cho bộ hồ sơ quyết toán',
    ],
    recommendedTools: ['Ảnh > PDF', 'Tách PDF', 'Sửa chữ & Dấu', 'Excel > PDF'],
    ctaText: 'Xem công cụ tách & chỉnh sửa',
    ctaHref: '/features/split-pdf',
  },
  {
    id: 'student',
    role: 'Sinh viên & Nghiên cứu sinh',
    icon: 'GraduationCap',
    headline: 'Tổng hợp giáo trình, chia nhỏ tài liệu ôn tập và trích xuất văn bản học tập.',
    description:
      'Giúp sinh viên gộp các chương bài giảng rời rạc thành một cuốn giáo trình hoàn chỉnh, trích xuất riêng các chương cần đọc hoặc chuyển slide bài giảng PowerPoint sang PDF để in ấn.',
    tasks: [
      'Tách riêng các chương quan trọng từ sách PDF hàng trăm trang',
      'Chuyển đổi báo cáo tiểu luận Word và slide thuyết trình PPT sang PDF',
      'Nhận dạng chữ tiếng Việt (OCR) từ tài liệu chụp ảnh để trích dẫn',
    ],
    recommendedTools: ['Tách PDF', 'PPT > PDF', 'Word > PDF', 'OCR Ký tự'],
    ctaText: 'Tìm hiểu chuyển đổi tài liệu',
    ctaHref: '/features/convert-pdf',
  },
  {
    id: 'teacher',
    role: 'Giáo viên & Giảng viên',
    icon: 'BookOpen',
    headline: 'Biên soạn đề cương, đóng dấu bản quyền bài giảng và tổ chức học liệu.',
    description:
      'Giảng viên có thể kết hợp nhiều nguồn tài liệu thành bộ học liệu thống nhất, chèn watermark tên trường/lớp lên bài giảng PDF và nén dung lượng để chia sẻ nhanh qua LMS hoặc Zalo.',
    tasks: [
      'Chèn chữ Watermark bản quyền bài giảng và đánh số trang đồng bộ',
      'Xoay, sắp xếp lại thứ tự các trang đề thi và tài liệu tham khảo',
      'Nén nhẹ dung lượng học liệu PDF để học sinh tải về nhanh hơn',
    ],
    recommendedTools: ['Sửa chữ & Dấu', 'Chỉnh sửa trang', 'Nén PDF'],
    ctaText: 'Xem tính năng nén & tối ưu',
    ctaHref: '/features/compress-pdf',
  },
  {
    id: 'business',
    role: 'Doanh nghiệp & Tổ chức',
    icon: 'Building2',
    headline: 'Chuẩn hóa quy trình xử lý hồ sơ PDF cục bộ, giảm rủi ro rò rỉ tài liệu.',
    description:
      'Giải pháp cài đặt đồng bộ trên dàn máy tính Windows của doanh nghiệp, không tốn phí thuê bao hàng tháng theo đầu người và hạn chế tối đa việc nhân sự tải tài liệu mật lên các website bên thứ ba.',
    tasks: [
      'Xử lý hồ sơ thầu, báo giá và tài liệu kỹ thuật hoàn toàn nội bộ (Offline)',
      'Xóa sạch Metadata ẩn (tên thiết bị, tác giả, phần mềm) trước khi gửi đối tác',
      'Tận dụng hạ tầng Microsoft Office hoặc LibreOffice sẵn có của doanh nghiệp',
    ],
    recommendedTools: ['Thông tin & Metadata', 'Gộp PDF', 'Chỉnh sửa trang', 'Nén PDF'],
    ctaText: 'Xem chính sách quyền riêng tư',
    ctaHref: '/privacy',
  },
];

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    id: 'cai-dat-ung-dung',
    title: '1. Hướng dẫn tải và cài đặt PDF Tools NCN trên Windows',
    summary: 'Các bước tải bộ cài chính thức, kiểm tra mã băm SHA-256 và cài đặt lên Windows 10/11 (64-bit).',
    icon: 'Download',
    requirementBadge: 'Windows 10/11 64-bit',
    steps: [
      {
        title: 'Tải bộ cài đặt chính thức',
        detail:
          'Truy cập trang Tải xuống (/download) và nhấn nút "Tải PDF Tools NCN cho Windows" để tải tệp PDF-Tools-NCN_1.0.0_x64-setup.exe (2.97 MB).',
      },
      {
        title: 'Kiểm tra tính toàn vẹn của tệp (Tùy chọn)',
        detail:
          'Bạn có thể đối chiếu mã kiểm tra SHA-256 của tệp vừa tải bằng lệnh PowerShell: Get-FileHash .\\PDF-Tools-NCN_1.0.0_x64-setup.exe -Algorithm SHA256 để đảm bảo tệp nguyên vẹn.',
      },
      {
        title: 'Chạy trình cài đặt NSIS Setup',
        detail:
          'Nhấp đúp vào tệp Setup.exe vừa tải, chọn thư mục cài đặt (hoặc giữ mặc định) và nhấn Install. Trình cài đặt sẽ hoàn tất sau khoảng 3–5 giây.',
      },
      {
        title: 'Khởi chạy ứng dụng',
        detail:
          'Mở PDF Tools NCN từ biểu tượng trên màn hình Desktop hoặc tìm kiếm trong Windows Start Menu.',
      },
    ],
    tips: [
      'Không cần cài đặt thêm Python hay Node.js trên máy người dùng cuối.',
      'Ứng dụng lưu lịch sử tác vụ và cài đặt cục bộ trong thư mục AppData của người dùng Windows.',
    ],
  },
  {
    id: 'gop-va-chinh-sua-trang',
    title: '2. Hướng dẫn Gộp PDF, Chỉnh sửa trang trực quan & Nén dung lượng',
    summary: 'Cách xem hình ảnh thực tế từng trang PDF để gộp, xoay 90°, xóa trang thừa và nén giảm dung lượng.',
    icon: 'Layers',
    requirementBadge: 'Hoạt động 100% Native Offline',
    steps: [
      {
        title: 'Gộp nhiều file PDF có xem trước hình ảnh trang',
        detail:
          'Chọn công cụ "Gộp PDF", thêm 2 hoặc nhiều tệp PDF. Mỗi thẻ tệp sẽ hiển thị ảnh bìa và lưới hình ảnh các trang bên trong. Bạn có thể nhấn vào trang bất kỳ để phóng to, đổi thứ tự tệp bằng nút Lên/Xuống, hoặc nhập khoảng trang cần lấy (VD: 1-4).',
      },
      {
        title: 'Xoay, đổi vị trí, chèn trang trắng và xóa trang',
        detail:
          'Chọn công cụ "Chỉnh sửa trang" và thêm tệp PDF. Toàn bộ các trang tài liệu sẽ hiện ra dưới dạng lưới hình ảnh thực tế. Dưới mỗi trang có thanh công cụ để Di chuyển Trái/Phải (< >), Xoay 90°, Nhân bản trang hoặc Xóa trang.',
      },
      {
        title: 'Kết hợp Nén PDF ngay dưới phần Chỉnh sửa trang',
        detail:
          'Ngay bên dưới lưới trang trong mục "Chỉnh sửa trang", bạn có thể chọn mức nén (Nhẹ, Cân bằng hoặc Mạnh) và nhấn nút "Nén PDF ngay" (hoặc nhấn nút Thực hiện ở cuối trang) để vừa lưu các trang đã chỉnh sửa vừa thu gọn dung lượng file.',
      },
    ],
    tips: [
      'Nhấn trực tiếp vào hình thu nhỏ của bất kỳ trang nào để mở cửa sổ Xem trước độ phân giải cao (hỗ trợ phóng to tới 250% và chuyển trang bằng phím mũi tên).',
    ],
  },
  {
    id: 'cau-hinh-engine',
    title: '3. Hướng dẫn cấu hình Microsoft Office, LibreOffice và Tesseract OCR',
    summary: 'Cách kết nối công cụ chuyển đổi Word/Excel/PPT và nhận dạng văn bản tiếng Việt OCR.',
    icon: 'Settings',
    requirementBadge: 'Tích hợp Engine Cục bộ',
    steps: [
      {
        title: 'Chuyển đổi Word, Excel, PowerPoint sang PDF và ngược lại',
        detail:
          'Nếu máy tính của bạn đã cài đặt Microsoft Office (2016/2019/2021/365), PDF Tools NCN sẽ tự động nhận diện và hiển thị thông báo xanh "Động cơ Microsoft Office đã sẵn sàng". Nếu máy chưa có MS Office, bạn có thể cài đặt LibreOffice miễn phí từ libreoffice.org.',
      },
      {
        title: 'Cài đặt Tesseract OCR cho tính năng nhận dạng Tiếng Việt',
        detail:
          'Tải bộ cài Tesseract OCR cho Windows (UB-Mannheim). Trong quá trình cài đặt, tại mục "Additional language data (download)", hãy tích chọn "Vietnamese" để tải file vie.traineddata.',
      },
      {
        title: 'Tùy chỉnh đường dẫn trong Cài đặt (nếu cài ở thư mục riêng)',
        detail:
          'Nếu bạn cài LibreOffice hoặc Tesseract ở ổ đĩa khác ngoài C:\\Program Files, hãy nhấn nút "Cài đặt" trên thanh Header của PDF Tools NCN và chọn đường dẫn tới tệp soffice.exe hoặc tesseract.exe.',
      },
    ],
    tips: [
      'Ứng dụng luôn kiểm tra trạng thái engine theo thời gian thực và thông báo rõ ràng trước khi bạn chạy tác vụ.',
    ],
  },
];

export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: '1.0.0',
    date: '28/10/2026',
    badge: 'Bản phát hành chính thức',
    summary:
      'Phiên bản chính thức đầu tiên của PDF Tools NCN cho Windows 10/11 (64-bit) với đầy đủ bộ công cụ quản lý PDF trực quan, nén tối ưu ảnh nhúng và tích hợp chuyển đổi Office/OCR cục bộ.',
    added: [
      'Giao diện Modern SaaS Dark Mode (#0D0B18 / #7657F6) tiếng Việt hoàn chỉnh, hỗ trợ tìm kiếm nhanh và lọc theo danh mục công cụ.',
      'Hiển thị hình ảnh thực tế từng trang PDF (PDF.js Canvas + Binary IPC) trong cả chế độ Gộp PDF, Chỉnh sửa trang và cửa sổ Xem trước độ phân giải cao.',
      'Tích hợp khung Nén & Giảm dung lượng PDF (Nhẹ / Cân bằng / Mạnh) trực tiếp bên dưới phần Chỉnh sửa trang.',
      'Công cụ Gộp PDF, Tách PDF (từng trang / khoảng trang / chia cố định), Xoay 90°/180°/270°, Đổi vị trí, Nhân bản, Chèn trang trắng và Xóa trang.',
      'Công cụ đóng dấu Watermark chữ chìm, tự động đánh số trang chân trang (Trang {n} / {total}) và quản lý/xóa Metadata ẩn.',
      'Tự động phát hiện và tích hợp cả Microsoft Office (Word, Excel, PowerPoint COM Interop) lẫn LibreOffice headless cho tác vụ chuyển đổi tài liệu.',
      'Tích hợp Tesseract OCR nhận dạng văn bản Tiếng Việt (vie), Tiếng Anh (eng) và Song ngữ (vie+eng).',
      'Lưu trữ lịch sử tác vụ và cấu hình người dùng cục bộ bằng cơ sở dữ liệu SQLite tích hợp.',
    ],
    improved: [
      'Nâng cấp thuật toán nén PDF: kết hợp nén luồng FlateDecode, dọn dẹp object thừa và tối ưu hóa lại các ảnh JPEG (DCTDecode) kích thước lớn nhúng trong PDF.',
      'Tối ưu hóa tốc độ tải và hiển thị file PDF nhiều trang (50+ trang) nhờ cơ chế lazy-rendering với IntersectionObserver và bộ nhớ đệm DataURL.',
    ],
    fixed: [
      'Khắc phục xung đột cổng cục bộ IPv4/IPv6 (127.0.0.1:1420) khi chạy môi trường phát triển trên Windows.',
      'Đồng bộ tự động số lượng trang giữa bộ đọc cấu trúc PDF và bộ dựng hình ảnh PDF.js.',
    ],
  },
];

