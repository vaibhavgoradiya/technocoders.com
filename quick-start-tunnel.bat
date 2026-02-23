@echo off
echo ========================================
echo Technocoders Email Server Quick Start
echo ========================================
echo.

REM Check if cloudflared is installed
where cloudflared >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] cloudflared not found!
    echo Please install: winget install --id Cloudflare.cloudflared
    pause
    exit /b 1
)

echo [1/3] Starting Email Server...
start "Email Server" cmd /k "cd /d %~dp0 && npm run email-server"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Cloudflare Tunnel...
start "Cloudflare Tunnel" cmd /k "cloudflared tunnel run technocoders-email"
timeout /t 3 /nobreak >nul

echo [3/3] Done!
echo.
echo ========================================
echo Services Started:
echo - Email Server: http://localhost:3001
echo - Public API: https://technocoders.com/api/contact
echo ========================================
echo.
echo Press any key to stop all services...
pause >nul

echo.
echo Stopping services...
taskkill /FI "WINDOWTITLE eq Email Server*" /T /F >nul 2>nul
taskkill /FI "WINDOWTITLE eq Cloudflare Tunnel*" /T /F >nul 2>nul
echo Services stopped.
pause