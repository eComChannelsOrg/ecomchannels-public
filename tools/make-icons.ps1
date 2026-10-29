Add-Type -AssemblyName System.Drawing
$root = 'C:\Users\norep\dev\ecomchannels-website'
$src = [System.Drawing.Image]::FromFile("$root\brand\linkedin-logo-200.png")
function Save-Resized($size, $path) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($src, 0, 0, $size, $size)
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  "$path $size"
}
Save-Resized 200 "$root\static\logo.png"
Save-Resized 180 "$root\static\apple-touch-icon.png"
Save-Resized 64 "$root\static\logo-64.png"
Save-Resized 48 "$root\static\favicon-48.png"
Save-Resized 32 "$root\static\favicon-32.png"
$src.Dispose()
