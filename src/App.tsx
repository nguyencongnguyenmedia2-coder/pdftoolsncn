import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { getPdfDocument } from './utils/pdfRenderer';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToolGrid } from './components/layout/ToolGrid';
import { Workspace } from './components/workspace/Workspace';
import { ToolOptions } from './components/workspace/ToolOptions';
import { PdfViewerModal } from './components/workspace/PdfViewerModal';
import { HistoryModal } from './components/modals/HistoryModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { HelpModal } from './components/modals/HelpModal';
import { AboutModal } from './components/modals/AboutModal';
import { TOOLS } from './data/tools';
import {
  AppSettings,
  CompressOptions,
  ImageToPdfOptions,
  OrganizePageItem,
  PdfFileInfo,
  SecurityOptions,
  SplitOptions,
  SystemEngineStatus,
  TaskRecord,
  ToolId,
  WatermarkOptions,
} from './types';
import {
  clearTasksHistory,
  compressPdf,
  convertOfficeToPdf,
  convertPdfToOffice,
  editMetadata,
  getEngineStatus,
  getPdfInfo,
  getSavedSettings,
  getTasksHistory,
  imagesToPdf,
  mergePdfs,
  organizePdf,
  pdfToText,
  runOcr,
  saveAppSettings,
  saveTaskHistory,
  splitPdf,
  textToPdf,
  watermarkPdf,
} from './services/tauriApi';

const DEFAULT_SETTINGS: AppSettings = {
  language: 'vi',
  theme: 'dark',
  defaultOutputDir: 'C:\\PDF_Tools_Output',
  duplicateAction: 'rename',
  keepTempFiles: false,
  maxParallelTasks: 2,
};

