# Test converting DOCX, XLSX, PPTX to PDF using installed Microsoft Office 2021
$ErrorActionPreference = "Stop"

# 1. Word test
$w = New-Object -ComObject Word.Application
$w.Visible = $false
try {
    $doc = $w.Documents.Add()
    $doc.Content.Text = "Word to PDF Success via Office 2021!"
    $docPath = "D:\pdf tools\target\test_word.docx"
    $pdfPath = "D:\pdf tools\target\test_word.pdf"
    $doc.SaveAs([ref]$docPath)
    $doc.ExportAsFixedFormat($pdfPath, 17)
    $doc.Close([ref]0)
    Write-Output "Word -> PDF OK: $(Test-Path $pdfPath)"
} finally {
    $w.Quit([ref]0)
}

# 2. Excel test
$e = New-Object -ComObject Excel.Application
$e.Visible = $false
$e.DisplayAlerts = $false
try {
    $wb = $e.Workbooks.Add()
    $ws = $wb.Worksheets.Item(1)
    $ws.Cells.Item(1, 1).Value2 = "Excel to PDF Success!"
    $xlsPdfPath = "D:\pdf tools\target\test_excel.pdf"
    $wb.ExportAsFixedFormat(0, $xlsPdfPath)
    $wb.Close($false)
    Write-Output "Excel -> PDF OK: $(Test-Path $xlsPdfPath)"
} finally {
    $e.Quit()
}

# 3. PowerPoint test
$p = New-Object -ComObject PowerPoint.Application
try {
    $pres = $p.Presentations.Add([Microsoft.Office.Core.MsoTriState]::msoFalse)
    $slide = $pres.Slides.Add(1, 12) # 12 = ppLayoutBlank
    $pptPdfPath = "D:\pdf tools\target\test_ppt.pdf"
    $pres.SaveAs($pptPdfPath, 32)
    $pres.Close()
    Write-Output "PPT -> PDF OK: $(Test-Path $pptPdfPath)"
} finally {
    $p.Quit()
}
