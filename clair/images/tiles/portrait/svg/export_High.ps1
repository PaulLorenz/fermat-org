param([Int32]$ppp=360, [String]$suffix="")

Dir | % { & 'C:\Program Files\Inkscape\inkscape.exe' "--export-png=$($_.BaseName)$suffix.png" "--export-dpi=$ppp" $_.name }