export function App() {
  // Navigation / Active Tool
  const [selectedToolId, setSelectedToolId] = useState<ToolId>('merge');
  const currentTool = TOOLS.find((t) => t.id === selectedToolId) || TOOLS[0];

  // Files in workspace
  const [files, setFiles] = useState<PdfFileInfo[]>([]);
  const [outputDir, setOutputDir] = useState<string>('C:\\PDF_Tools_Output');

  // Specific Tool Options
  const [pageRanges, setPageRanges] = useState<Record<string, string>>({});
  const [splitOptions, setSplitOptions] = useState<SplitOptions>({ mode: 'all_pages' });
  const [compressOptions, setCompressOptions] = useState<CompressOptions>({
    level: 'medium',
    stripMetadata: true,
    grayscale: false,
  });
  const [watermarkOptions, setWatermarkOptions] = useState<WatermarkOptions>({
    text: 'PDF TOOLS NCN',
    fontSize: 32,
    opacity: 0.25,
    rotation: 45,
    color: '#7657F6',
    position: 'diagonal',
    pageNumbers: true,
    pageNumberPosition: 'bottom-center',
    pageNumberFormat: 'Trang {n} / {total}',
  });
  const [imageToPdfOptions, setImageToPdfOptions] = useState<ImageToPdfOptions>({
    pageSize: 'A4',
    orientation: 'portrait',
    marginMm: 10,
    centerImage: true,
  });
  const [securityOptions, setSecurityOptions] = useState<SecurityOptions>({
    mode: 'encrypt',
    userPassword: '',
    ownerPassword: '',
  });
  const [organizePages, setOrganizePages] = useState<OrganizePageItem[]>([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');
  const [metaStripAll, setMetaStripAll] = useState(false);
  const [ocrLanguage, setOcrLanguage] = useState<'vie' | 'eng' | 'vie+eng'>('vie');
  const [ocrFormat, setOcrFormat] = useState<'searchable_pdf' | 'txt'>('searchable_pdf');

  // Execution state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultOutputFiles, setResultOutputFiles] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [previewFile, setPreviewFile] = useState<PdfFileInfo | null>(null);
  const [previewInitialPage, setPreviewInitialPage] = useState<number>(1);
  const lastOrganizedFileRef = useRef<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // History & Settings
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [engineStatus, setEngineStatus] = useState<SystemEngineStatus>({
    libreOfficeAvailable: false,
    msOfficeAvailable: false,
    officeReady: false,
    officeEngineName: 'Đang kiểm tra...',
    tesseractAvailable: false,
    vietnameseOcrReady: false,
  });

  // Load initial settings and history
  useEffect(() => {
    async function initApp() {
      try {
        const saved = await getSavedSettings();
        if (saved) {
          setSettings(saved);
          if (saved.defaultOutputDir) setOutputDir(saved.defaultOutputDir);
        }
        const history = await getTasksHistory(50);
        setTasks(history);

        const engines = await getEngineStatus(
          saved?.libreOfficePath,
          saved?.tesseractPath
        );
        setEngineStatus(engines);
      } catch (e) {
        console.error('App init error:', e);
      }
    }
    initApp();
  }, []);

  // Update file info when files change
  useEffect(() => {
    async function updateInfos() {
      for (const f of files) {
        if (f.name.toLowerCase().endsWith('.pdf') && (!f.pageCount || f.pageCount === 0)) {
          try {
            const info = await getPdfInfo(f.path);
            let finalPageCount = info.pageCount || 0;
            if (!finalPageCount || finalPageCount <= 0) {
              try {
                const doc = await getPdfDocument(f.path);
                finalPageCount = doc.numPages;
              } catch (_) {}
            }
            const mergedInfo = { ...info, pageCount: finalPageCount || 1 };
            setFiles((prev) =>
              prev.map((item) => (item.path === f.path ? { ...item, ...mergedInfo } : item))
            );
          } catch (err) {
            console.warn('Cannot read info for file:', f.path, err);
          }
        }
      }
    }
    if (files.length > 0) {
      updateInfos();
    } else {
      lastOrganizedFileRef.current = null;
      setOrganizePages([]);
    }
  }, [files]);

  // Keep organizePages synced with the first PDF file in workspace
  useEffect(() => {
    const firstPdf = files.find((f) => f.name.toLowerCase().endsWith('.pdf'));
    if (
      firstPdf &&
      firstPdf.pageCount &&
      firstPdf.pageCount > 0 &&
      lastOrganizedFileRef.current !== `${firstPdf.path}::${firstPdf.pageCount}`
    ) {
      lastOrganizedFileRef.current = `${firstPdf.path}::${firstPdf.pageCount}`;
      const pages: OrganizePageItem[] = [];
      for (let i = 1; i <= firstPdf.pageCount; i++) {
        pages.push({ pageNumber: i, rotation: 0, deleted: false });
      }
      setOrganizePages(pages);
    }
  }, [files]);

  // Handle Tool Execution
  const handleExecute = async () => {
    if (files.length === 0) {
      setErrorMessage('Vui lòng chọn ít nhất một tệp để xử lý.');
      return;
    }

    setIsProcessing(true);
    setProgress(15);
    setResultMessage(null);
    setErrorMessage(null);
    setResultOutputFiles([]);

    const startTime = new Date().toLocaleTimeString('vi-VN');
    const firstFile = files[0];
    const stem = firstFile.name.replace(/\.[^/.]+$/, '');
    const timestamp = Date.now().toString().slice(-6);

    try {
      let outputFiles: string[] = [];

      setProgress(40);

      switch (selectedToolId) {
        case 'merge': {
          const outFile = `${outputDir}\\Gop_NCN_${timestamp}.pdf`;
          const res = await mergePdfs(
            files.map((f) => f.path),
            pageRanges,
            outFile
          );
          outputFiles = [res];
          setResultMessage(`Đã gộp thành công ${files.length} tệp PDF!`);
          break;
        }

        case 'split': {
          const res = await splitPdf(
            firstFile.path,
            splitOptions.mode,
            splitOptions.ranges,
            splitOptions.pagesPerFile,
            outputDir
          );
          outputFiles = res;
          setResultMessage(`Đã tách thành công thành ${res.length} tệp PDF!`);
          break;
        }

        case 'organize': {
          const outFile = `${outputDir}\\${stem}_da_chinh_sua.pdf`;
          const res = await organizePdf(firstFile.path, organizePages, outFile);
          outputFiles = [res];
          setResultMessage('Đã hoàn thành xoay, sắp xếp và chỉnh sửa trang!');
          break;
        }

        case 'compress': {
          const outFile = `${outputDir}\\${stem}_nen.pdf`;
          const res = await compressPdf(
            firstFile.path,
            compressOptions.level,
            compressOptions.stripMetadata,
            outFile
          );
          outputFiles = [res.outputPath];
          setResultMessage(
            `Đã nén thành công! Tiết kiệm ${res.savedPercentage.toFixed(1)}% dung lượng.`
          );
          break;
        }

        case 'watermark': {
          const outFile = `${outputDir}\\${stem}_watermark.pdf`;
          const res = await watermarkPdf(firstFile.path, watermarkOptions, outFile);
          outputFiles = [res];
          setResultMessage('Đã chèn dấu watermark và số trang thành công!');
          break;
        }

        case 'image_to_pdf': {
          const outFile = `${outputDir}\\Bo_anh_${timestamp}.pdf`;
          const res = await imagesToPdf(
            files.map((f) => f.path),
            imageToPdfOptions,
            outFile
          );
          outputFiles = [res];
          setResultMessage(`Đã chuyển đổi ${files.length} ảnh sang PDF thành công!`);
          break;
        }

        case 'pdf_to_text': {
          const outFile = `${outputDir}\\${stem}_van_ban.txt`;
          const res = await pdfToText(firstFile.path, outFile);
          outputFiles = [res];
          setResultMessage('Đã trích xuất toàn bộ văn bản sang tệp TXT!');
          break;
        }

        case 'text_to_pdf': {
          const outFile = `${outputDir}\\${stem}.pdf`;
          const res = await textToPdf(firstFile.path, outFile);
          outputFiles = [res];
          setResultMessage('Đã đóng gói văn bản thành tệp PDF thành công!');
          break;
        }

        case 'metadata': {
          const outFile = `${outputDir}\\${stem}_metadata.pdf`;
          const res = await editMetadata(
            firstFile.path,
            metaTitle,
            metaAuthor,
            'PDF Tools NCN',
            metaStripAll,
            outFile
          );
          outputFiles = [res];
          setResultMessage('Đã cập nhật thông tin metadata của tài liệu!');
          break;
        }

        case 'word_to_pdf':
        case 'excel_to_pdf':
        case 'ppt_to_pdf': {
          for (const f of files) {
            const res = await convertOfficeToPdf(
              f.path,
              outputDir,
              settings.libreOfficePath
            );
            outputFiles.push(res);
          }
          setResultMessage(`Đã chuyển đổi ${outputFiles.length} tài liệu Office sang PDF!`);
          break;
        }

        case 'pdf_to_word': {
          const res = await convertPdfToOffice(
            firstFile.path,
            'docx',
            outputDir,
            settings.libreOfficePath
          );
          outputFiles = [res];
          setResultMessage('Đã chuyển đổi PDF sang tệp Word (.docx) thành công!');
          break;
        }

        case 'pdf_to_excel': {
          const res = await convertPdfToOffice(
            firstFile.path,
            'xlsx',
            outputDir,
            settings.libreOfficePath
          );
          outputFiles = [res];
          setResultMessage('Đã chuyển đổi PDF sang tệp Excel (.xlsx) thành công!');
          break;
        }

        case 'pdf_to_ppt': {
          const res = await convertPdfToOffice(
            firstFile.path,
            'pptx',
            outputDir,
            settings.libreOfficePath
          );
          outputFiles = [res];
          setResultMessage('Đã chuyển đổi PDF sang tệp PowerPoint (.pptx) thành công!');
          break;
        }

        case 'ocr': {
          const baseName = `${outputDir}\\${stem}_ocr`;
          const res = await runOcr(
            firstFile.path,
            ocrLanguage,
            ocrFormat,
            baseName,
            settings.tesseractPath
          );
          outputFiles = [res];
          setResultMessage('Đã nhận dạng văn bản tiếng Việt thành công!');
          break;
        }

        default:
          throw new Error('Chức năng đang được tích hợp thêm.');
      }

      setProgress(100);
      setResultOutputFiles(outputFiles);

      // Celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#7657F6', '#A78BFA', '#22C55E'],
        });
      } catch (err) {}

      // Save task record to SQLite
      const taskRecord: TaskRecord = {
        id: crypto.randomUUID ? crypto.randomUUID() : `task_${Date.now()}`,
        toolId: selectedToolId,
        toolName: currentTool.name,
        inputFiles: files.map((f) => f.path),
        outputFiles,
        status: 'completed',
        progress: 100,
        startedAt: startTime,
        finishedAt: new Date().toLocaleTimeString('vi-VN'),
        inputSize: files.reduce((acc, f) => acc + (f.size || 0), 0),
        outputSize: 0,
      };
      await saveTaskHistory(taskRecord);
      setTasks((prev) => [taskRecord, ...prev]);
    } catch (err: any) {
      console.error('Execution failed:', err);
      const errMsg = err?.message || err?.toString() || 'Đã xảy ra lỗi khi xử lý tệp.';
      setErrorMessage(errMsg);

      const failedRecord: TaskRecord = {
        id: crypto.randomUUID ? crypto.randomUUID() : `task_${Date.now()}`,
        toolId: selectedToolId,
        toolName: currentTool.name,
        inputFiles: files.map((f) => f.path),
        outputFiles: [],
        status: 'failed',
        progress: 0,
        startedAt: startTime,
        errorMessage: errMsg,
        inputSize: 0,
        outputSize: 0,
      };
      await saveTaskHistory(failedRecord);
      setTasks((prev) => [failedRecord, ...prev]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearHistory = async () => {
    await clearTasksHistory();
    setTasks([]);
  };

  const handleSaveSettings = async () => {
    await saveAppSettings(settings);
    const engines = await getEngineStatus(
      settings.libreOfficePath,
      settings.tesseractPath
    );
    setEngineStatus(engines);
  };

  return (
    <div className="min-h-screen bg-[#0D0B18] text-[#F8FAFC] flex flex-col justify-between selection:bg-[#7657F6]/30">
      {/* Top Header */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        historyCount={tasks.length}
      />

      {/* Main Body */}
      <main className="flex-1">
        {/* Tool Grid selector (matching reference layout) */}
        <ToolGrid
          selectedToolId={selectedToolId}
          onSelectTool={(id) => {
            setSelectedToolId(id);
            setResultMessage(null);
            setErrorMessage(null);
            setResultOutputFiles([]);
          }}
        />

        {/* Workspace and Configuration */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <ToolOptions
            tool={currentTool}
            files={files}
            onPreviewPage={(f, pageNum) => {
              setPreviewInitialPage(pageNum);
              setPreviewFile(f);
            }}
            engineStatus={engineStatus}
            splitOptions={splitOptions}
            setSplitOptions={setSplitOptions}
            compressOptions={compressOptions}
            setCompressOptions={setCompressOptions}
            watermarkOptions={watermarkOptions}
            setWatermarkOptions={setWatermarkOptions}
            imageToPdfOptions={imageToPdfOptions}
            setImageToPdfOptions={setImageToPdfOptions}
            securityOptions={securityOptions}
            setSecurityOptions={setSecurityOptions}
            organizePages={organizePages}
            setOrganizePages={setOrganizePages}
            metaTitle={metaTitle}
            setMetaTitle={setMetaTitle}
            metaAuthor={metaAuthor}
            setMetaAuthor={setMetaAuthor}
            metaStripAll={metaStripAll}
            setMetaStripAll={setMetaStripAll}
            ocrLanguage={ocrLanguage}
            setOcrLanguage={setOcrLanguage}
            ocrFormat={ocrFormat}
            setOcrFormat={setOcrFormat}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </div>

        <Workspace
          tool={currentTool}
          files={files}
          setFiles={setFiles}
          outputDir={outputDir}
          setOutputDir={setOutputDir}
          onExecute={handleExecute}
          isProcessing={isProcessing}
          progress={progress}
          resultMessage={resultMessage}
          resultOutputFiles={resultOutputFiles}
          errorMessage={errorMessage}
          onPreviewFile={(f, pageNum = 1) => {
            setPreviewInitialPage(pageNum);
            setPreviewFile(f);
          }}
          pageRanges={pageRanges}
          setPageRanges={setPageRanges}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Modals */}
      <PdfViewerModal
        file={previewFile}
        initialPage={previewInitialPage}
        onClose={() => setPreviewFile(null)}
      />
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        tasks={tasks}
        onClearHistory={handleClearHistory}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
        engineStatus={engineStatus}
        onSave={handleSaveSettings}
      />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}

export default App;
