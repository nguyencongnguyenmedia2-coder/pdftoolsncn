use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::Mutex;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaskRecord {
    pub id: String,
    #[serde(rename = "toolId")]
    pub tool_id: String,
    #[serde(rename = "toolName")]
    pub tool_name: String,
    #[serde(rename = "inputFiles")]
    pub input_files: Vec<String>,
    #[serde(rename = "outputFiles")]
    pub output_files: Vec<String>,
    pub status: String,
    pub progress: u32,
    #[serde(rename = "startedAt")]
    pub started_at: String,
    #[serde(rename = "finishedAt")]
    pub finished_at: Option<String>,
    #[serde(rename = "errorMessage")]
    pub error_message: Option<String>,
    #[serde(rename = "inputSize")]
    pub input_size: u64,
    #[serde(rename = "outputSize")]
    pub output_size: u64,
}

pub struct DbState {
    pub conn: Mutex<Connection>,
}

impl DbState {
    pub fn init(db_path: &Path) -> Result<Self, rusqlite::Error> {
        if let Some(parent) = db_path.parent() {
            let _ = fs::create_dir_all(parent);
        }
        let conn = Connection::open(db_path)?;

        // Initialize schema
        conn.execute(
            "CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                tool_id TEXT NOT NULL,
                tool_name TEXT NOT NULL,
                input_files TEXT NOT NULL,
                output_files TEXT NOT NULL,
                status TEXT NOT NULL,
                progress INTEGER NOT NULL,
                started_at TEXT NOT NULL,
                finished_at TEXT,
                error_message TEXT,
                input_size INTEGER NOT NULL,
                output_size INTEGER NOT NULL
            );",
            [],
        )?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );",
            [],
        )?;

        Ok(DbState {
            conn: Mutex::new(conn),
        })
    }

    pub fn insert_task(&self, task: &TaskRecord) -> Result<(), rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        let input_json = serde_json::to_string(&task.input_files).unwrap_or_else(|_| "[]".into());
        let output_json = serde_json::to_string(&task.output_files).unwrap_or_else(|_| "[]".into());

        conn.execute(
            "INSERT OR REPLACE INTO tasks (id, tool_id, tool_name, input_files, output_files, status, progress, started_at, finished_at, error_message, input_size, output_size)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)",
            params![
                task.id,
                task.tool_id,
                task.tool_name,
                input_json,
                output_json,
                task.status,
                task.progress,
                task.started_at,
                task.finished_at,
                task.error_message,
                task.input_size as i64,
                task.output_size as i64,
            ],
        )?;
        Ok(())
    }

    pub fn get_tasks(&self, limit: u32) -> Result<Vec<TaskRecord>, rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, tool_id, tool_name, input_files, output_files, status, progress, started_at, finished_at, error_message, input_size, output_size
             FROM tasks ORDER BY started_at DESC LIMIT ?1",
        )?;

        let rows = stmt.query_map([limit], |row| {
            let input_json: String = row.get(3)?;
            let output_json: String = row.get(4)?;
            let input_files: Vec<String> = serde_json::from_str(&input_json).unwrap_or_default();
            let output_files: Vec<String> = serde_json::from_str(&output_json).unwrap_or_default();
            let input_size: i64 = row.get(10)?;
            let output_size: i64 = row.get(11)?;

            Ok(TaskRecord {
                id: row.get(0)?,
                tool_id: row.get(1)?,
                tool_name: row.get(2)?,
                input_files,
                output_files,
                status: row.get(5)?,
                progress: row.get::<_, u32>(6)?,
                started_at: row.get(7)?,
                finished_at: row.get(8)?,
                error_message: row.get(9)?,
                input_size: input_size as u64,
                output_size: output_size as u64,
            })
        })?;

        let mut tasks = Vec::new();
        for r in rows {
            if let Ok(t) = r {
                tasks.push(t);
            }
        }
        Ok(tasks)
    }

    pub fn clear_tasks(&self) -> Result<(), rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        conn.execute("DELETE FROM tasks", [])?;
        Ok(())
    }

    pub fn get_setting(&self, key: &str) -> Option<String> {
        let conn = self.conn.lock().ok()?;
        let mut stmt = conn.prepare("SELECT value FROM settings WHERE key = ?1").ok()?;
        let mut rows = stmt.query([key]).ok()?;
        if let Some(row) = rows.next().ok()? {
            row.get::<_, String>(0).ok()
        } else {
            None
        }
    }

    pub fn set_setting(&self, key: &str, value: &str) -> Result<(), rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT OR REPLACE INTO settings (key, value) VALUES (?1, ?2)",
            params![key, value],
        )?;
        Ok(())
    }
}

pub fn get_default_db_path() -> PathBuf {
    if let Some(local_app_data) = std::env::var_os("LOCALAPPDATA") {
        PathBuf::from(local_app_data).join("PDFToolsNCN").join("data.db")
    } else {
        PathBuf::from("pdftools_ncn.db")
    }
}
