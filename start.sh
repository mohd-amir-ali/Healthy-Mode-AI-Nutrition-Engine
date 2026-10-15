#!/bin/bash
# ==============================================================================
# HEALTHY MODE // AI Nutritional Scoring & Subscription Engine
# One-Command macOS / Linux Launcher (Port 5060)
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

echo "========================================================================"
echo "  HEALTHY MODE // AI Nutritional Scoring & Subscription Engine"
echo "========================================================================"
echo "Starting Web Server on http://127.0.0.1:5060/index ..."
(sleep 1.2 && open "http://127.0.0.1:5060/index" 2>/dev/null) &
python3 WebApp.py
