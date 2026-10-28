$ErrorActionPreference = "Stop"
$w = New-Object -ComObject Word.Application
$w.Visible = $false
try {
    $doc = $w.Documents.Add()
    $doc.Content.Text = "PDF Tools NCN Test - Microsoft Office Native Conversion"
    $pdfPath = "D:\pdf tools\target\test_office.pdf"
    $doc.ExportAsFixedFormat($pdfPath, 17) # 17 = wdExportFormatPDF
    $doc.Close([ref]0) # 0 = wdDoNotSaveChanges
    Write-Output "SUCCESS: Generated $pdfPath"
} finally {
    $w.Quit([ref]0)
}
