$ErrorActionPreference = "Stop"
$w = New-Object -ComObject Word.Application
$w.Visible = $false
$w.DisplayAlerts = 0
try {
    $pdfPath = "D:\pdf tools\target\test_office.pdf"
    $docxPath = "D:\pdf tools\target\test_converted_back.docx"
    $doc = $w.Documents.Open($pdfPath, $false, $true, $false)
    $doc.SaveAs([ref]$docxPath, [ref]16)
    $doc.Close([ref]0)
    Write-Output "SUCCESS: Converted PDF back to DOCX: $docxPath"
} finally {
    $w.Quit([ref]0)
}
