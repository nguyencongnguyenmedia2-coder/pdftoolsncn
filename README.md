# PDF Tools NCN — Ứng dụng Desktop Xử lý PDF Chuyên nghiệp trên Windows

<div align="center">
  <img src="public/vite.svg" width="80" height="80" alt="PDF Tools NCN Logo" />
  <h3>PDF Tools NCN (v1.0.0)</h3>
  <p><strong>Gộp • Chỉnh sửa • Chuyển đổi PDF — Xử lý 100% Cục bộ trên Thiết bị</strong></p>
  <p>Miễn phí • Bảo mật tuyệt đối • Không tải dữ liệu lên Server</p>
</div>

---

## I. GIỚI THIỆU TỔNG QUAN

**PDF Tools NCN** là phần mềm desktop Windows 64-bit (Windows 10 / 11) được thiết kế hiện đại theo phong cách Modern SaaS Dark Theme cao cấp, cung cấp giải pháp toàn diện cho mọi nhu cầu xử lý tài liệu PDF từ cơ bản đến nâng cao.

Toàn bộ quá trình đọc, ghi, bóc tách, mã hóa và nén tài liệu đều được điều phối và thực thi cục bộ bằng nhân native Rust hiệu năng cao thông qua framework **Tauri 2.x**. Không có bất kỳ dữ liệu nào của người dùng bị gửi lên Internet hoặc server bên thứ ba.

---

## II. BẢNG MÀU & PHONG CÁCH GIAO DIỆN

Giao diện ứng dụng được trau chuốt theo tông màu tím than hiện đại:
- **Nền chính (Main Background):** `#0D0B18`
- **Nền thẻ công cụ (Card Background):** `#17142A`
- **Nền không gian làm việc (Workspace):** `#121025`
- **Màu tím chủ đạo (Primary Purple):** `#7657F6`
- **Màu tím sáng (Accent Light):** `#A78BFA`
- **Màu chữ chính:** `#F8FAFC`
- **Màu chữ phụ:** `#9692AF`
- **Trạng thái Thành công / Cảnh báo / Lỗi:** `#22C55E` / `#F59E0B` / `#EF4444`

---

## III. DANH MỤC CÁC CHỨC NĂNG

### 1. Gộp PDF (Merge)
- Ghép nối không giới hạn số lượng tệp PDF thành một tệp duy nhất.
- Hỗ trợ kéo thả sắp xếp lại thứ tự file trước khi gộp.
- Tùy chọn phạm vi trang linh hoạt cho từng tệp (ví dụ: `1-3, 5, 8-10`).

### 2. Tách PDF (Split)
- **Tách từng trang:** Tách mỗi trang thành một file PDF độc lập.
- **Theo khoảng trang:** Nhập danh sách phạm vi (ví dụ: `1-3, 4-6, 7-10`).
- **Chia đều theo số trang:** Tự động chia tệp thành các phần nhỏ có N trang.

### 3. Sắp xếp & Chỉnh sửa trang (Organize & Edit)
- Xem thumbnail trực quan của từng trang với số thứ tự.
- Xoay trang 90°, 180°, 270° theo chiều kim đồng hồ.
- Xóa các trang không cần thiết.
- Chèn trang trắng (Blank A4) vào vị trí bất kỳ.

### 4. Nén & Tối ưu hóa PDF (Compress)
- 3 mức độ nén: **Mức nhẹ (Bảo toàn nét)**, **Cân bằng (Khuyên dùng)**, **Mức mạnh (Email/Lưu trữ)**.
- Tự động nén luồng dữ liệu FlateDecode và dọn dẹp các đối tượng mồ côi (prune unused objects).
- Tùy chọn loại bỏ thông tin metadata ẩn nhạy cảm.
- Báo cáo chi tiết dung lượng trước và sau nén kèm tỷ lệ % tiết kiệm được.

