#!/bin/bash
# Double-click this file in macOS Finder to launch the Healthy Mode AI Nutrition Server & open your browser!
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

(sleep 1.2 && open "http://127.0.0.1:5060/index") &

python3 WebApp.py
