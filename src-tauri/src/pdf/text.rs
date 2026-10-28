use lopdf::{Document, Object, Stream};
use std::fs;
use std::path::Path;

pub fn pdf_to_text(file_path: &str, output_path: &str) -> Result<String, String> {
    let doc = Document::load(file_path).map_err(|e| format!("Lỗi mở PDF: {}", e))?;
    let total_pages = doc.get_pages().len() as u32;

    let mut full_text = String::new();
    for p in 1..=total_pages {
        full_text.push_str(&format!("--- Trang {} ---\n", p));
        match doc.extract_text(&[p]) {
            Ok(txt) => {
                full_text.push_str(&txt);
                full_text.push_str("\n\n");
            }
            Err(e) => {
                full_text.push_str(&format!("[Không thể trích xuất văn bản từ trang này: {}]\n\n", e));
            }
        }
    }

    if let Some(parent) = Path::new(output_path).parent() {
        let _ = fs::create_dir_all(parent);
    }

    fs::write(output_path, full_text).map_err(|e| format!("Lỗi lưu file TXT: {}", e))?;
    Ok(output_path.to_string())
}

pub fn text_to_pdf(text_file_path: &str, output_path: &str) -> Result<String, String> {
    let content = fs::read_to_string(text_file_path)
        .map_err(|e| format!("Không thể đọc file văn bản: {}", e))?;

    let mut doc = Document::with_version("1.5");
    let pages_id = (1, 0);
    doc.max_id = 1;

    let mut pages_dict = lopdf::Dictionary::new();
    pages_dict.set("Type", Object::Name(b"Pages".to_vec()));
    pages_dict.set("Kids", Object::Array(Vec::new()));
    pages_dict.set("Count", Object::Integer(0));
    doc.objects.insert(pages_id, Object::Dictionary(pages_dict));

    let catalog_id = (2, 0);
    doc.max_id = 2;
    let mut catalog_dict = lopdf::Dictionary::new();
    catalog_dict.set("Type", Object::Name(b"Catalog".to_vec()));
    catalog_dict.set("Pages", Object::Reference(pages_id));
    doc.objects.insert(catalog_id, Object::Dictionary(catalog_dict));
    doc.trailer.set("Root", Object::Reference(catalog_id));

    // Standard font Helvetica
    doc.max_id += 1;
    let font_id = (doc.max_id, 0);
    let mut font_dict = lopdf::Dictionary::new();
    font_dict.set("Type", Object::Name(b"Font".to_vec()));
    font_dict.set("Subtype", Object::Name(b"Type1".to_vec()));
    font_dict.set("BaseFont", Object::Name(b"Helvetica".to_vec()));
    doc.objects.insert(font_id, Object::Dictionary(font_dict));

    let lines: Vec<&str> = content.lines().collect();
    let lines_per_page = 45;
    let chunks = lines.chunks(lines_per_page);

    for chunk in chunks {
        let mut stream_content = String::from("BT\n/F1 11 Tf\n1 0 0 1 50 780 Tm\n14 TL\n");
        for line in chunk {
            let escaped = line.replace('\\', "\\\\").replace('(', "\\(").replace(')', "\\)");
            stream_content.push_str(&format!("({}) '\n", escaped));
        }
        stream_content.push_str("ET\n");

        doc.max_id += 1;
        let content_id = (doc.max_id, 0);
        let stream = Stream::new(lopdf::Dictionary::new(), stream_content.into_bytes());
        doc.objects.insert(content_id, Object::Stream(stream));

        doc.max_id += 1;
        let page_id = (doc.max_id, 0);

        let mut page_dict = lopdf::Dictionary::new();
        page_dict.set("Type", Object::Name(b"Page".to_vec()));
        page_dict.set("Parent", Object::Reference(pages_id));
        page_dict.set(
            "MediaBox",
            Object::Array(vec![
                Object::Real(0.0),
                Object::Real(0.0),
                Object::Real(595.28),
                Object::Real(841.89),
            ]),
        );
        page_dict.set("Contents", Object::Reference(content_id));

        let mut font_map = lopdf::Dictionary::new();
        font_map.set("F1", Object::Reference(font_id));
        let mut res_dict = lopdf::Dictionary::new();
        res_dict.set("Font", Object::Dictionary(font_map));
        page_dict.set("Resources", Object::Dictionary(res_dict));

        doc.objects.insert(page_id, Object::Dictionary(page_dict));

        if let Some(pages_obj) = doc.objects.get_mut(&pages_id) {
            if let Ok(p_dict) = pages_obj.as_dict_mut() {
                if let Ok(kids) = p_dict.get_mut(b"Kids").and_then(|k| k.as_array_mut()) {
                    kids.push(Object::Reference(page_id));
                    let count = kids.len() as i64;
                    p_dict.set("Count", Object::Integer(count));
                }
            }
        }
    }

    if let Some(parent) = Path::new(output_path).parent() {
        let _ = fs::create_dir_all(parent);
    }
    doc.save(output_path).map_err(|e| format!("Lỗi lưu PDF: {}", e))?;
    Ok(output_path.to_string())
}
