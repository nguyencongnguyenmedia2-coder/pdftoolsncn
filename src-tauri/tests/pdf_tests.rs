use lopdf::{Document, Object, Stream};
use pdf_tools_ncn_lib::pdf::compress::compress_pdf;
use pdf_tools_ncn_lib::pdf::images::images_to_pdf;
use pdf_tools_ncn_lib::pdf::info::read_pdf_info;
use pdf_tools_ncn_lib::pdf::merge::merge_documents;
use pdf_tools_ncn_lib::pdf::metadata::edit_metadata;
use pdf_tools_ncn_lib::pdf::organize::{organize_pdf, PageEditInstruction};
use pdf_tools_ncn_lib::pdf::split::{split_pdf_all, split_pdf_ranges};
use pdf_tools_ncn_lib::pdf::text::{pdf_to_text, text_to_pdf};
use pdf_tools_ncn_lib::pdf::watermark::add_watermark_and_numbering;
use std::fs;
use std::path::Path;

fn create_sample_pdf(path: &str, pages_count: usize, title: &str) {
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

    // Info dict
    doc.max_id += 1;
    let info_id = (doc.max_id, 0);
    let mut info_dict = lopdf::Dictionary::new();
    info_dict.set("Title", Object::string_literal(title));
    info_dict.set("Author", Object::string_literal("NCN Unit Tester"));
    doc.objects.insert(info_id, Object::Dictionary(info_dict));
    doc.trailer.set("Info", Object::Reference(info_id));

    for i in 1..=pages_count {
        doc.max_id += 1;
        let content_id = (doc.max_id, 0);
        let stream_text = format!("BT /F1 12 Tf 50 750 Td (Trang thu {} cua {}) Tj ET", i, title);
        let stream = Stream::new(lopdf::Dictionary::new(), stream_text.into_bytes());
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

    if let Some(parent) = Path::new(path).parent() {
        let _ = fs::create_dir_all(parent);
    }
    doc.save(path).unwrap();
}

#[test]
fn test_pdf_info_and_merge() {
    let test_dir = "target/test_output";
    let _ = fs::create_dir_all(test_dir);

    let doc1_path = format!("{}/doc1.pdf", test_dir);
    let doc2_path = format!("{}/doc2.pdf", test_dir);
    let merged_path = format!("{}/merged.pdf", test_dir);

    create_sample_pdf(&doc1_path, 2, "Tai lieu 1");
    create_sample_pdf(&doc2_path, 3, "Tai lieu 2");

    // Test info
    let info1 = read_pdf_info(&doc1_path).expect("Read info doc1");
    assert_eq!(info1.page_count, 2);
    assert_eq!(info1.title.as_deref(), Some("Tai lieu 1"));

    // Test merge
    let files = vec![doc1_path.clone(), doc2_path.clone()];
    let res = merge_documents(&files, None, &merged_path);
    assert!(res.is_ok(), "Merge failed: {:?}", res);

    let info_merged = read_pdf_info(&merged_path).expect("Read info merged");
    assert_eq!(info_merged.page_count, 5);
}

#[test]
fn test_pdf_split() {
    let test_dir = "target/test_output/split";
    let _ = fs::create_dir_all(test_dir);

    let src_path = format!("{}/sample_5pages.pdf", test_dir);
    create_sample_pdf(&src_path, 5, "Tai lieu 5 trang");

    // Split all
    let all_dir = format!("{}/all", test_dir);
    let split_all_files = split_pdf_all(&src_path, &all_dir).expect("Split all pages");
    assert_eq!(split_all_files.len(), 5);

    // Split ranges (1-2, 3-5)
    let range_dir = format!("{}/range", test_dir);
    let split_range_files = split_pdf_ranges(&src_path, "1-2, 3-5", &range_dir).expect("Split ranges");
    assert_eq!(split_range_files.len(), 2);
}

#[test]
fn test_pdf_organize_and_rotate() {
    let test_dir = "target/test_output";
    let src_path = format!("{}/orig_organize.pdf", test_dir);
    let out_path = format!("{}/organized.pdf", test_dir);
    create_sample_pdf(&src_path, 3, "Organize Test");

    // Keep page 2 rotated 90, insert blank, keep page 1
    let instructions = vec![
        PageEditInstruction {
            original_page: Some(2),
            rotation: 90,
            deleted: false,
            blank: Some(false),
        },
        PageEditInstruction {
            original_page: None,
            rotation: 0,
            deleted: false,
            blank: Some(true),
        },
        PageEditInstruction {
            original_page: Some(1),
            rotation: 0,
            deleted: false,
            blank: Some(false),
        },
    ];

    let res = organize_pdf(&src_path, &instructions, &out_path);
    assert!(res.is_ok());

    let info = read_pdf_info(&out_path).expect("Read organized info");
    assert_eq!(info.page_count, 3);
}

#[test]
fn test_compress_and_watermark() {
    let test_dir = "target/test_output";
    let src_path = format!("{}/watermark_src.pdf", test_dir);
    let wm_path = format!("{}/watermarked.pdf", test_dir);
    let comp_path = format!("{}/compressed.pdf", test_dir);

    create_sample_pdf(&src_path, 2, "Watermark Test");

    // Watermark & page numbers
    let wm_res = add_watermark_and_numbering(
        &src_path,
        Some("PDF TOOLS NCN - BAN QUYEN"),
        0.3,
        45,
        28.0,
        true,
        Some("Trang {n} / {total}"),
        &wm_path,
    );
    assert!(wm_res.is_ok());
    assert!(Path::new(&wm_path).exists());

    // Compress
    let comp_res = compress_pdf(&wm_path, "medium", true, &comp_path);
    assert!(comp_res.is_ok());
    assert!(Path::new(&comp_path).exists());
}

