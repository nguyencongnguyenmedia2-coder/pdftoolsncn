use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use std::process::Command;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EngineStatus {
    #[serde(rename = "libreOfficeAvailable")]
    pub libreoffice_available: bool,
    #[serde(rename = "libreOfficePath")]
    pub libreoffice_path: Option<String>,
    #[serde(rename = "libreOfficeVersion")]
    pub libreoffice_version: Option<String>,

    #[serde(rename = "tesseractAvailable")]
    pub tesseract_available: bool,
    #[serde(rename = "tesseractPath")]
    pub tesseract_path: Option<String>,
    #[serde(rename = "tesseractVersion")]
    pub tesseract_version: Option<String>,
    #[serde(rename = "vietnameseOcrReady")]
    pub vietnamese_ocr_ready: bool,
}

pub fn detect_libreoffice(custom_path: Option<&str>) -> (bool, Option<String>, Option<String>) {
    let mut candidate_paths: Vec<PathBuf> = Vec::new();

    if let Some(cp) = custom_path {
        if !cp.trim().is_empty() {
            candidate_paths.push(PathBuf::from(cp));
        }
    }

    // Common Windows install paths
    candidate_paths.push(PathBuf::from(r"C:\Program Files\LibreOffice\program\soffice.exe"));
    candidate_paths.push(PathBuf::from(r"C:\Program Files (x86)\LibreOffice\program\soffice.exe"));

    // Check PATH
    if let Ok(path_env) = std::env::var("PATH") {
        for dir in std::env::split_paths(&path_env) {
            let p = dir.join("soffice.exe");
            if p.exists() {
                candidate_paths.push(p);
            }
        }
    }

    for p in candidate_paths {
        if p.exists() {
            let output = Command::new(&p).arg("--version").output();
            if let Ok(out) = output {
                if out.status.success() {
                    let ver = String::from_utf8_lossy(&out.stdout).trim().to_string();
                    return (true, Some(p.to_string_lossy().to_string()), Some(ver));
                }
            }
        }
    }

    (false, None, None)
}

