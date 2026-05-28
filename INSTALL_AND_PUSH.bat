@echo off
title Sanmuga Portfolio - Install Git & Push to GitHub
color 0A
echo.
echo ============================================
echo   Installing Git and Pushing to GitHub
echo ============================================
echo.

:: Step 1: Install Git via winget
echo [1/4] Installing Git for Windows...
echo       (This may take 1-2 minutes)
echo.
winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
echo.
echo [1/4] Git installed!
echo.

:: Refresh PATH so git is available
set "PATH=%PATH%;C:\Program Files\Git\cmd"

:: Step 2: Navigate to portfolio folder
echo [2/4] Setting up repository...
cd /d "%~dp0"
git init
git config user.name "Sanmuga Priyan"
git config user.email "sanmugapriyan2021@gmail.com"
echo.

:: Step 3: Stage and commit
echo [3/4] Adding files...
git add .
git commit -m "Initial commit: Professional Portfolio"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/sanmugapriyan2021-alt/sanmuga-protpholio.git
echo.

:: Step 4: Push
echo [4/4] Pushing to GitHub...
echo.
echo  >> A browser window will open for GitHub login.
echo  >> Sign in with your GitHub account.
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo   SUCCESS! Portfolio is on GitHub!
    echo   https://github.com/sanmugapriyan2021-alt/sanmuga-protpholio
    echo ============================================
) else (
    echo.
    echo   Push failed. Check your GitHub login.
)
echo.
pause
