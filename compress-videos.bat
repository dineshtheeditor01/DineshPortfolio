@echo off
REM ============================================================
REM  VIDEO COMPRESSION SCRIPT
REM  Requires FFmpeg — Install it first:
REM    winget install Gyan.FFmpeg
REM  Then restart this terminal and run: compress-videos.bat
REM
REM  What it does:
REM   - Re-encodes every .mp4 in public/videos/works/ with
REM     H.264 + AAC at CRF 28 (great quality, ~80-95% smaller)
REM   - Caps resolution at 1920px wide (for landscape),
REM     1080px tall (for portrait)
REM   - Saves originals to public/videos/works/_originals/
REM   - Output files overwrite the originals
REM
REM  Estimated output sizes (from your current files):
REM   93MB  Reel 01.mp4              →  ~5-10MB
REM   98MB  Transition Edit 01.mp4   →  ~5-10MB
REM   93MB  Periyar Documentary.mp4  →  ~8-15MB
REM   91MB  Ramraj Ad Video.mp4      →  ~5-10MB
REM   93MB  Video 01 ...mp4          →  ~8-15MB
REM   88MB  Video 04 ...mp4          →  ~5-10MB
REM ============================================================

where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ERROR: ffmpeg not found!
    echo.
    echo  Install it with:  winget install Gyan.FFmpeg
    echo  Then restart this terminal and run this script again.
    echo.
    pause
    exit /b 1
)

set "WORKS=public\videos\works"
set "BACKUP=%WORKS%\_originals"

if not exist "%BACKUP%" mkdir "%BACKUP%"

echo.
echo Compressing videos in %WORKS% ...
echo Originals will be saved to %BACKUP%\
echo.

for %%F in ("%WORKS%\*.mp4") do (
    set "NAME=%%~nxF"
    set "ORIG=%%~fF"
    set "TMP=%%~dpF__tmp__%%~nxF"

    REM Skip files already processed (inside _originals)
    echo %%F | findstr /i "_originals" >nul && goto :skip

    echo Processing: %%~nxF

    REM Backup original
    if not exist "%BACKUP%\%%~nxF" (
        copy /Y "%%~fF" "%BACKUP%\%%~nxF" >nul
    )

    REM Compress:
    REM  -crf 28      = quality (18=lossless, 28=good web quality, 32=smaller)
    REM  -preset slow = better compression (slower encode, faster playback)
    REM  -vf scale    = cap at 1920 wide, keep aspect ratio
    REM  -movflags    = fast start (metadata first for streaming)
    ffmpeg -i "%%~fF" ^
        -c:v libx264 -crf 28 -preset slow ^
        -vf "scale='min(1920,iw)':-2:flags=lanczos" ^
        -c:a aac -b:a 128k ^
        -movflags +faststart ^
        -y "%TMP%"

    if %ERRORLEVEL% EQU 0 (
        del "%%~fF"
        ren "%TMP%" "%%~nxF"
        echo   Done: %%~nxF
    ) else (
        echo   ERROR compressing %%~nxF - keeping original
        if exist "%TMP%" del "%TMP%"
    )

    :skip
)

echo.
echo All done! Originals are in %BACKUP%\
echo.
pause