### 5. Watermark & Đánh số trang (Watermark & Numbering)
- Thêm dấu chữ chìm (Watermark) với tùy chỉnh cỡ chữ, góc xoay (diagonal), độ mờ (opacity).
- Đánh số trang chân trang (Footer) theo định dạng tùy biến `Trang {n} / {total}`.

### 6. Ảnh sang PDF & PDF sang Ảnh
- Ghép các file ảnh PNG, JPG, JPEG, BMP thành tập tài liệu PDF.
- Tùy chọn khổ giấy: A4, A3, Letter hoặc vừa vặn theo kích thước ảnh (Fit).
- Hướng trang: Tự động, Dọc (Portrait) hoặc Ngang (Landscape).
- Tùy chỉnh khoảng lề trang (margin) và căn giữa.

### 7. Chuyển đổi Văn bản & Office
- **PDF sang Text (.txt) & Text sang PDF:** Bóc tách dữ liệu ký tự không làm mất nội dung.
- **Office sang PDF (Word, Excel, PowerPoint):** Tự động phát hiện và kết nối với LibreOffice headless.
- **PDF sang Office (Word .docx, Excel .xlsx, PowerPoint .pptx):** Chuyển đổi giữ nguyên cấu trúc bảng và văn bản.

### 8. OCR — Nhận dạng ký tự quang học
- Nhận dạng tiếng Việt có dấu và tiếng Anh từ tài liệu scan hoặc ảnh.
- Xuất thành tệp PDF có lớp chữ tìm kiếm được (Searchable PDF) hoặc tệp TXT.
- Hỗ trợ phát hiện engine Tesseract OCR cục bộ và thông báo trạng thái minh bạch.

### 9. Bảo mật & Quản lý Metadata
- Đặt mật khẩu mở tài liệu (User Password).
- Giải mã và mở khóa tệp PDF khi người dùng cung cấp mật khẩu hợp lệ.
- Xem thông tin chi tiết: số trang, kích thước, phần mềm tạo, ngày khởi tạo.
- Tùy chọn xóa sạch Metadata ẩn để bảo mật danh tính.

### 10. Trình xem trước PDF tích hợp (Built-in Viewer)
- Xem trước tài liệu PDF trực tiếp trong ứng dụng.
- Phóng to, thu nhỏ, xoay trang và lật trang tức thì.

### 11. Quản lý tác vụ & Cài đặt cục bộ (SQLite)
- Lưu lịch sử tác vụ an toàn bằng SQLite cục bộ trên máy.
- Mở nhanh tệp kết quả hoặc thư mục lưu trong Windows Explorer.
- Cấu hình thư mục xuất mặc định và quy tắc xử lý tệp trùng tên.

---

## IV. KIẾN TRÚC HỆ THỐNG

```
d:\pdf tools\
├── src/                          # Giao diện Frontend React + TypeScript
│   ├── app/
│   ├── components/
│   │   ├── layout/               # Header, Footer, ToolGrid (5 cột)
│   │   ├── workspace/            # Workspace, Dropzone, ToolOptions, PdfViewerModal
│   │   ├── modals/               # HistoryModal, SettingsModal, HelpModal, AboutModal
│   │   └── ui/                   # Toast, Controls
│   ├── data/                     # Danh sách công cụ, metadata
│   ├── services/                 # Tauri API Bridge (invoke native commands)
│   ├── types/                    # Định nghĩa TypeScript interface
│   ├── App.tsx                   # Central State & Event Orchestrator
│   └── main.tsx
├── src-tauri/                    # Nhân xử lý Native Rust
│   ├── src/
│   │   ├── commands/             # Các Tauri Command điều phối thao tác file
│   │   ├── db.rs                 # Cơ sở dữ liệu SQLite quản lý lịch sử & cài đặt
│   │   ├── engine/               # Trình kiểm tra & điều phối LibreOffice, Tesseract OCR
│   │   ├── pdf/                  # Thư viện xử lý PDF thuần Rust:
│   │   │   ├── compress.rs       # Nén luồng, dọn đối tượng
│   │   │   ├── images.rs         # Ảnh sang PDF, xử lý tọa độ
│   │   │   ├── info.rs           # Đọc metadata, số trang, mã hóa
│   │   │   ├── merge.rs          # Gộp PDF với phạm vi trang
│   │   │   ├── metadata.rs       # Đọc/ghi thông tin tài liệu
│   │   │   ├── organize.rs       # Xoay, đảo thứ tự, xóa, chèn trang trắng
│   │   │   ├── split.rs          # Tách theo trang / khoảng trang / chunk
│   │   │   ├── text.rs           # Bóc tách văn bản, Text sang PDF
│   │   │   └── watermark.rs      # Đóng dấu bản quyền, chèn số trang
│   │   ├── lib.rs                # Khởi tạo plugin, đăng ký handler
│   │   └── main.rs
│   ├── capabilities/             # Phân quyền bảo mật Tauri 2
│   ├── tests/                    # Bộ kiểm thử tự động (Unit & Integration Tests)
│   ├── Cargo.toml                # Rust dependencies khóa phiên bản ổn định
│   └── tauri.conf.json           # Cấu hình cửa sổ và đóng gói NSIS
└── package.json
```

