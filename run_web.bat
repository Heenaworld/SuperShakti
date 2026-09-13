@echo off
echo ========================================================
echo        Starting SuperShakti Web Sanctuary Application
echo ========================================================
echo.
echo Opening server at http://localhost:8000 ...
python -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload
pause
