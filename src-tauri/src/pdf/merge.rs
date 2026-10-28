use lopdf::{Document, Object, ObjectId};
use std::collections::HashMap;
use std::path::Path;

/// Parses page range string like "1-3, 5, 8-10" into a list of 1-based page numbers
pub fn parse_page_range(range_str: &str, total_pages: u32) -> Vec<u32> {
    let mut pages = Vec::new();
    let parts = range_str.split(',');
    for part in parts {
        let part = part.trim();
        if part.is_empty() {
            continue;
        }
        if part.contains('-') {
            let mut bounds = part.split('-');
            let start = bounds
                .next()
                .and_then(|s| s.trim().parse::<u32>().ok())
                .unwrap_or(1);
            let end = bounds
                .next()
                .and_then(|s| s.trim().parse::<u32>().ok())
                .unwrap_or(total_pages);
            let (from, to) = if start <= end {
                (start, end)
            } else {
                (end, start)
            };
            for p in from..=to {
                if p >= 1 && p <= total_pages && !pages.contains(&p) {
                    pages.push(p);
                }
            }
        } else if let Ok(p) = part.parse::<u32>() {
            if p >= 1 && p <= total_pages && !pages.contains(&p) {
                pages.push(p);
            }
        }
    }
    pages.sort_unstable();
    pages
}

pub fn merge_documents(
    files: &[String],
    page_ranges: Option<&HashMap<String, String>>,
    output_path: &str,
) -> Result<String, String> {
    if files.is_empty() {
        return Err("Danh sách file cần gộp rỗng".into());
    }

    if files.len() == 1 {
        // Just copy or rewrite single file
        let mut doc = Document::load(&files[0]).map_err(|e| format!("Lỗi tải PDF: {}", e))?;
        if let Some(ranges_map) = page_ranges {
            if let Some(range_str) = ranges_map.get(&files[0]) {
                let total = doc.get_pages().len() as u32;
                let keep_pages = parse_page_range(range_str, total);
                let all_pages: Vec<u32> = (1..=total).collect();
                let to_delete: Vec<u32> = all_pages
                    .into_iter()
                    .filter(|p| !keep_pages.contains(p))
                    .collect();
                if !to_delete.is_empty() {
                    doc.delete_pages(&to_delete);
                }
            }
        }
        doc.save(output_path)
            .map_err(|e| format!("Lỗi lưu PDF: {}", e))?;
        return Ok(output_path.to_string());
    }

    // Load first document as base
    let mut target_doc = Document::load(&files[0])
        .map_err(|e| format!("Lỗi mở file '{}': {}", files[0], e))?;

    // Handle range for first document if specified
    if let Some(ranges_map) = page_ranges {
        if let Some(range_str) = ranges_map.get(&files[0]) {
            let total = target_doc.get_pages().len() as u32;
            let keep_pages = parse_page_range(range_str, total);
            let all_pages: Vec<u32> = (1..=total).collect();
            let to_delete: Vec<u32> = all_pages
                .into_iter()
                .filter(|p| !keep_pages.contains(p))
                .collect();
            if !to_delete.is_empty() {
                target_doc.delete_pages(&to_delete);
            }
        }
    }

    // Append subsequent documents
    for file_path in &files[1..] {
        let mut src_doc = Document::load(file_path)
            .map_err(|e| format!("Lỗi mở file '{}': {}", file_path, e))?;

        if let Some(ranges_map) = page_ranges {
            if let Some(range_str) = ranges_map.get(file_path) {
                let total = src_doc.get_pages().len() as u32;
                let keep_pages = parse_page_range(range_str, total);
                let all_pages: Vec<u32> = (1..=total).collect();
                let to_delete: Vec<u32> = all_pages
                    .into_iter()
                    .filter(|p| !keep_pages.contains(p))
                    .collect();
                if !to_delete.is_empty() {
                    src_doc.delete_pages(&to_delete);
                }
            }
        }

        // Renumber objects in src_doc starting after target_doc.max_id
        let starting_id = target_doc.max_id + 1;
        src_doc.renumber_objects_with(starting_id);
        target_doc.max_id = src_doc.max_id;

        // Get Pages dictionary ID from target_doc
        let target_pages_id = target_doc
            .catalog()
            .and_then(|cat| cat.get(b"Pages"))
            .and_then(|obj| obj.as_reference())
            .map_err(|e| format!("Không tìm thấy Pages trong Catalog: {}", e))?;

        // Collect new page object IDs from src_doc
        let src_pages = src_doc.get_pages();
        let mut new_page_ids: Vec<ObjectId> = Vec::new();
        for (_page_num, &page_id) in &src_pages {
            new_page_ids.push(page_id);
        }

        // Insert renumbered objects into target_doc
        for (id, mut obj) in src_doc.objects {
            // If this object is one of the new pages, update its Parent to target_pages_id
            if new_page_ids.contains(&id) {
                if let Ok(page_dict) = obj.as_dict_mut() {
                    page_dict.set("Parent", Object::Reference(target_pages_id));
                }
            }
            target_doc.objects.insert(id, obj);
        }

        // Update target Pages dict Kids and Count
        let target_pages_dict = target_doc
            .get_object_mut(target_pages_id)
            .and_then(|obj| obj.as_dict_mut())
            .map_err(|e| format!("Không thể sửa Pages object: {}", e))?;

        let kids_mut = target_pages_dict
            .get_mut(b"Kids")
            .and_then(|k| k.as_array_mut())
            .map_err(|e| format!("Không thể đọc Kids array: {}", e))?;

        for page_id in new_page_ids {
            kids_mut.push(Object::Reference(page_id));
        }

        let new_count = kids_mut.len() as i64;
        target_pages_dict.set("Count", Object::Integer(new_count));
    }

    // Save output
    if let Some(parent) = Path::new(output_path).parent() {
        let _ = std::fs::create_dir_all(parent);
    }
    target_doc
        .save(output_path)
        .map_err(|e| format!("Không thể lưu file gộp: {}", e))?;

    Ok(output_path.to_string())
}
