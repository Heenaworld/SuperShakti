<#
.SYNOPSIS
    SuperShakti Google Cloud Automated Deployment Script
#>

Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "      SuperShakti - Deploy to Google Cloud Run            " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host ""

# Check for gcloud CLI
$gcloudCmd = Get-Command gcloud -ErrorAction SilentlyContinue
if (-not $gcloudCmd) {
    Write-Host "[X] Google Cloud SDK ('gcloud') is not found on your system PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "To deploy directly from your browser without installing the CLI:" -ForegroundColor Yellow
    Write-Host "  1. Open Google Cloud Console: https://console.cloud.google.com/run" -ForegroundColor Cyan
    Write-Host "  2. Click 'Create Service' -> 'Deploy from source repository' (GitHub)" -ForegroundColor Cyan
    Write-Host "  3. Select your repository and click 'Create'!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or install the Google Cloud CLI from: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
    exit 1
}

# Prompt for Project ID if not set
$currentProject = gcloud config get-value project 2>$null
if (-not $currentProject -or $currentProject -eq "(unset)") {
    $currentProject = Read-Host "Enter your Google Cloud Project ID"
    if (-not $currentProject) {
        Write-Host "Project ID cannot be empty." -ForegroundColor Red
        exit 1
    }
    gcloud config set project $currentProject
}

Write-Host "[*] Active Project: $currentProject" -ForegroundColor Green
Write-Host "[*] Enabling required Google Cloud APIs (Cloud Run, Cloud Build, Artifact Registry)..." -ForegroundColor Cyan
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

Write-Host "[*] Deploying SuperShakti directly to Cloud Run..." -ForegroundColor Cyan
gcloud run deploy supershakti `
    --source . `
    --region us-central1 `
    --platform managed `
    --allow-unauthenticated `
    --min-instances 0 `
    --max-instances 5 `
    --memory 512Mi

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "    Deployment Successful! Your app is live globally!     " -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host "[X] Deployment failed. Please review error output above." -ForegroundColor Red
}
