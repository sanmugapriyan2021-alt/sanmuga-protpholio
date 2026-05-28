# ============================================================
#  Sanmuga Priyan — Portfolio GitHub Push Script
#  Just run this once. It sets up git and pushes to GitHub.
# ============================================================

$repoName   = "sanmuga-protpholio"
$githubUser = "sanmugapriyan2021-alt"
$remoteURL  = "https://github.com/$githubUser/$repoName.git"
$folder     = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Sanmuga Priyan - Portfolio Pusher  " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Move into the portfolio folder
Set-Location $folder
Write-Host "[1/6] Working in: $folder" -ForegroundColor Green

# Step 2: Init git
if (-Not (Test-Path ".git")) {
    git init
    Write-Host "[2/6] Git initialized." -ForegroundColor Green
} else {
    Write-Host "[2/6] Git already initialized." -ForegroundColor Yellow
}

# Step 3: Configure git user (update if needed)
git config user.name  "Sanmuga Priyan"
git config user.email "sanmugapriyan2021@gmail.com"
Write-Host "[3/6] Git user configured." -ForegroundColor Green

# Step 4: Stage all files
git add .
Write-Host "[4/6] Files staged." -ForegroundColor Green

# Step 5: Commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Initial commit: Professional portfolio - $timestamp" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[5/6] Nothing new to commit (already up to date)." -ForegroundColor Yellow
} else {
    Write-Host "[5/6] Committed successfully." -ForegroundColor Green
}

# Step 6: Set remote and push
git remote remove origin 2>$null
git remote add origin $remoteURL
git branch -M main

Write-Host ""
Write-Host "[6/6] Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "      --> $remoteURL" -ForegroundColor White
Write-Host ""
Write-Host "  NOTE: A browser window or credential popup may appear." -ForegroundColor Yellow
Write-Host "  Sign in to GitHub if prompted." -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=============================================" -ForegroundColor Green
    Write-Host "  SUCCESS! Portfolio pushed to GitHub!" -ForegroundColor Green
    Write-Host "  View it at: https://github.com/$githubUser/$repoName" -ForegroundColor Cyan
    Write-Host "=============================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=============================================" -ForegroundColor Red
    Write-Host "  Push failed. Possible reasons:" -ForegroundColor Red
    Write-Host "  1. Repo doesn't exist yet on GitHub." -ForegroundColor Yellow
    Write-Host "     Create it at: https://github.com/new" -ForegroundColor Cyan
    Write-Host "     Name it: sanmuga-portfolio" -ForegroundColor White
    Write-Host "     (leave it EMPTY - no README)" -ForegroundColor White
    Write-Host "  2. Authentication issue - sign in when prompted." -ForegroundColor Yellow
    Write-Host "=============================================" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to close"
