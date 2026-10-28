import { FeatureItem } from '@/types';

export const FEATURE_GROUPS = [
  {
    id: 'manage' as const,
    name: 'Nhóm 1 — Quản lý & Tổ chức PDF',
    shortName: 'Quản lý PDF',
    description: 'Gộp, tách, trích xuất, xoay 90° và sắp xếp thứ tự trang với hình ảnh xem trước trực quan.',
  },
  {
    id: 'edit' as const,
    name: 'Nhóm 2 — Chỉnh sửa & Đóng dấu PDF',
    shortName: 'Chỉnh sửa PDF',
    description: 'Thêm watermark bản quyền, đánh số trang tự động và các lớp nội dung bổ sung.',
  },
  {
    id: 'convert' as const,
    name: 'Nhóm 3 — Chuyển đổi Định dạng',
    shortName: 'Chuyển đổi',
    description: 'Chuyển đổi qua lại giữa PDF và Word, Excel, PowerPoint, Hình ảnh, Văn bản.',
  },
  {
    id: 'optimize' as const,
    name: 'Nhóm 4 — Tối ưu & OCR',
    shortName: 'Tối ưu & OCR',
    description: 'Nén giảm dung lượng PDF, kiểm tra & xóa metadata ẩn, nhận dạng văn bản tiếng Việt OCR.',
  },
  {
    id: 'security' as const,
    name: 'Nhóm 5 — Bảo mật Tài liệu',
    shortName: 'Bảo mật',
    description: 'Kiểm tra trạng thái mã hóa, xóa siêu dữ liệu nhạy cảm và thiết lập bảo vệ tài liệu.',
  },
];