pub fn detect_tesseract(custom_path: Option<&str>) -> (bool, Option<String>, Option<String>, bool) {
    let mut candidate_paths: Vec<PathBuf> = Vec::new();

    if let Some(cp) = custom_path {
        if !cp.trim().is_empty() {
            candidate_paths.push(PathBuf::from(cp));
        }
    }

    // Common Windows install paths
    candidate_paths.push(PathBuf::from(r"C:\Program Files\Tesseract-OCR\tesseract.exe"));
    candidate_paths.push(PathBuf::from(r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe"));

    // Check PATH
    if let Ok(path_env) = std::env::var("PATH") {
        for dir in std::env::split_paths(&path_env) {
            let p = dir.join("tesseract.exe");
            if p.exists() {
                candidate_paths.push(p);
            }
        }
    }

    for p in candidate_paths {
        if p.exists() {
            let output = Command::new(&p).arg("--version").output();
            if let Ok(out) = output {
                if out.status.success() {
                    let ver = String::from_utf8_lossy(&out.stdout)
                        .lines()
                        .next()
                        .unwrap_or("")
                        .trim()
                        .to_string();

                    // Check if vietnamese traineddata exists
                    let mut vie_ready = false;
                    let list_langs = Command::new(&p).arg("--list-langs").output();
                    if let Ok(l_out) = list_langs {
                        let text = String::from_utf8_lossy(&l_out.stdout);
                        if text.contains("vie") {
                            vie_ready = true;
                        }
                    }

                    return (
                        true,
                        Some(p.to_string_lossy().to_string()),
                        Some(ver),
                        vie_ready,
                    );
                }
            }
        }
    }

    (false, None, None, false)
}

pub fn get_engine_status(
    lo_custom: Option<&str>,
    tess_custom: Option<&str>,
) -> EngineStatus {
    let (lo_avail, lo_path, lo_ver) = detect_libreoffice(lo_custom);
    let (tess_avail, tess_path, tess_ver, vie_ready) = detect_tesseract(tess_custom);

    EngineStatus {
        libreoffice_available: lo_avail,
        libreoffice_path: lo_path,
        libreoffice_version: lo_ver,
        tesseract_available: tess_avail,
        tesseract_path: tess_path,
        tesseract_version: tess_ver,
        vietnamese_ocr_ready: vie_ready,
    }
}

pub fn convert_office_to_pdf(
    input_file: &str,
    output_dir: &str,
    soffice_path: Option<&str>,
) -> Result<String, String> {
    let (available, resolved_path, _) = detect_libreoffice(soffice_path);
    if !available || resolved_path.is_none() {
        return Err(
            "Chưa phát hiện LibreOffice trên máy tính để thực hiện chuyển đổi Office sang PDF.\n\n\
            Vui lòng cài đặt LibreOffice (miễn phí, mã nguồn mở) từ https://www.libreoffice.org/download/download/ \n\
            hoặc chỉ định đường dẫn 'soffice.exe' trong phần Cài Đặt của PDF Tools NCN."
                .to_string(),
        );
    }

    let exe = resolved_path.unwrap();
    let status = Command::new(exe)
        .arg("--headless")
        .arg("--convert-to")
        .arg("pdf")
        .arg("--outdir")
        .arg(output_dir)
        .arg(input_file)
        .status()
        .map_err(|e| format!("Lỗi thực thi LibreOffice: {}", e))?;

    if !status.success() {
        return Err("Tiến trình chuyển đổi LibreOffice kết thúc với mã lỗi.".into());
    }

    let input_path = Path::new(input_file);
    let stem = input_path.file_stem().unwrap().to_string_lossy();
    let expected_output = Path::new(output_dir).join(format!("{}.pdf", stem));

    if expected_output.exists() {
        Ok(expected_output.to_string_lossy().to_string())
    } else {
        Err("Không tìm thấy file PDF đầu ra sau khi LibreOffice hoàn thành".into())
    }
}

pub fn convert_pdf_to_office(
    input_file: &str,
    target_format: &str, // "docx", "xlsx", "pptx"
    output_dir: &str,
    soffice_path: Option<&str>,
) -> Result<String, String> {
    let (available, resolved_path, _) = detect_libreoffice(soffice_path);
    if !available || resolved_path.is_none() {
        return Err(
            format!(
                "Chưa phát hiện LibreOffice trên máy tính để thực hiện chuyển đổi PDF sang {}.\n\n\
                Vui lòng cài đặt LibreOffice (miễn phí, mã nguồn mở) từ https://www.libreoffice.org/download/download/ \n\
                hoặc cấu hình đường dẫn soffice.exe trong Cài Đặt.",
                target_format.to_uppercase()
            )
        );
    }

    let exe = resolved_path.unwrap();
    let filter = match target_format {
        "docx" => "docx:MS Word 2007 XML",
        "xlsx" => "xlsx:Calc MS Excel 2007 XML",
        "pptx" => "pptx:Impress MS PowerPoint 2007 XML",
        _ => "docx",
    };

    let status = Command::new(exe)
        .arg("--headless")
        .arg("--infilter=writer_pdf_import")
        .arg("--convert-to")
        .arg(filter)
        .arg("--outdir")
        .arg(output_dir)
        .arg(input_file)
        .status()
        .map_err(|e| format!("Lỗi thực thi LibreOffice: {}", e))?;

    if !status.success() {
        return Err("Tiến trình chuyển đổi tài liệu kết thúc với lỗi.".into());
    }

    let input_path = Path::new(input_file);
    let stem = input_path.file_stem().unwrap().to_string_lossy();
    let expected_output = Path::new(output_dir).join(format!("{}.{}", stem, target_format));

    if expected_output.exists() {
        Ok(expected_output.to_string_lossy().to_string())
    } else {
        Err(format!("Không tìm thấy file .{} đầu ra sau khi chuyển đổi", target_format))
    }
}

pub fn run_ocr(
    input_file: &str,
    language: &str, // "vie", "eng", "vie+eng"
    output_format: &str, // "searchable_pdf" or "txt"
    output_base: &str,
    tess_path: Option<&str>,
) -> Result<String, String> {
    let (available, resolved_path, _, vie_ready) = detect_tesseract(tess_path);
    if !available || resolved_path.is_none() {
        return Err(
            "Chưa phát hiện công cụ OCR Tesseract trên máy tính.\n\n\
            Để sử dụng tính năng nhận dạng ký tự (OCR) offline, vui lòng tải và cài đặt Tesseract Windows từ:\n\
            https://github.com/UB-Mannheim/tesseract/wiki \n\
            (Lưu ý tích chọn 'Additional language data (download)' -> 'Vietnamese' khi cài đặt)."
                .to_string(),
        );
    }

    if language.contains("vie") && !vie_ready {
        return Err(
            "Engine Tesseract đã cài đặt nhưng chưa có bộ dữ liệu ngôn ngữ Tiếng Việt ('vie.traineddata').\n\n\
            Vui lòng tải 'vie.traineddata' từ https://github.com/tesseract-ocr/tessdata_fast và sao chép vào thư mục tessdata của Tesseract."
                .to_string(),
        );
    }

    let exe = resolved_path.unwrap();
    let mut cmd = Command::new(exe);
    cmd.arg(input_file).arg(output_base).arg("-l").arg(language);

    if output_format == "searchable_pdf" {
        cmd.arg("pdf");
    }

    let status = cmd.status().map_err(|e| format!("Lỗi thực thi Tesseract: {}", e))?;
    if !status.success() {
        return Err("Quá trình nhận dạng OCR kết thúc với mã lỗi.".into());
    }

    let ext = if output_format == "searchable_pdf" { "pdf" } else { "txt" };
    let expected_path = format!("{}.{}", output_base, ext);

    if Path::new(&expected_path).exists() {
        Ok(expected_path)
    } else {
        Err("Không tìm thấy tệp kết quả OCR đầu ra".into())
    }
}
