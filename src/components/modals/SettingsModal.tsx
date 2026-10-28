import React from 'react';
import {
  X,
  Settings as SettingsIcon,
  FolderOpen,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Save,
} from 'lucide-react';
import { AppSettings, SystemEngineStatus } from '../../types';
import { selectOutputDirectory } from '../../services/tauriApi';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  engineStatus: SystemEngineStatus;
  onSave: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  setSettings,
  engineStatus,
  onSave,
}) => {
  if (!isOpen) return null;

  const handlePickDefaultDir = async () => {
    const dir = await selectOutputDirectory('Chọn thư mục lưu mặc định');
    if (dir) {
      setSettings({ ...settings, defaultOutputDir: dir });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#141126] border border-[#2D2656] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252044] bg-[#181430]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#251F47] flex items-center justify-center text-[#A78BFA]">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Cài đặt ứng dụng</h2>
              <p className="text-xs text-[#9692AF]">Tùy chỉnh thư mục, quy tắc ghi đè và động cơ chuyển đổi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9692AF] hover:text-white hover:bg-[#252044]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Default output folder */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-white">Thư mục đầu ra mặc định:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={settings.defaultOutputDir}
                className="flex-1 px-3 py-2 text-xs font-mono bg-[#191535] text-white rounded-xl border border-[#2D2656]"
              />
              <button
                type="button"
                onClick={handlePickDefaultDir}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[#7657F6] text-white hover:bg-[#8B6EF8] transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5" /> Chọn thư mục
              </button>
            </div>
          </div>

          {/* Duplicate Action */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-white">Hành vi khi tệp kết quả trùng tên:</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'rename', label: 'Tự đổi tên (_1)' },
                { id: 'ask', label: 'Hỏi xác nhận' },
                { id: 'overwrite', label: 'Ghi đè trực tiếp' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setSettings({ ...settings, duplicateAction: opt.id as any })
                  }
                  className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                    settings.duplicateAction === opt.id
                      ? 'bg-[#7657F6]/20 border-[#7657F6] text-white'
                      : 'bg-[#191535] border-[#2B2452] text-[#9692AF] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* External Engines Configuration */}
          <div className="space-y-4 pt-2 border-t border-[#231E44]">
            <h3 className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider">
              Trạng thái &amp; Động cơ bổ trợ
            </h3>

            {/* LibreOffice Status */}
            <div className="p-3.5 rounded-xl bg-[#17142A] border border-[#2A244E] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">LibreOffice (Office sang PDF &amp; ngược lại)</span>
                  {engineStatus.libreOfficeAvailable ? (
                    <span className="flex items-center gap-1 text-[11px] text-[#22C55E]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã sẵn sàng
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-[#F59E0B]">
                      <AlertTriangle className="w-3.5 h-3.5" /> Chưa cài đặt
                    </span>
                  )}
                </div>
                {!engineStatus.libreOfficeAvailable && (
                  <a
                    href="https://www.libreoffice.org/download/download/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] text-[#A78BFA] hover:underline"
                  >
                    Tải về <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="text"
                placeholder="Đường dẫn soffice.exe tùy chỉnh (nếu cài ở thư mục riêng)..."
                value={settings.libreOfficePath || ''}
                onChange={(e) =>
                  setSettings({ ...settings, libreOfficePath: e.target.value })
                }
                className="w-full px-3 py-1.5 text-xs bg-[#120F24] text-white rounded-lg border border-[#2B2452] focus:outline-none focus:border-[#7657F6]"
              />
            </div>

            {/* Tesseract OCR Status */}
            <div className="p-3.5 rounded-xl bg-[#17142A] border border-[#2A244E] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Tesseract OCR (Nhận dạng văn bản)</span>
                  {engineStatus.tesseractAvailable ? (
                    <span className="flex items-center gap-1 text-[11px] text-[#22C55E]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã sẵn sàng
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-[#F59E0B]">
                      <AlertTriangle className="w-3.5 h-3.5" /> Chưa cài đặt
                    </span>
                  )}
                </div>
                {!engineStatus.tesseractAvailable && (
                  <a
                    href="https://github.com/UB-Mannheim/tesseract/wiki"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] text-[#A78BFA] hover:underline"
                  >
                    Tải về <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="text"
                placeholder="Đường dẫn tesseract.exe tùy chỉnh..."
                value={settings.tesseractPath || ''}
                onChange={(e) =>
                  setSettings({ ...settings, tesseractPath: e.target.value })
                }
                className="w-full px-3 py-1.5 text-xs bg-[#120F24] text-white rounded-lg border border-[#2B2452] focus:outline-none focus:border-[#7657F6]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-[#252044] bg-[#181430]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#9692AF] hover:text-white"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              onSave();
              onClose();
            }}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#7657F6] to-[#5836DB] hover:from-[#8B6EF8] hover:to-[#6844EE] text-white shadow-glow"
          >
            <Save className="w-3.5 h-3.5" /> Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
};

