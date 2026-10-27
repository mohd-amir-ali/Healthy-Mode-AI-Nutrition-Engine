@echo off
REM ============================================================================
REM HEALTHY MODE - AI NUTRITION & HEALTHY SUBSCRIPTIONS ENGINE
REM Author: Mohd Amir Ali | Portfolio: https://techwithamir.com
REM ============================================================================
echo Starting Healthy Mode - AI Nutrition Engine...
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Launching local Flask server at http://127.0.0.1:5060 ...
    start "" "http://127.0.0.1:5060"
    python WebApp.py
) else (
    echo Python not detected. Launching standalone browser interface index.html ...
    start "" "index.html"
)
