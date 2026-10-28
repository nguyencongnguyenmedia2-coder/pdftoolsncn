# Website & Landing Page — PDF Tools NCN

Website truyền thông, giới thiệu tính năng, hướng dẫn sử dụng và phân phối chính thức bộ cài đặt **PDF Tools NCN** cho hệ điều hành Windows 10/11 (64-bit).

---

## 1. Công nghệ sử dụng

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Giao diện & Styling:** Tailwind CSS (`#0D0B18`, `#151228`, `#1C1834`, `#7657F6`, `#A78BFA`)
- **Icons:** Lucide React
- **Xác thực biểu mẫu:** React Hook Form + Zod (`src/lib/validation.ts`)
- **SEO & Structured Data:** Metadata riêng cho từng route, Sitemap XML tự động (`/sitemap.xml`), `robots.txt`, JSON-LD (`SoftwareApplication`, `WebSite`, `BreadcrumbList`, `FAQPage`), Open Graph 1200x630.

---

## 2. Cấu trúc các trang (Routes)

- `/` — Trang chủ (Landing Page 13 phân khu hoàn chỉnh)
- `/features` — Tổng hợp 5 nhóm tính năng
- `/features/merge-pdf` — Chi tiết công cụ Gộp PDF
- `/features/split-pdf` — Chi tiết công cụ Tách & Chỉnh sửa trang trực quan
- `/features/convert-pdf` — Chi tiết công cụ Chuyển đổi Word, Excel, PPT, Ảnh ↔ PDF
- `/features/compress-pdf` — Chi tiết công cụ Nén & Tối ưu dung lượng PDF
- `/features/ocr` — Chi tiết công cụ Nhận dạng ký tự OCR Tiếng Việt
- `/download` — Trang tải bộ cài đặt Windows (`Setup.exe`), kiểm tra SHA-256 và cấu hình hệ thống
- `/guide` — Hướng dẫn cài đặt, sử dụng và cấu hình Office/OCR
- `/faq` — Câu hỏi thường gặp (12 câu hỏi thực tế)
- `/privacy` — Chính sách quyền riêng tư
- `/terms` — Điều khoản sử dụng
- `/contact` — Biểu mẫu liên hệ hỗ trợ, báo lỗi & đề xuất tính năng (kèm API `/api/contact` chống spam)
- `/changelog` — Lịch sử cập nhật phiên bản

---

## 3. Chạy dự án trên máy cục bộ

```bash
cd "D:\pdf tools\website"
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ: `http://localhost:3000`

Kiểm tra kiểu dữ liệu TypeScript và đóng gói Production:

```bash
npm run typecheck
npm run build
npm run start
```

---

## 4. Hướng dẫn cập nhật phiên bản & URL tải bộ cài (`Setup.exe`)

Mọi thông tin về phiên bản phát hành được quản lý tập trung tại một tệp duy nhất:
`src/config/release.ts`

Khi phát hành phiên bản mới của ứng dụng desktop:
1. Biên dịch bộ cài mới tại thư mục gốc (`npm run tauri build`).
2. Tính mã kiểm tra SHA-256 bằng PowerShell:
   ```powershell
   Get-FileHash ".\src-tauri\target\release\bundle\nsis\PDF Tools NCN_1.0.0_x64-setup.exe" -Algorithm SHA256
   ```
3. Sao chép file cài đặt vào `website/public/releases/` hoặc tải lên GitHub Releases / Cloudflare R2 / CDN.
4. Cập nhật các trường `version`, `releaseDate`, `installerUrl`, `fileSize`, `sha256` trong `src/config/release.ts` (hoặc cấu hình qua biến môi trường trên Vercel).

---

## 5. Hướng dẫn triển khai lên Vercel & Cấu hình tên miền (Domain)

1. Đẩy mã nguồn lên GitHub / GitLab.
2. Đăng nhập [Vercel](https://vercel.com) → chọn **Add New Project** → Import kho chứa mã nguồn.
3. Trong mục **Root Directory**, chọn thư mục `website`.
4. Thiết lập các biến môi trường (Environment Variables) tùy chọn:
   - `NEXT_PUBLIC_SITE_URL`: `https://ten-mien-cua-ban.vn`
   - `NEXT_PUBLIC_APP_VERSION`: `1.0.0`
   - `NEXT_PUBLIC_INSTALLER_URL`: Đường dẫn tới file `.exe` (mặc định dùng `/releases/PDF-Tools-NCN_1.0.0_x64-setup.exe`)
   - `NEXT_PUBLIC_DOWNLOAD_AVAILABLE`: `true`
   - `CONTACT_WEBHOOK_URL`: (Tùy chọn) URL Webhook hoặc Supabase endpoint để nhận thông báo khi có người gửi form liên hệ.
5. Nhấn **Deploy**.
6. **Cấu hình tên miền riêng:** Vào **Project Settings → Domains**, thêm tên miền của bạn và trỏ bản ghi DNS `A` (`76.76.21.21`) hoặc `CNAME` (`cname.vercel-dns.com`) theo hướng dẫn của Vercel.

