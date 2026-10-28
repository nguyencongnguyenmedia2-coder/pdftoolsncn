use lopdf::Document;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PdfInfo {
    pub path: String,
    pub name: String,
    pub size: u64,
    #[serde(rename = "formattedSize")]
    pub formatted_size: String,
    #[serde(rename = "pageCount")]
    pub page_count: u32,
    pub encrypted: bool,
    pub version: String,
    pub title: Option<String>,
    pub author: Option<String>,
    pub creator: Option<String>,
    pub producer: Option<String>,
    #[serde(rename = "creationDate")]
    pub creation_date: Option<String>,
    #[serde(rename = "modificationDate")]
    pub modification_date: Option<String>,
}

fn format_bytes(bytes: u64) -> String {
    const KB: u64 = 1024;
    const MB: u64 = KB * 1024;
    const GB: u64 = MB * 1024;

    if bytes >= GB {
        format!("{:.2} GB", bytes as f64 / GB as f64)
    } else if bytes >= MB {
        format!("{:.2} MB", bytes as f64 / MB as f64)
    } else if bytes >= KB {
        format!("{:.1} KB", bytes as f64 / KB as f64)
    } else {
        format!("{} B", bytes)
    }
}

pub fn read_pdf_info(file_path: &str) -> Result<PdfInfo, String> {
    let path = Path::new(file_path);
    if !path.exists() {
        return Err(format!("File không tồn tại: {}", file_path));
    }

    let metadata = fs::metadata(path).map_err(|e| format!("Không thể đọc thông tin file: {}", e))?;
    let size = metadata.len();
    let file_name = path
        .file_name()
        .map(|s| s.to_string_lossy().to_string())
        .unwrap_or_else(|| "Unknown".to_string());

    // Try loading PDF
    let doc = Document::load(path).map_err(|e| {
        format!(
            "Không thể mở file PDF: {}. (File có thể bị hỏng hoặc có mật khẩu bảo vệ)",
            e
        )
    })?;

    let page_count = doc.get_pages().len() as u32;
    let version = doc.version.clone();
    let encrypted = doc.is_encrypted();

    let mut title = None;
    let mut author = None;
    let mut creator = None;
    let mut producer = None;
    let mut creation_date = None;
    let mut modification_date = None;

    let resolved_info = match doc.trailer.get(b"Info") {
        Ok(lopdf::Object::Reference(ref_id)) => doc.get_object(*ref_id).ok().and_then(|o| o.as_dict().ok()),
        Ok(lopdf::Object::Dictionary(ref dict)) => Some(dict),
        _ => None,
    };

    if let Some(dict) = resolved_info {
        if let Ok(val) = dict.get(b"Title") {
            if let Ok(s) = val.as_str() {
                title = Some(String::from_utf8_lossy(s).to_string());
            }
        }
        if let Ok(val) = dict.get(b"Author") {
            if let Ok(s) = val.as_str() {
                author = Some(String::from_utf8_lossy(s).to_string());
            }
        }
        if let Ok(val) = dict.get(b"Creator") {
            if let Ok(s) = val.as_str() {
                creator = Some(String::from_utf8_lossy(s).to_string());
            }
        }
        if let Ok(val) = dict.get(b"Producer") {
            if let Ok(s) = val.as_str() {
                producer = Some(String::from_utf8_lossy(s).to_string());
            }
        }
        if let Ok(val) = dict.get(b"CreationDate") {
            if let Ok(s) = val.as_str() {
                creation_date = Some(String::from_utf8_lossy(s).to_string());
            }
        }
        if let Ok(val) = dict.get(b"ModDate") {
            if let Ok(s) = val.as_str() {
                modification_date = Some(String::from_utf8_lossy(s).to_string());
            }
        }
    }

    Ok(PdfInfo {
        path: file_path.to_string(),
        name: file_name,
        size,
        formatted_size: format_bytes(size),
        page_count,
        encrypted,
        version,
        title,
        author,
        creator,
        producer,
        creation_date,
        modification_date,
    })
}
