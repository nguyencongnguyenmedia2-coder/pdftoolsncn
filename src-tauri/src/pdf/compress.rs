use image::codecs::jpeg::JpegEncoder;
use image::imageops::FilterType;
use image::{ColorType, DynamicImage, GenericImageView, ImageFormat};
use lopdf::{Document, Object};
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

    // Determine image compression parameters based on level
    let (jpeg_quality, max_dimension): (u8, u32) = match level {
        "low" => (80, 2200),
        "high" => (42, 1200),
        _ => (62, 1600), // "medium" default balanced
    };

    // Optimize embedded JPEG images (/Subtype /Image with /Filter /DCTDecode)
    let object_ids: Vec<lopdf::ObjectId> = doc.objects.keys().cloned().collect();
    for obj_id in object_ids {
        if let Some(Object::Stream(ref mut stream)) = doc.objects.get_mut(&obj_id) {
            let is_image = stream
                .dict
                .get(b"Subtype")
                .and_then(|o| o.as_name())
                .map(|n| n == b"Image")
                .unwrap_or(false);

            if !is_image {
                continue;
            }

            // Skip images with soft masks (SMask) or Mask to preserve transparency accurately
            if stream.dict.has(b"SMask") || stream.dict.has(b"Mask") {
                continue;
            }

            let is_dct = match stream.dict.get(b"Filter") {
                Ok(Object::Name(name)) => name == b"DCTDecode",
                _ => false,
            };

            // Only re-compress RGB or Grayscale JPEG streams larger than 15 KB
            if is_dct && stream.content.len() > 15_360 {
                let cs_ok = match stream.dict.get(b"ColorSpace") {
                    Ok(Object::Name(cs)) => cs == b"DeviceRGB" || cs == b"DeviceGray",
                    _ => false,
                };

                if cs_ok {
                    if let Ok(img) =
                        image::load_from_memory_with_format(&stream.content, ImageFormat::Jpeg)
                    {
                        let (w, h) = img.dimensions();
                        let resized: DynamicImage = if w > max_dimension || h > max_dimension {
                            img.resize(max_dimension, max_dimension, FilterType::Lanczos3)
                        } else {
                            img
                        };

                        let (new_w, new_h) = resized.dimensions();
                        let mut encoded_buf: Vec<u8> = Vec::with_capacity(stream.content.len() / 2);
                        let mut encoder =
                            JpegEncoder::new_with_quality(&mut encoded_buf, jpeg_quality);

                        let encode_res = match resized {
                            DynamicImage::ImageLuma8(ref gray) => encoder.encode(
                                gray.as_raw(),
                                new_w,
                                new_h,
                                ColorType::L8.into(),
                            ),
                            _ => {
                                let rgb = resized.to_rgb8();
                                encoder.encode(
                                    rgb.as_raw(),
                                    new_w,
                                    new_h,
                                    ColorType::Rgb8.into(),
                                )
                            }
                        };

                        if encode_res.is_ok() && encoded_buf.len() + 512 < stream.content.len() {
                            stream.set_content(encoded_buf);
                            stream.dict.set("Width", Object::Integer(new_w as i64));
                            stream.dict.set("Height", Object::Integer(new_h as i64));
                        }
                    }
                }
            }
        }
    }

    // Prune unused objects and compress all non-JPEG streams using FlateDecode
    doc.prune_objects();
    doc.compress();

    // Strip metadata if requested or in high compression mode
    if strip_metadata || level == "high" {
        doc.trailer.remove(b"Info");

        if let Ok(cat_id) = doc
            .catalog()
            .and_then(|cat| cat.get(b"Metadata"))
            .and_then(|m| m.as_reference())
        {
            doc.objects.remove(&cat_id);
            if let Ok(catalog) = doc.catalog_mut() {
                catalog.remove(b"Metadata");
            }
        }
    }

    if let Some(parent) = Path::new(output_path).parent() {
        let _ = fs::create_dir_all(parent);
    }

    doc.save(output_path)
        .map_err(|e| format!("Lỗi lưu file nén: {}", e))?;

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
