@echo off
echo ==========================================
echo   Sanmuga Priyan - Portfolio GitHub Push
echo ==========================================
echo.
echo Running push script...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0push_to_github.ps1"
pause
