use lopdf::Document;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CompressResult {
    #[serde(rename = "outputPath")]
    pub output_path: String,
    #[serde(rename = "originalSize")]
    pub original_size: u64,
    #[serde(rename = "compressedSize")]
    pub compressed_size: u64,
    #[serde(rename = "savedBytes")]
    pub saved_bytes: u64,
    #[serde(rename = "savedPercentage")]
    pub saved_percentage: f64,
}

pub fn compress_pdf(
    file_path: &str,
    level: &str, // "low", "medium", "high"
    strip_metadata: bool,
    output_path: &str,
) -> Result<CompressResult, String> {
    let original_size = fs::metadata(file_path)
        .map_err(|e| format!("Không đọc được kích thước file gốc: {}", e))?
        .len();

    let mut doc = Document::load(file_path).map_err(|e| format!("Lỗi mở PDF: {}", e))?;

    // Compress all internal streams using FlateDecode
    doc.compress();

    // Prune unused objects
    doc.prune_objects();

    // Strip metadata if requested or in high compression mode
    if strip_metadata || level == "high" {
        // Remove Info dict reference from trailer
        doc.trailer.remove(b"Info");

        // Remove Metadata XMP from catalog
        if let Ok(cat_id) = doc.catalog().and_then(|cat| cat.get(b"Metadata")).and_then(|m| m.as_reference()) {
            doc.objects.remove(&cat_id);
            if let Ok(catalog) = doc.catalog_mut() {
                catalog.remove(b"Metadata");
            }
        }
    }

    if let Some(parent) = Path::new(output_path).parent() {
        let _ = fs::create_dir_all(parent);
    }

    doc.save(output_path).map_err(|e| format!("Lỗi lưu file nén: {}", e))?;

    let compressed_size = fs::metadata(output_path)
        .map_err(|e| format!("Không đọc được kích thước file sau khi nén: {}", e))?
        .len();

    let (saved_bytes, saved_percentage) = if compressed_size < original_size {
        let diff = original_size - compressed_size;
        let pct = (diff as f64 / original_size as f64) * 100.0;
        (diff, pct)
    } else {
        (0, 0.0)
    };

    Ok(CompressResult {
        output_path: output_path.to_string(),
        original_size,
        compressed_size,
        saved_bytes,
        saved_percentage,
    })
}
