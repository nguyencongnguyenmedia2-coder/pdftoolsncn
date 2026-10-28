use lopdf::{Document, Object, ObjectId};
use serde::{Deserialize, Serialize};
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PageEditInstruction {
    #[serde(rename = "originalPage")]
    pub original_page: Option<u32>, // 1-based original page number, None if new blank page
    pub rotation: i64,              // 0, 90, 180, 270
    pub deleted: bool,
    pub blank: Option<bool>,
}

pub fn organize_pdf(
    file_path: &str,
    instructions: &[PageEditInstruction],
    output_path: &str,
) -> Result<String, String> {
    let mut doc = Document::load(file_path).map_err(|e| format!("Lỗi tải PDF: {}", e))?;

    // Map 1-based page numbers to their original ObjectIds
    let pages_map = doc.get_pages();
    let original_total = pages_map.len() as u32;

    let target_pages_id = doc
        .catalog()
        .and_then(|cat| cat.get(b"Pages"))
        .and_then(|obj| obj.as_reference())
        .map_err(|e| format!("Không tìm thấy Pages trong Catalog: {}", e))?;

    let mut new_kids: Vec<Object> = Vec::new();

    for inst in instructions {
        if inst.deleted {
            continue;
        }

        if inst.blank.unwrap_or(false) || inst.original_page.is_none() {
            // Create a blank A4 page (595.28 x 841.89 pt)
            doc.max_id += 1;
            let blank_page_id: ObjectId = (doc.max_id, 0);

            let mut page_dict = lopdf::Dictionary::new();
            page_dict.set("Type", Object::Name(b"Page".to_vec()));
            page_dict.set("Parent", Object::Reference(target_pages_id));
            page_dict.set(
                "MediaBox",
                Object::Array(vec![
                    Object::Real(0.0),
                    Object::Real(0.0),
                    Object::Real(595.28),
                    Object::Real(841.89),
                ]),
            );
            if inst.rotation != 0 {
                page_dict.set("Rotate", Object::Integer(inst.rotation));
            }
            doc.objects.insert(blank_page_id, Object::Dictionary(page_dict));
            new_kids.push(Object::Reference(blank_page_id));
        } else if let Some(orig_p) = inst.original_page {
            if orig_p >= 1 && orig_p <= original_total {
                if let Some(&page_obj_id) = pages_map.get(&orig_p) {
                    // Apply rotation if needed
                    if inst.rotation != 0 {
                        if let Ok(page_dict) = doc.get_object_mut(page_obj_id).and_then(|o| o.as_dict_mut()) {
                            let curr_rot = page_dict
                                .get(b"Rotate")
                                .and_then(|r| r.as_i64())
                                .unwrap_or(0);
                            let new_rot = (curr_rot + inst.rotation) % 360;
                            page_dict.set("Rotate", Object::Integer(new_rot));
                        }
                    }
                    new_kids.push(Object::Reference(page_obj_id));
                }
            }
        }
    }

    if new_kids.is_empty() {
        return Err("Không có trang nào được giữ lại sau khi chỉnh sửa".into());
    }

    // Update Pages dictionary
    let pages_dict = doc
        .get_object_mut(target_pages_id)
        .and_then(|obj| obj.as_dict_mut())
        .map_err(|e| format!("Không thể cập nhật Pages dictionary: {}", e))?;

    let count = new_kids.len() as i64;
    pages_dict.set("Kids", Object::Array(new_kids));
    pages_dict.set("Count", Object::Integer(count));

    if let Some(parent) = Path::new(output_path).parent() {
        let _ = std::fs::create_dir_all(parent);
    }

    doc.save(output_path).map_err(|e| format!("Lỗi lưu file: {}", e))?;
    Ok(output_path.to_string())
}
