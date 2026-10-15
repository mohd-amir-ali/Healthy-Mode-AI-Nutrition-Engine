import os
import json
import mimetypes
from urllib.parse import urlparse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from nutrition_ai_engine import get_engine_payload, compute_dish_nutrition_and_score

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class HealthyModeWebHandler(BaseHTTPRequestHandler):
    """Zero-dependency HTTP server on port 5060 serving the Healthy Mode & Subscriptions Platform."""

    def log_message(self, format, *args):
        print(f"[HealthyMode-Server] {self.address_string()} - {format % args}")

    def _send_bytes(self, data: bytes, content_type: str, status: int = 200):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _send_json(self, obj: dict, status: int = 200):
        raw = json.dumps(obj).encode("utf-8")
        self._send_bytes(raw, "application/json; charset=utf-8", status)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path in ("/", "/index", "/index.html", "/Launch_HealthyMode_App.html"):
            html_path = os.path.join(BASE_DIR, "index.html")
            with open(html_path, "rb") as f:
                self._send_bytes(f.read(), "text/html; charset=utf-8")
            return

        if path == "/api/payload":
            self._send_json(get_engine_payload())
            return

        rel = path.lstrip("/")
        full_path = os.path.normpath(os.path.join(BASE_DIR, rel))
        if full_path.startswith(BASE_DIR) and os.path.isfile(full_path):
            mime, _ = mimetypes.guess_type(full_path)
            with open(full_path, "rb") as f:
                self._send_bytes(f.read(), mime or "application/octet-stream")
            return

        html_path = os.path.join(BASE_DIR, "index.html")
        with open(html_path, "rb") as f:
            self._send_bytes(f.read(), "text/html; charset=utf-8")

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(length).decode("utf-8") if length else "{}"

        if path == "/api/calculate":
            try:
                body = json.loads(raw_body)
                ing_list = body.get("ingredients", [])
                method_key = body.get("cooking_method", "grilled")
                res = compute_dish_nutrition_and_score(ing_list, method_key)
                self._send_json({"status": "ok", "nutrition": res})
            except Exception as e:
                self._send_json({"status": "error", "message": str(e)}, 400)
            return

        self._send_json({"status": "ok"})


def run_server(host: str = "127.0.0.1", port: int = 5060):
    print("=" * 76)
    print("  HEALTHY MODE // AI NUTRITIONAL SCORING & SUBSCRIPTION ENGINE")
    print("=" * 76)
    print("  [Algorithm]   35% Protein + 20% Carb GI + 15% Fibre + 15% Ingredient + 15% Cooking")
    print("  [Database]    ICMR-NIN / IFCT Standardized Indian Food Composition Tables")
    print(f"  [Web App]     Running at http://{host}:{port}/index")
    print("=" * 76)

    server = ThreadingHTTPServer((host, port), HealthyModeWebHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down Healthy Mode server...")
        server.server_close()


if __name__ == "__main__":
    run_server()
