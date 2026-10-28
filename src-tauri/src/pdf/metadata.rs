use lopdf::{Document, Object};
use std::fs;
use std::path::Path;

pub fn edit_metadata(
    file_path: &str,
    title: Option<&str>,
    author: Option<&str>,
    creator: Option<&str>,
    strip_all: bool,
    output_path: &str,
) -> Result<String, String> {
    let mut doc = Document::load(file_path).map_err(|e| format!("Lỗi tải PDF: {}", e))?;

    if strip_all {
        doc.trailer.remove(b"Info");
        if let Ok(catalog) = doc.catalog_mut() {
            catalog.remove(b"Metadata");
        }
    } else {
        let info_id = if let Ok(info_ref) = doc.trailer.get(b"Info").and_then(|i| i.as_reference()) {
            info_ref
        } else {
            doc.max_id += 1;
            let new_id = (doc.max_id, 0);
            doc.objects.insert(new_id, Object::Dictionary(lopdf::Dictionary::new()));
            doc.trailer.set("Info", Object::Reference(new_id));
            new_id
        };

        if let Some(info_obj) = doc.objects.get_mut(&info_id) {
            if let Ok(info_dict) = info_obj.as_dict_mut() {
                if let Some(t) = title {
                    info_dict.set("Title", Object::string_literal(t));
                }
                if let Some(a) = author {
                    info_dict.set("Author", Object::string_literal(a));
                }
                if let Some(c) = creator {
                    info_dict.set("Creator", Object::string_literal(c));
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

