import React from 'react';
import {
  X,
  History,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
} from 'lucide-react';
import { TaskRecord } from '../../types';
import { openInExplorer } from '../../services/tauriApi';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: TaskRecord[];
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  tasks,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl h-[80vh] bg-[#141126] border border-[#2D2656] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252044] bg-[#181430]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#251F47] flex items-center justify-center text-[#A78BFA]">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Lịch sử tác vụ</h2>
              <p className="text-xs text-[#9692AF]">
                Lưu trữ cục bộ an toàn trong cơ sở dữ liệu SQLite máy tính ({tasks.length} bản ghi)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {tasks.length > 0 && (
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#EF4444] bg-[#2A1525] hover:bg-[#3D1A33] border border-[#4E1F3D] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa lịch sử
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9692AF] hover:text-white hover:bg-[#252044]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Task list content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 text-[#7F7A9E]">
              <History className="w-12 h-12 mb-3 stroke-[1.5] text-[#3D356A]" />
              <p className="text-sm font-medium text-white">Chưa có tác vụ nào được thực hiện</p>
              <p className="text-xs mt-1 text-[#665F87]">
                Các tác vụ gộp, tách, chuyển đổi, nén của bạn sẽ hiển thị tại đây.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-[#17142A] border border-[#2A244E] hover:border-[#433777] transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                    )}
                    <span className="font-bold text-xs text-white">{task.toolName}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        task.status === 'completed'
                          ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                          : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                      }`}
                    >
                      {task.status === 'completed' ? 'Hoàn thành' : 'Thất bại'}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#7F7A9E]">{task.startedAt}</span>
                </div>

                {/* Input and output files */}
                <div className="text-xs space-y-1 text-[#9692AF]">
                  <p className="truncate">
                    <span className="text-[#6B658D]">Đầu vào ({task.inputFiles.length} tệp):</span>{' '}
                    {task.inputFiles.join(', ')}
                  </p>
                  {task.outputFiles.length > 0 && (
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      <span className="text-[#6B658D]">Kết quả:</span>
                      {task.outputFiles.map((outPath, i) => (
                        <button
                          key={i}
                          onClick={() => openInExplorer(outPath)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#201B3C] hover:bg-[#2C2454] text-[#A78BFA] border border-[#372E63] text-[11px]"
                        >
                          <FileText className="w-3 h-3" />
                          <span className="truncate max-w-[200px]">
                            {outPath.split(/[/\\]/).pop()}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {task.errorMessage && (
                    <p className="text-[#EF4444] text-[11px] pt-1">Lỗi: {task.errorMessage}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