---

## V. HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### 1. Yêu cầu môi trường phát triển (Dev Machine)
- **Hệ điều hành:** Windows 10/11 64-bit.
- **Node.js:** v18.0.0 trở lên (khuyên dùng Node 20+ hoặc 22+).
- **Rust toolchain:** `rustc` và `cargo` (phiên bản 1.75+).

### 2. Cài đặt dependencies
Mở PowerShell tại thư mục dự án:
```powershell
npm install
```

### 3. Chạy ở chế độ phát triển (Development)
```powershell
npm run tauri dev
```
Cửa sổ desktop sẽ tự động khởi chạy cùng tính năng Hot-Reload cho cả giao diện React lẫn nhân Rust backend.

### 4. Chạy kiểm thử tự động (Automated Tests)
Thực thi toàn bộ bộ kiểm thử đơn vị và tích hợp cho các tác vụ PDF:
```powershell
cd src-tauri
cargo test
```

### 5. Đóng gói bản phát hành (Production Build & Setup.exe)
Để tạo file thực thi độc lập và trình cài đặt NSIS Windows Setup:
```powershell
npm run tauri build
```
Sau khi hoàn tất, các tệp phân phối sẽ nằm tại:
- **Trình cài đặt:** `src-tauri/target/release/bundle/nsis/PDF Tools NCN_1.0.0_x64-setup.exe`
- **File chạy trực tiếp:** `src-tauri/target/release/PDF Tools NCN.exe`

---

## VI. CẤU HÌNH BỔ TRỢ (TÙY CHỌN)

- **LibreOffice Headless (Chuyển đổi Office):**
  Tải và cài đặt từ: [https://www.libreoffice.org/download/download/](https://www.libreoffice.org/download/download/)
  Nếu cài đặt ở thư mục không mặc định, mở mục **Cài đặt** trong ứng dụng và dán đường dẫn tệp `soffice.exe`.

- **Tesseract OCR (Nhận dạng tiếng Việt):**
  Tải và cài đặt từ: [https://github.com/UB-Mannheim/tesseract/wiki](https://github.com/UB-Mannheim/tesseract/wiki)
  Tải tệp dữ liệu `vie.traineddata` vào thư mục `tessdata` để nhận dạng tiếng Việt có dấu.

---

## VII. GIẤY PHÉP VÀ BẢN QUYỀN
Phần mềm phát triển phi thương mại, đóng góp miễn phí cho cộng đồng.
Các thư viện sử dụng tuân thủ giấy phép nguồn mở (MIT / Apache 2.0):
- Tauri Framework (MIT / Apache-2.0)
- lopdf (MIT)
- rusqlite (MIT)
- Lucide React (ISC)
- Tailwind CSS (MIT)
