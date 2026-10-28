use lopdf::{Document, Object, Stream};
use std::path::Path;

pub fn add_watermark_and_numbering(
    file_path: &str,
    watermark_text: Option<&str>,
    watermark_opacity: f32, // 0.1 to 1.0
    watermark_rotation: i32, // e.g. 45
    watermark_size: f32,
    page_numbers: bool,
    page_number_format: Option<&str>, // "Trang {n} / {total}"
    output_path: &str,
) -> Result<String, String> {
    let mut doc = Document::load(file_path).map_err(|e| format!("Lỗi tải PDF: {}", e))?;
    let pages = doc.get_pages();
    let total_pages = pages.len();

    // Standard font Helvetica object id
    doc.max_id += 1;
    let font_id = (doc.max_id, 0);
    let mut font_dict = lopdf::Dictionary::new();
    font_dict.set("Type", Object::Name(b"Font".to_vec()));
    font_dict.set("Subtype", Object::Name(b"Type1".to_vec()));
    font_dict.set("BaseFont", Object::Name(b"Helvetica".to_vec()));
    doc.objects.insert(font_id, Object::Dictionary(font_dict));

    for (page_idx, (&_page_num, &page_id)) in pages.iter().enumerate() {
        // Find page dimensions (MediaBox)
        let mut width = 595.28f32;
        let mut height = 841.89f32;

        if let Ok(page_dict) = doc.get_object(page_id).and_then(|o| o.as_dict()) {
            if let Ok(mb) = page_dict.get(b"MediaBox").and_then(|m| m.as_array()) {
                if mb.len() >= 4 {
                    let w = mb[2].as_f32().unwrap_or(595.28);
                    let h = mb[3].as_f32().unwrap_or(841.89);
                    width = w;
                    height = h;
                }
            }
        }

        // Build operations string
        let mut stream_content = String::new();

        // 1. Watermark if present
        if let Some(wm) = watermark_text {
            if !wm.trim().is_empty() {
                // Escape parentheses in text
                let escaped_wm = wm.replace('\\', "\\\\").replace('(', "\\(").replace(')', "\\)");
                let rad = (watermark_rotation as f32) * std::f32::consts::PI / 180.0;
                let cos_a = rad.cos();
                let sin_a = rad.sin();
                let cx = width / 2.0;
                let cy = height / 2.0;

                let gray = 1.0 - (watermark_opacity * 0.5); // soft gray appearance
                stream_content.push_str(&format!(
                    "q\n{:.2} {:.2} {:.2} rg\nBT\n/F_NCN {:.1} Tf\n{:.4} {:.4} {:.4} {:.4} {:.2} {:.2} Tm\n({})\nET\nQ\n",
                    gray, gray, gray,
                    watermark_size,
                    cos_a, sin_a, -sin_a, cos_a,
                    cx - (escaped_wm.len() as f32 * watermark_size * 0.25),
                    cy,
                    escaped_wm
                ));
            }
        }

        // 2. Page numbering if requested
        if page_numbers {
            let fmt = page_number_format.unwrap_or("Trang {n} / {total}");
            let text = fmt
                .replace("{n}", &(page_idx + 1).to_string())
                .replace("{total}", &total_pages.to_string());
            let escaped_text = text.replace('\\', "\\\\").replace('(', "\\(").replace(')', "\\)");

            // Bottom center (x = width / 2, y = 25 pt)
            let x = (width / 2.0) - (escaped_text.len() as f32 * 3.5);
            let y = 25.0f32;

            stream_content.push_str(&format!(
                "q\n0.3 0.3 0.3 rg\nBT\n/F_NCN 10 Tf\n1 0 0 1 {:.2} {:.2} Tm\n({})\nTj\nET\nQ\n",
                x, y, escaped_text
            ));
        }

        if !stream_content.is_empty() {
            doc.max_id += 1;
            let watermark_stream_id = (doc.max_id, 0);
            let stream_obj = Stream::new(lopdf::Dictionary::new(), stream_content.into_bytes());
            doc.objects.insert(watermark_stream_id, Object::Stream(stream_obj));

            // Attach font to page Resources
            if let Ok(page_dict) = doc.get_object_mut(page_id).and_then(|o| o.as_dict_mut()) {
                // Ensure Resources dict exists
                if !page_dict.has(b"Resources") {
                    page_dict.set("Resources", Object::Dictionary(lopdf::Dictionary::new()));
                }

                if let Ok(res_dict) = page_dict.get_mut(b"Resources").and_then(|r| r.as_dict_mut()) {
                    if !res_dict.has(b"Font") {
                        res_dict.set("Font", Object::Dictionary(lopdf::Dictionary::new()));
                    }
                    if let Ok(font_map) = res_dict.get_mut(b"Font").and_then(|f| f.as_dict_mut()) {
                        font_map.set("F_NCN", Object::Reference(font_id));
                    }
                }

                // Append watermark stream to Contents
                if let Ok(contents_obj) = page_dict.get_mut(b"Contents") {
                    match contents_obj {
                        Object::Array(arr) => {
                            arr.push(Object::Reference(watermark_stream_id));
                        }
                        Object::Reference(single_ref) => {
                            let old_ref = *single_ref;
                            *contents_obj = Object::Array(vec![
                                Object::Reference(old_ref),
                                Object::Reference(watermark_stream_id),
                            ]);
                        }
                        _ => {
                            *contents_obj = Object::Array(vec![Object::Reference(watermark_stream_id)]);
                        }
                    }
                } else {
                    page_dict.set("Contents", Object::Array(vec![Object::Reference(watermark_stream_id)]));
                }
            }
        }
    }

    if let Some(parent) = Path::new(output_path).parent() {
        let _ = std::fs::create_dir_all(parent);
    }
    doc.save(output_path).map_err(|e| format!("Lỗi lưu file: {}", e))?;
    Ok(output_path.to_string())
}
