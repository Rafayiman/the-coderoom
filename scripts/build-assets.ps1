Add-Type -AssemblyName System.Drawing
$root = 'd:\the-coderoom-nexus-main'
$e = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$prof = Join-Path $env:TEMP 'edge-asset-profile'

function Shot($html, $png, $w, $h, $transparent) {
  $a = @('--headless','--disable-gpu','--hide-scrollbars','--no-first-run',"--user-data-dir=$prof","--window-size=$w,$h",'--force-device-scale-factor=1')
  if ($transparent) { $a += '--default-background-color=00000000' }
  $a += ("--screenshot=" + $png)
  $a += ("file:///" + ($html -replace '\\','/'))
  Start-Process -FilePath $e -ArgumentList $a -Wait -NoNewWindow
}

Shot "$root\scripts\og.html" "$root\public\og.png" 1200 630 $false
Shot "$root\scripts\icon.html" "$root\public\icon-512.png" 512 512 $true

function Resize($src, $dst, $w, $h) {
  $img = [System.Drawing.Image]::FromFile($src)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.DrawImage($img, 0, 0, $w, $h)
  $g.Dispose(); $img.Dispose()
  $bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
}
Resize "$root\public\icon-512.png" "$root\public\apple-touch-icon.png" 180 180
Resize "$root\public\icon-512.png" "$env:TEMP\ico64.png" 64 64

# Wrap the 64px PNG into a single-image .ico
$png = [System.IO.File]::ReadAllBytes("$env:TEMP\ico64.png")
$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter $ms
$bw.Write([uint16]0); $bw.Write([uint16]1); $bw.Write([uint16]1)
$bw.Write([byte]64); $bw.Write([byte]64); $bw.Write([byte]0); $bw.Write([byte]0)
$bw.Write([uint16]1); $bw.Write([uint16]32); $bw.Write([uint32]$png.Length); $bw.Write([uint32]22)
$bw.Write($png)
[System.IO.File]::WriteAllBytes("$root\public\favicon.ico", $ms.ToArray())

# Project screenshots: PNG -> optimised JPEG
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 82L
foreach ($n in 'jewelignite','smart-fitness-wear') {
  $src = "$root\public\projects\$n.png"
  if (Test-Path $src) {
    $img = [System.Drawing.Image]::FromFile($src)
    $bmp = New-Object System.Drawing.Bitmap 1200, 750
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($img, 0, 0, 1200, 750)
    $g.Dispose(); $img.Dispose()
    $bmp.Save("$root\public\projects\$n.jpg", $codec, $ep); $bmp.Dispose()
    Remove-Item $src
  }
}
Get-ChildItem "$root\public" -Recurse -File | ForEach-Object { $_.FullName.Replace($root,'') + ' ' + $_.Length }
