use image::GenericImageView;
use lopdf::{Document, Object, Stream};
use std::fs;
use std::path::Path;

pub struct PageDimension {
    pub width: f32,
    pub height: f32,
}

pub fn get_page_dimensions(page_size: &str, orientation: &str) -> PageDimension {
    let (mut w, mut h) = match page_size {
        "A3" => (841.89f32, 1190.55f32),
        "Letter" => (612.0f32, 792.0f32),
        _ => (595.28f32, 841.89f32), // Default A4
    };

    if orientation == "landscape" && w < h {
        std::mem::swap(&mut w, &mut h);
    } else if orientation == "portrait" && w > h {
        std::mem::swap(&mut w, &mut h);
    }

    PageDimension {
        width: w,
        height: h,
    }
}

pub fn images_to_pdf(
    image_paths: &[String],
    page_size: &str,
    orientation: &str,
    margin_mm: f32,
    center_image: bool,
    output_path: &str,
) -> Result<String, String> {
    if image_paths.is_empty() {
        return Err("Không có ảnh nào được chọn".into());
    }

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

    let margin_pt = margin_mm * 2.83465; // mm to points

    for img_path_str in image_paths {
        let img_path = Path::new(img_path_str);
        if !img_path.exists() {
            return Err(format!("Ảnh không tồn tại: {}", img_path_str));
        }

        let img = image::open(img_path)
            .map_err(|e| format!("Không thể đọc ảnh '{}': {}", img_path_str, e))?;
        let (img_w, img_h) = img.dimensions();

        let rgb_img = img.to_rgb8();
        let raw_bytes = rgb_img.into_raw();

        let page_dim = if page_size == "Fit" {
            PageDimension {
                width: img_w as f32,
                height: img_h as f32,
            }
        } else {
            let mut dim = get_page_dimensions(page_size, orientation);
            if orientation == "auto" {
                if (img_w > img_h && dim.width < dim.height)
                    || (img_w < img_h && dim.width > dim.height)
                {
                    std::mem::swap(&mut dim.width, &mut dim.height);
                }
            }
            dim
        };

        // Calculate fitted image dimensions respecting margins
        let avail_w = (page_dim.width - 2.0 * margin_pt).max(10.0);
        let avail_h = (page_dim.height - 2.0 * margin_pt).max(10.0);

        let scale_w = avail_w / (img_w as f32);
        let scale_h = avail_h / (img_h as f32);
        let scale = scale_w.min(scale_h);

        let draw_w = (img_w as f32) * scale;
        let draw_h = (img_h as f32) * scale;

        let (draw_x, draw_y) = if center_image {
            (
                margin_pt + (avail_w - draw_w) / 2.0,
                margin_pt + (avail_h - draw_h) / 2.0,
            )
        } else {
            (margin_pt, page_dim.height - margin_pt - draw_h)
        };

        // Create image XObject
        doc.max_id += 1;
        let image_id = (doc.max_id, 0);

        let mut image_dict = lopdf::Dictionary::new();
        image_dict.set("Type", Object::Name(b"XObject".to_vec()));
        image_dict.set("Subtype", Object::Name(b"Image".to_vec()));
        image_dict.set("Width", Object::Integer(img_w as i64));
        image_dict.set("Height", Object::Integer(img_h as i64));
        image_dict.set("ColorSpace", Object::Name(b"DeviceRGB".to_vec()));
        image_dict.set("BitsPerComponent", Object::Integer(8));

        let image_stream = Stream::new(image_dict, raw_bytes).with_compression(true);
        doc.objects.insert(image_id, Object::Stream(image_stream));

        // Create content stream to draw the image
        let content_str = format!(
            "q\n{:.2} 0 0 {:.2} {:.2} {:.2} cm\n/Im0 Do\nQ\n",
            draw_w, draw_h, draw_x, draw_y
        );

        doc.max_id += 1;
        let content_id = (doc.max_id, 0);
        let content_stream = Stream::new(lopdf::Dictionary::new(), content_str.into_bytes());
        doc.objects.insert(content_id, Object::Stream(content_stream));

        // Create Page object
        doc.max_id += 1;
        let page_obj_id = (doc.max_id, 0);

        let mut page_dict = lopdf::Dictionary::new();
        page_dict.set("Type", Object::Name(b"Page".to_vec()));
        page_dict.set("Parent", Object::Reference(pages_id));
        page_dict.set(
            "MediaBox",
            Object::Array(vec![
                Object::Real(0.0),
                Object::Real(0.0),
                Object::Real(page_dim.width),
                Object::Real(page_dim.height),
            ]),
        );
        page_dict.set("Contents", Object::Reference(content_id));

        // Page resources with XObject map
        let mut xobj_map = lopdf::Dictionary::new();
        xobj_map.set("Im0", Object::Reference(image_id));
        let mut res_dict = lopdf::Dictionary::new();
        res_dict.set("XObject", Object::Dictionary(xobj_map));
        page_dict.set("Resources", Object::Dictionary(res_dict));

        doc.objects.insert(page_obj_id, Object::Dictionary(page_dict));

        // Append to Catalog Pages Kids
        if let Some(pages_obj) = doc.objects.get_mut(&pages_id) {
            if let Ok(p_dict) = pages_obj.as_dict_mut() {
                if let Ok(kids) = p_dict.get_mut(b"Kids").and_then(|k| k.as_array_mut()) {
                    kids.push(Object::Reference(page_obj_id));
                    let count = kids.len() as i64;
                    p_dict.set("Count", Object::Integer(count));
                }
            }
        }
    }

    if let Some(parent) = Path::new(output_path).parent() {
        let _ = fs::create_dir_all(parent);
    }

    doc.save(output_path).map_err(|e| format!("Lỗi lưu file PDF: {}", e))?;
    Ok(output_path.to_string())
}
