use super::merge::parse_page_range;
use lopdf::Document;
use std::fs;
use std::path::{Path, PathBuf};

pub fn split_pdf_all(
    file_path: &str,
    output_dir: &str,
) -> Result<Vec<String>, String> {
    let path = Path::new(file_path);
    let stem = path
        .file_stem()
        .map(|s| s.to_string_lossy().to_string())
        .unwrap_or_else(|| "document".to_string());

    let doc = Document::load(file_path).map_err(|e| format!("Lỗi tải PDF: {}", e))?;
    let total_pages = doc.get_pages().len() as u32;

    fs::create_dir_all(output_dir).map_err(|e| format!("Lỗi tạo thư mục đầu ra: {}", e))?;

    let mut output_files = Vec::new();

    for p in 1..=total_pages {
        let mut single_doc = doc.clone();
        let pages_to_delete: Vec<u32> = (1..=total_pages).filter(|&x| x != p).collect();
        if !pages_to_delete.is_empty() {
            single_doc.delete_pages(&pages_to_delete);
        }
        let out_filename = format!("{}_page_{:03}.pdf", stem, p);
        let out_path = PathBuf::from(output_dir).join(out_filename);
        let out_path_str = out_path.to_string_lossy().to_string();

        single_doc
            .save(&out_path)
            .map_err(|e| format!("Lỗi lưu trang {}: {}", p, e))?;
        output_files.push(out_path_str);
    }

    Ok(output_files)
}

pub fn split_pdf_ranges(
    file_path: &str,
    ranges_str: &str,
    output_dir: &str,
) -> Result<Vec<String>, String> {
    let path = Path::new(file_path);
    let stem = path
        .file_stem()
        .map(|s| s.to_string_lossy().to_string())
        .unwrap_or_else(|| "document".to_string());

    let doc = Document::load(file_path).map_err(|e| format!("Lỗi tải PDF: {}", e))?;
    let total_pages = doc.get_pages().len() as u32;

    fs::create_dir_all(output_dir).map_err(|e| format!("Lỗi tạo thư mục đầu ra: {}", e))?;

    let parts: Vec<&str> = ranges_str.split(',').map(|s| s.trim()).filter(|s| !s.is_empty()).collect();
    if parts.is_empty() {
        return Err("Chưa nhập khoảng trang hợp lệ (ví dụ: 1-3, 4-6)".into());
    }

    let mut output_files = Vec::new();

    for (idx, part) in parts.iter().enumerate() {
        let keep_pages = parse_page_range(part, total_pages);
        if keep_pages.is_empty() {
            continue;
        }

        let mut part_doc = doc.clone();
        let pages_to_delete: Vec<u32> = (1..=total_pages)
            .filter(|p| !keep_pages.contains(p))
            .collect();
        if !pages_to_delete.is_empty() {
            part_doc.delete_pages(&pages_to_delete);
        }

        let clean_part = part.replace(['/', '\\', ':', '*', '?', '"', '<', '>', '|'], "_");
        let out_filename = format!("{}_part{}_{}.pdf", stem, idx + 1, clean_part);
        let out_path = PathBuf::from(output_dir).join(out_filename);
        let out_path_str = out_path.to_string_lossy().to_string();

        part_doc
            .save(&out_path)
            .map_err(|e| format!("Lỗi lưu phần {}: {}", idx + 1, e))?;
        output_files.push(out_path_str);
    }

    Ok(output_files)
}

pub fn split_pdf_fixed_count(
    file_path: &str,
    pages_per_file: u32,
    output_dir: &str,
) -> Result<Vec<String>, String> {
    if pages_per_file == 0 {
        return Err("Số trang mỗi file phải lớn hơn 0".into());
    }

    let path = Path::new(file_path);
    let stem = path
        .file_stem()
        .map(|s| s.to_string_lossy().to_string())
        .unwrap_or_else(|| "document".to_string());

    let doc = Document::load(file_path).map_err(|e| format!("Lỗi tải PDF: {}", e))?;
    let total_pages = doc.get_pages().len() as u32;

    fs::create_dir_all(output_dir).map_err(|e| format!("Lỗi tạo thư mục đầu ra: {}", e))?;

    let mut output_files = Vec::new();
    let num_chunks = (total_pages + pages_per_file - 1) / pages_per_file;

    for chunk_idx in 0..num_chunks {
        let start_page = chunk_idx * pages_per_file + 1;
        let end_page = (start_page + pages_per_file - 1).min(total_pages);
        let keep_pages: Vec<u32> = (start_page..=end_page).collect();

        let mut chunk_doc = doc.clone();
        let pages_to_delete: Vec<u32> = (1..=total_pages)
            .filter(|p| !keep_pages.contains(p))
            .collect();
        if !pages_to_delete.is_empty() {
            chunk_doc.delete_pages(&pages_to_delete);
        }

        let out_filename = format!("{}_chunk_{:02}_pages_{}-{}.pdf", stem, chunk_idx + 1, start_page, end_page);
        let out_path = PathBuf::from(output_dir).join(out_filename);
        let out_path_str = out_path.to_string_lossy().to_string();

        chunk_doc
            .save(&out_path)
            .map_err(|e| format!("Lỗi lưu tệp {}: {}", chunk_idx + 1, e))?;
        output_files.push(out_path_str);
    }

    Ok(output_files)
}
