mod commands;
pub mod db;
pub mod engine;
pub mod pdf;

use commands::*;
use db::{get_default_db_path, DbState};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db_path = get_default_db_path();
    let db_state = DbState::init(&db_path).expect("Failed to initialize database");

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .manage(db_state)
        .invoke_handler(tauri::generate_handler![
            cmd_get_pdf_info,
            cmd_merge_pdfs,
            cmd_split_pdf,
            cmd_organize_pdf,
            cmd_compress_pdf,
            cmd_watermark_pdf,
            cmd_images_to_pdf,
            cmd_pdf_to_text,
            cmd_text_to_pdf,
            cmd_edit_metadata,
            cmd_get_engine_status,
            cmd_convert_office_to_pdf,
            cmd_convert_pdf_to_office,
            cmd_run_ocr,
            cmd_open_in_explorer,
            cmd_get_tasks,
            cmd_save_task,
            cmd_clear_tasks,
            cmd_get_settings,
            cmd_save_settings,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
