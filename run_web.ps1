Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "       Starting SuperShakti Web Sanctuary Application    " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Access URL: http://localhost:8000" -ForegroundColor Green
python -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload
