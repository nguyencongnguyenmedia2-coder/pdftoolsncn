$ErrorActionPreference = "Stop"
# Set registry to suppress prompt
if (!(Test-Path "HKCU:\Software\Microsoft\Office\16.0\Word\Options")) {
    New-Item -Path "HKCU:\Software\Microsoft\Office\16.0\Word\Options" -Force | Out-Null
}
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Office\16.0\Word\Options" -Name "DisablePDFPrompt" -Value 1 -Type DWord

$w = New-Object -ComObject Word.Application
$w.Visible = $false
$w.DisplayAlerts = 0
try {
    $pdfPath = "D:\pdf tools\target\test_office.pdf"
    $docxPath = "D:\pdf tools\target\test_pdf_to_word.docx"
    $doc = $w.Documents.Open($pdfPath, $false, $true)
    $doc.SaveAs([ref]$docxPath, [ref]16) # 16 = wdFormatDocumentDefault
    $doc.Close([ref]0)
    Write-Output "SUCCESS: Converted PDF to DOCX: $(Test-Path $docxPath)"
} finally {
    $w.Quit([ref]0)
}
