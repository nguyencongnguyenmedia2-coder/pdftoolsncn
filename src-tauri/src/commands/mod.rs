use crate::db::{DbState, TaskRecord};
use crate::engine::{self, EngineStatus};
use crate::pdf::compress::{compress_pdf as run_compress, CompressResult};
use crate::pdf::images::images_to_pdf as run_images_to_pdf;
use crate::pdf::info::{read_pdf_info, PdfInfo};
use crate::pdf::merge::merge_documents;
use crate::pdf::metadata::edit_metadata;
use crate::pdf::organize::{organize_pdf as run_organize, PageEditInstruction};
use crate::pdf::split::{split_pdf_all, split_pdf_fixed_count, split_pdf_ranges};
use crate::pdf::text::{pdf_to_text as run_pdf_to_text, text_to_pdf as run_text_to_pdf};
use crate::pdf::watermark::add_watermark_and_numbering;
use serde_json::Value;
use std::collections::HashMap;
use std::path::Path;
use std::process::Command;
use tauri::State;

#[tauri::command]
pub fn cmd_get_pdf_info(path: String) -> Result<PdfInfo, String> {
    read_pdf_info(&path)
}

#[tauri::command]
pub fn cmd_merge_pdfs(
    files: Vec<String>,
    page_ranges: Option<HashMap<String, String>>,
    output_path: String,
) -> Result<String, String> {
    merge_documents(&files, page_ranges.as_ref(), &output_path)
}

#[tauri::command]
pub fn cmd_split_pdf(
    file: String,
    mode: String,
    ranges: Option<String>,
    pages_per_file: Option<u32>,
    output_dir: String,
) -> Result<Vec<String>, String> {
    match mode.as_str() {
        "ranges" => {
            let r = ranges.unwrap_or_else(|| "1".into());
            split_pdf_ranges(&file, &r, &output_dir)
        }
        "fixed_count" => {
            let count = pages_per_file.unwrap_or(1);
            split_pdf_fixed_count(&file, count, &output_dir)
        }
        _ => split_pdf_all(&file, &output_dir),
    }
}

#[tauri::command]
pub fn cmd_organize_pdf(
    file: String,
    instructions: Vec<PageEditInstruction>,
    output_path: String,
) -> Result<String, String> {
    run_organize(&file, &instructions, &output_path)
}

#[tauri::command]
pub fn cmd_compress_pdf(
    file: String,
    level: String,
    strip_metadata: bool,
    output_path: String,
) -> Result<CompressResult, String> {
    run_compress(&file, &level, strip_metadata, &output_path)
}

#[tauri::command]
pub fn cmd_watermark_pdf(
    file: String,
    watermark_text: Option<String>,
    opacity: f32,
    rotation: i32,
    size: f32,
    page_numbers: bool,
    page_number_format: Option<String>,
    output_path: String,
) -> Result<String, String> {
    add_watermark_and_numbering(
        &file,
        watermark_text.as_deref(),
        opacity,
        rotation,
        size,
        page_numbers,
        page_number_format.as_deref(),
        &output_path,
    )
}

#[tauri::command]
pub fn cmd_images_to_pdf(
    images: Vec<String>,
    page_size: String,
    orientation: String,
    margin_mm: f32,
    center_image: bool,
    output_path: String,
) -> Result<String, String> {
    run_images_to_pdf(
        &images,
        &page_size,
        &orientation,
        margin_mm,
        center_image,
        &output_path,
    )
}

#[tauri::command]
pub fn cmd_pdf_to_text(file: String, output_path: String) -> Result<String, String> {
    run_pdf_to_text(&file, &output_path)
}

#[tauri::command]
pub fn cmd_text_to_pdf(text_file: String, output_path: String) -> Result<String, String> {
    run_text_to_pdf(&text_file, &output_path)
}

#[tauri::command]
pub fn cmd_edit_metadata(
    file: String,
    title: Option<String>,
    author: Option<String>,
    creator: Option<String>,
    strip_all: bool,
    output_path: String,
) -> Result<String, String> {
    edit_metadata(
        &file,
        title.as_deref(),
        author.as_deref(),
        creator.as_deref(),
        strip_all,
        &output_path,
    )
}

#[tauri::command]
pub fn cmd_get_engine_status(
    lo_custom: Option<String>,
    tess_custom: Option<String>,
) -> Result<EngineStatus, String> {
    Ok(engine::get_engine_status(
        lo_custom.as_deref(),
        tess_custom.as_deref(),
    ))
}

#[tauri::command]
pub fn cmd_convert_office_to_pdf(
    file: String,
    output_dir: String,
    lo_custom: Option<String>,
) -> Result<String, String> {
    engine::convert_office_to_pdf(&file, &output_dir, lo_custom.as_deref())
}

#[tauri::command]
pub fn cmd_convert_pdf_to_office(
    file: String,
    format: String,
    output_dir: String,
    lo_custom: Option<String>,
) -> Result<String, String> {
    engine::convert_pdf_to_office(&file, &format, &output_dir, lo_custom.as_deref())
}

#[tauri::command]
pub fn cmd_run_ocr(
    file: String,
    language: String,
    format: String,
    output_base: String,
    tess_custom: Option<String>,
) -> Result<String, String> {
    engine::run_ocr(
        &file,
        &language,
        &format,
        &output_base,
        tess_custom.as_deref(),
    )
}

#[tauri::command]
pub fn cmd_open_in_explorer(path: String) -> Result<(), String> {
    let p = Path::new(&path);
    if !p.exists() {
        return Err(format!("Đường dẫn không tồn tại: {}", path));
    }

    #[cfg(target_os = "windows")]
    {
        if p.is_dir() {
            Command::new("explorer").arg(&path).spawn().map_err(|e| e.to_string())?;
        } else {
            Command::new("explorer")
                .arg("/select,")
                .arg(&path)
                .spawn()
                .map_err(|e| e.to_string())?;
        }
    }
    #[cfg(not(target_os = "windows"))]
    {
        Command::new("open").arg(&path).spawn().map_err(|e| e.to_string())?;
    }

    Ok(())
}

#[tauri::command]
pub fn cmd_get_tasks(state: State<'_, DbState>, limit: Option<u32>) -> Result<Vec<TaskRecord>, String> {
    state.get_tasks(limit.unwrap_or(50)).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn cmd_save_task(state: State<'_, DbState>, task: TaskRecord) -> Result<(), String> {
    state.insert_task(&task).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn cmd_clear_tasks(state: State<'_, DbState>) -> Result<(), String> {
    state.clear_tasks().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn cmd_get_settings(state: State<'_, DbState>) -> Result<Option<Value>, String> {
    if let Some(json_str) = state.get_setting("app_settings") {
        let val: Value = serde_json::from_str(&json_str).map_err(|e| e.to_string())?;
        Ok(Some(val))
    } else {
        Ok(None)
    }
}

#[tauri::command]
pub fn cmd_save_settings(state: State<'_, DbState>, settings: Value) -> Result<(), String> {
    let json_str = serde_json::to_string(&settings).map_err(|e| e.to_string())?;
    state.set_setting("app_settings", &json_str).map_err(|e| e.to_string())
}