export const ALL_FEATURES: FeatureItem[] = [
  // Nhóm 1 — Quản lý PDF
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    groupId: 'manage',
    groupName: 'Quản lý PDF',
    title: 'Gộp nhiều file PDF',
    shortDescription:
      'Ghép nối nhiều tệp PDF thành một tài liệu hoàn chỉnh, hỗ trợ sắp xếp thứ tự tệp và chọn khoảng trang của từng file.',
    fullDescription:
      'Công cụ Gộp PDF trong PDF Tools NCN cho phép bạn chọn nhiều tệp PDF cùng lúc, xem trước hình ảnh thực tế của các trang trong từng tệp, đổi thứ tự trước sau và chỉ định phạm vi trang cụ thể (ví dụ: chỉ lấy trang 1-5 của file đầu tiên ghép với toàn bộ file thứ hai).',
    icon: 'Layers',
    status: 'available',
    statusLabel: 'Đã có (Native)',
    mockPreviewType: 'merge',
    highlights: [
      'Hiển thị ảnh bìa và lưới hình ảnh thực tế của từng trang PDF trước khi gộp',
      'Sắp xếp thứ tự tệp dễ dàng bằng nút di chuyển lên/xuống',
      'Tùy chọn nhập khoảng trang cần lấy trên từng file (VD: 1-3, 5)',
      'Xử lý trực tiếp trên máy tính bằng nhân Rust tốc độ cao, không giới hạn số tệp',
    ],
    steps: [
      'Mở PDF Tools NCN và chọn công cụ "Gộp PDF" trên bảng điều khiển.',
      'Kéo thả các tệp PDF hoặc nhấn "Chọn tệp từ máy tính".',
      'Xem lưới ảnh trang của từng tệp, sắp xếp thứ tự file và nhập khoảng trang (nếu chỉ muốn gộp một số trang nhất định).',
      'Chọn thư mục lưu kết quả và nhấn "Thực hiện: Gộp PDF".',
    ],
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    groupId: 'manage',
    groupName: 'Quản lý PDF',
    title: 'Tách PDF linh hoạt',
    shortDescription:
      'Tách một tệp PDF lớn thành từng trang rời, tách theo các khoảng trang tùy chọn hoặc chia đều mỗi file N trang.',
    fullDescription:
      'Khi làm việc với các bộ hồ sơ hoặc sách scan hàng trăm trang, tính năng Tách PDF giúp bạn nhanh chóng trích xuất đúng những phần cần thiết thành các tệp PDF độc lập mà vẫn giữ nguyên định dạng trang gốc.',
    icon: 'Split',
    status: 'available',
    statusLabel: 'Đã có (Native)',
    mockPreviewType: 'split',
    highlights: [
      '3 chế độ tách: Tách rời từng trang, Tách theo khoảng trang (VD: 1-3, 4-8), Chia cố định N trang/tệp',
      'Xem trước toàn bộ các trang của tệp PDF ngay trong giao diện làm việc',
      'Tự động đặt tên tệp đầu ra rõ ràng theo số trang hoặc phần tách',
      'Bảo toàn bố cục, hình ảnh và phông chữ của các trang được trích xuất',
    ],
    steps: [
      'Chọn công cụ "Tách PDF" trên màn hình chính.',
      'Chọn một trong 3 chế độ: Tách từng trang, Theo khoảng trang hoặc Chia theo số trang.',
      'Thêm tệp PDF cần tách và kiểm tra hình ảnh các trang hiển thị bên dưới.',
      'Nhấn "Thực hiện: Tách PDF" và mở ngay thư mục chứa các tệp vừa xuất.',
    ],
  },
  {
    id: 'organize-pages',
    slug: 'split-pdf',
    groupId: 'manage',
    groupName: 'Quản lý PDF',
    title: 'Xoay, sắp xếp, chèn & xóa trang',
    shortDescription:
      'Xem lưới hình ảnh thực tế của từng trang PDF để xoay 90°/180°/270°, đổi vị trí, nhân bản, chèn trang trắng hoặc xóa trang thừa.',
    fullDescription:
      'Chế độ Chỉnh sửa trang hiển thị trực quan hình ảnh thực tế của toàn bộ các trang trong tài liệu. Bạn có thể xoay riêng từng trang bị ngược khi scan, xoay toàn bộ tài liệu, đổi thứ tự trang sang trái/phải, nhân bản trang, chèn thêm trang trắng hoặc loại bỏ các trang không cần thiết.',
    icon: 'LayoutGrid',
    status: 'available',
    statusLabel: 'Đã có (Native)',
    mockPreviewType: 'organize',
    highlights: [
      'Render hình ảnh thật của từng trang PDF bằng PDF.js Canvas sắc nét',
      'Xoay từng trang 90°, 180°, 270° hoặc xoay đồng loạt tất cả trang',
      'Đổi vị trí trang trái/phải, nhân bản trang, chèn trang trắng và xóa/khôi phục trang',
      'Tích hợp sẵn bộ Nén & Giảm dung lượng PDF ngay bên dưới khung chỉnh sửa trang',
    ],
  },

  // Nhóm 2 — Chỉnh sửa PDF
  {
    id: 'watermark-numbering',
    groupId: 'edit',
    groupName: 'Chỉnh sửa PDF',
    title: 'Thêm Watermark & Đánh số trang',
    shortDescription:
      'Đóng dấu chữ watermark chìm bảo vệ bản quyền và tự động đánh số trang chân trang theo mẫu Trang {n} / {total}.',
    fullDescription:
      'Giúp chuẩn hóa hồ sơ nội bộ và tài liệu phát hành bằng cách thêm dòng chữ watermark chìm (tùy chỉnh nội dung, cỡ chữ, độ mờ) kết hợp đánh số thứ tự trang tự động ở cuối mỗi trang tài liệu.',
    icon: 'Stamp',
    status: 'available',
    statusLabel: 'Đã có (Native)',
    mockPreviewType: 'watermark',
    highlights: [
      'Tùy chỉnh nội dung chữ Watermark, kích thước phông chữ (14pt–72pt) và độ mờ (10%–80%)',
      'Chèn số trang tự động với biến {n} (trang hiện tại) và {total} (tổng số trang)',
      'Xuất thành tệp mới an toàn, không ghi đè làm hỏng tệp PDF gốc',
    ],
  },
  {
    id: 'text-packaging',
    groupId: 'edit',
    groupName: 'Chỉnh sửa PDF',
    title: 'Đóng gói & Trích xuất văn bản (.TXT ↔ .PDF)',
    shortDescription:
      'Trích xuất toàn bộ nội dung chữ từ PDF sang tệp TXT hoặc tạo nhanh tệp PDF từ văn bản thuần.',
    fullDescription:
      'Hỗ trợ trích xuất nhanh nội dung văn bản từ các tệp PDF có lớp chữ (text layer) sang tệp .txt để biên tập, hoặc đóng gói nội dung văn bản thành tệp PDF chuẩn.',
    icon: 'FileText',
    status: 'available',
    statusLabel: 'Đã có (Native)',
    highlights: [
      'Trích xuất văn bản theo từng trang từ tệp PDF sang tệp .txt',
      'Tạo tệp PDF nhanh từ tệp văn bản .txt hoặc .md',
      'Hoạt động hoàn toàn offline không cần công cụ bên ngoài',
    ],
  },
  {
    id: 'annotations-signatures',
    groupId: 'edit',
    groupName: 'Chỉnh sửa PDF',
    title: 'Chèn chữ ký tay, hình ảnh & ghi chú nâng cao',
    shortDescription:
      'Vẽ chữ ký trực tiếp, chèn ảnh con dấu vào vị trí bất kỳ và đánh dấu highlight trên trang PDF.',
    fullDescription:
      'Tính năng vẽ chữ ký trực tiếp trên canvas, đóng dấu hình ảnh PNG trong suốt và thêm hộp ghi chú/highlight tương tác đang được hoàn thiện cho bản cập nhật tiếp theo.',
    icon: 'PenTool',
    status: 'coming_soon',
    statusLabel: 'Sắp ra mắt (v1.1)',
    highlights: [
      'Tạo chữ ký bằng chuột/bút cảm ứng hoặc tải lên ảnh chữ ký PNG nền trong suốt',
      'Kéo thả vào vị trí bất kỳ trên trang xem trước PDF',
      'Thêm ghi chú (comment) và tô sáng (highlight) vùng văn bản',
    ],
  },

  // Nhóm 3 — Chuyển đổi
  {
    id: 'office-to-pdf',
    slug: 'convert-pdf',
    groupId: 'convert',
    groupName: 'Chuyển đổi',
    title: 'Word, Excel, PowerPoint sang PDF',
    shortDescription:
      'Chuyển đổi các tệp .docx, .doc, .xlsx, .xls, .pptx, .ppt sang PDF sắc nét thông qua Microsoft Office hoặc LibreOffice trên máy.',
    fullDescription:
      'PDF Tools NCN tự động phát hiện Microsoft Office (Word, Excel, PowerPoint) hoặc LibreOffice đã cài đặt trên máy tính Windows của bạn để thực hiện chuyển đổi hàng loạt tài liệu văn phòng sang PDF chuẩn mà không cần gửi tài liệu lên mạng.',
    icon: 'FileCheck2',
    status: 'requires_office',
    statusLabel: 'Đã có (Dùng MS Office / LibreOffice)',
    dependencyNote:
      'Yêu cầu máy tính đã cài đặt Microsoft Office (2016/2019/2021/365) hoặc LibreOffice (miễn phí).',
    mockPreviewType: 'convert',
    highlights: [
      'Tự động ưu tiên dùng Microsoft Office COM Interop nếu máy đã cài sẵn Word/Excel/PowerPoint',
      'Tự động chuyển sang LibreOffice headless nếu người dùng sử dụng bộ công cụ mã nguồn mở',
      'Giữ nguyên bảng biểu, phông chữ, công thức và định dạng trang in',
      'Hỗ trợ chọn và chuyển đổi nhiều tệp Office cùng lúc',
    ],
    steps: [
      'Chọn công cụ "Word > PDF", "Excel > PDF" hoặc "PPT > PDF".',
      'Kiểm tra thông báo trạng thái động cơ Office (xanh lá khi đã nhận diện Microsoft Office hoặc LibreOffice).',
      'Thêm một hoặc nhiều tệp tài liệu Office cần chuyển đổi.',
      'Nhấn nút thực hiện để xuất ra các tệp PDF tương ứng tại thư mục đích.',
    ],
  },
  {
    id: 'pdf-to-office',
    slug: 'convert-pdf',
    groupId: 'convert',
    groupName: 'Chuyển đổi',
    title: 'PDF sang Word (.docx), Excel (.xlsx), PPT (.pptx)',
    shortDescription:
      'Chuyển đổi tệp PDF sang định dạng Word, bảng tính Excel hoặc trình chiếu PowerPoint để chỉnh sửa lại nội dung.',
    fullDescription:
      'Sử dụng khả năng tái cấu trúc tài liệu của Microsoft Word hoặc bộ lọc import của LibreOffice để chuyển tệp PDF sang định dạng Office phục vụ biên tập lại. Kết quả chuyển đổi phụ thuộc vào cấu trúc lớp văn bản của tệp PDF gốc.',
    icon: 'FileSpreadsheet',
    status: 'requires_office',
    statusLabel: 'Đã có (Dùng MS Office / LibreOffice)',
    dependencyNote:
      'Hiệu quả cao nhất với PDF có lớp văn bản gốc. Với PDF scan ảnh, nên chạy OCR trước khi chuyển đổi.',
    highlights: [
      'Chuyển đổi PDF sang Word (.docx) tận dụng cơ chế PDF Reflow của Microsoft Word hoặc LibreOffice',
      'Hỗ trợ xuất dữ liệu sang định dạng .xlsx và .pptx khi có engine tương thích',
      'Xử lý hoàn toàn cục bộ trên thiết bị, bảo vệ dữ liệu hợp đồng và báo cáo tài chính',
    ],
  },
  {
    id: 'image-to-pdf',
    slug: 'convert-pdf',
    groupId: 'convert',
    groupName: 'Chuyển đổi',
    title: 'Ghép nhiều Ảnh sang PDF (JPG, PNG, BMP)',
    shortDescription:
      'Gộp nhiều hình ảnh chụp tài liệu, hóa đơn thành một tệp PDF với tùy chọn khổ giấy A4, A3, Letter hoặc vừa khít ảnh.',
    fullDescription:
      'Không cần phần mềm bên ngoài, nhân xử lý ảnh tích hợp sẵn trong PDF Tools NCN cho phép bạn chọn hàng chục bức ảnh PNG, JPG, BMP, sắp xếp thứ tự, chọn khổ giấy (A4, A3, Letter, Fit), hướng trang (Dọc/Ngang/Tự động) và độ rộng lề trang (mm).',
    icon: 'Image',
    status: 'available',
    statusLabel: 'Đã có (Native)',
    highlights: [
      'Hỗ trợ các định dạng ảnh phổ biến: JPG/JPEG, PNG, BMP',
      'Tùy chọn khổ giấy chuẩn A4, A3, Letter hoặc giữ đúng kích thước gốc của ảnh',
      'Tùy chỉnh lề trang (0–50mm) và tự động căn giữa hình ảnh trên trang giấy',
    ],
  },

  // Nhóm 4 — Tối ưu & OCR
  {
    id: 'compress-pdf',
    slug: 'compress-pdf',
    groupId: 'optimize',
    groupName: 'Tối ưu & OCR',
    title: 'Nén & Tối ưu dung lượng PDF',
    shortDescription:
      'Giảm đáng kể kích thước tệp PDF với 3 mức Nhẹ, Cân bằng và Mạnh; được tích hợp cả độc lập lẫn ngay dưới phần Chỉnh sửa trang.',
    fullDescription:
      'Công cụ Nén PDF kết hợp nén luồng dữ liệu FlateDecode, dọn dẹp các đối tượng thừa (prune objects), loại bỏ metadata ẩn và tối ưu hóa lại các hình ảnh JPEG độ phân giải lớn nhúng bên trong PDF. Đặc biệt, bạn có thể nén ngay trong lúc đang chỉnh sửa/xoay/xóa trang mà không cần chuyển công cụ.',
    icon: 'Minimize2',
    status: 'available',
    statusLabel: 'Đã có (Native)',
    mockPreviewType: 'compress',
    highlights: [
      '3 mức nén rõ ràng: Mức Nhẹ (bảo toàn nét), Cân bằng (khuyên dùng), Mức Mạnh (tối ưu gửi Email/Zalo)',
      'Tích hợp trực tiếp ngay bên dưới giao diện Chỉnh sửa trang để vừa sửa trang vừa nén file 1 bước',
      'Hiển thị minh bạch dung lượng trước khi nén, sau khi nén và phần trăm dung lượng tiết kiệm được',
      'Tùy chọn xóa sạch metadata ẩn để giảm thêm kích thước tệp',
    ],
    steps: [
      'Chọn công cụ "Nén PDF" (hoặc sử dụng ngay khung "Nén & Giảm dung lượng PDF" bên dưới mục "Chỉnh sửa trang").',
      'Chọn mức độ nén phù hợp: Nhẹ (~20-30%), Cân bằng (~40-60%) hoặc Mạnh (~65-80%).',
      'Đánh dấu tùy chọn xóa metadata ẩn nếu muốn tối ưu thêm dung lượng.',
      'Nhấn nút thực hiện và kiểm tra thông báo dung lượng trước/sau khi nén.',
    ],
  },
  {
    id: 'metadata-inspector',
    groupId: 'optimize',
    groupName: 'Tối ưu & OCR',
    title: 'Kiểm tra thông tin & Xóa Metadata ẩn',
    shortDescription:
      'Xem phiên bản PDF, số trang, dung lượng, sửa Tiêu đề/Tác giả hoặc xóa sạch toàn bộ dữ liệu ẩn trước khi chia sẻ.',
    fullDescription:
      'Các tệp PDF thường lưu trữ thông tin phần mềm tạo, tên tác giả và lịch sử chỉnh sửa trong Dictionary Info và XMP Metadata. Công cụ này giúp bạn cập nhật lại thông tin chuẩn hoặc xóa sạch hoàn toàn dữ liệu ẩn nhạy cảm.',
    icon: 'FileSearch',
    status: 'available',
    statusLabel: 'Đã có (Native)',
    highlights: [
      'Đọc nhanh số trang, phiên bản chuẩn PDF, trạng thái mã hóa và dung lượng tệp',
      'Chỉnh sửa trường Tiêu đề (Title) và Tác giả (Author)',
      'Chế độ xóa sạch toàn bộ Metadata ẩn chỉ với một cú nhấp chuột',
    ],
  },
  {
    id: 'ocr-vietnamese',
    slug: 'ocr',
    groupId: 'optimize',
    groupName: 'Tối ưu & OCR',
    title: 'OCR Nhận dạng văn bản Tiếng Việt',
    shortDescription:
      'Nhận diện chữ tiếng Việt và tiếng Anh từ tài liệu scan hoặc hình ảnh thông qua động cơ Tesseract OCR cục bộ.',
    fullDescription:
      'Khi máy tính được cài đặt Tesseract OCR cùng gói dữ liệu ngôn ngữ tiếng Việt (vie.traineddata), PDF Tools NCN giúp bạn quét nhận dạng văn bản từ các tệp ảnh hoặc PDF scan hoàn toàn offline và xuất ra văn bản thuần (.txt) hoặc PDF.',
    icon: 'ScanText',
    status: 'requires_ocr',
    statusLabel: 'Đã có (Dùng Tesseract OCR)',
    dependencyNote:
      'Yêu cầu cài đặt Tesseract OCR trên Windows kèm gói dữ liệu ngôn ngữ Tiếng Việt (vie.traineddata).',
    mockPreviewType: 'ocr',
    highlights: [
      'Hỗ trợ nhận dạng Tiếng Việt (vie), Tiếng Anh (eng) hoặc Song ngữ Việt + Anh (vie+eng)',
      'Tự động kiểm tra trạng thái Tesseract và gói ngôn ngữ vie.traineddata ngay trên giao diện',
      'Cho phép cấu hình đường dẫn thực thi tesseract.exe tùy chỉnh trong phần Cài đặt',
    ],
    steps: [
      'Cài đặt Tesseract OCR cho Windows (chọn gói ngôn ngữ Vietnamese trong lúc cài).',
      'Mở PDF Tools NCN, chọn công cụ "OCR Ký tự" và kiểm tra thông báo trạng thái Engine.',
      'Chọn ngôn ngữ nhận dạng (Tiếng Việt / Tiếng Anh / Song ngữ) và định dạng kết quả đầu ra.',
      'Thêm tệp cần nhận dạng và nhấn "Thực hiện: OCR Ký tự".',
    ],
  },

  // Nhóm 5 — Bảo mật
  {
    id: 'security-protection',
    groupId: 'security',
    groupName: 'Bảo mật',
    title: 'Kiểm tra bảo vệ & Thiết lập mật khẩu PDF',
    shortDescription:
      'Kiểm tra trạng thái khóa mật khẩu của tệp PDF, xóa dữ liệu nhạy cảm và thiết lập mật khẩu bảo vệ tài liệu.',
    fullDescription:
      'Hỗ trợ tự động phát hiện các tệp PDF đang được mã hóa mật khẩu ngay khi đưa vào danh sách tệp, kết hợp công cụ dọn sạch siêu dữ liệu ẩn và cấu hình mật khẩu bảo vệ tài liệu nội bộ.',
    icon: 'Lock',
    status: 'beta',
    statusLabel: 'Beta',
    mockPreviewType: 'security',
    highlights: [
      'Tự động nhận biết và cảnh báo tệp PDF đang có mật khẩu bảo vệ trên danh sách tệp',
      'Xóa sạch thông tin thiết bị, tác giả và lịch sử ẩn trước khi gửi tài liệu ra bên ngoài',
      'Giao diện thiết lập User Password / Owner Password trực quan',
    ],
  },
];

export function getFeatureBySlug(slug: string): FeatureItem | undefined {
  return ALL_FEATURES.find((f) => f.slug === slug);
}

