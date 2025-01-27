# File: python-proxy/proxy.py
import os
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "sk-fake")
# Deepseek API base
DEEPSEEK_API_URL = "https://platform.deepseek.com/api/v1/chat"

# 上位モデル候補
# 1) deepseek-reasoner (newly released, advanced)
# 2) deepseek-R1-latest
# 3) deepseek-v3-latest
MODEL_CANDIDATES = [
    "deepseek-reasoner",
    "deepseek-R1-latest",
    "deepseek-v3-latest",
]

@app.route('/deepseek/chat', methods=['POST'])
def handle_deepseek_chat():
    """
    Next.js => /api/chat => (このFlask) => DeepSeek R1 / reasoner / etc.
    1) 順番に試して200が返ればOK
    2) 全て403など失敗ならモック応答
    """
    try:
        body = request.get_json(force=True) or {}
        # model, messages, temperature
        messages = body.get("messages", [])
        # ユーザーが温度パラメータを指定できるように
        temperature = body.get("temperature", 0.7)

        for model_name in MODEL_CANDIDATES:
            ok, ans = call_deepseek_api(model_name, messages, temperature)
            if ok:
                return jsonify({
                    "status": "success",
                    "model": model_name,
                    "temperature": temperature,
                    "answer": ans
                }), 200

        # すべて失敗 => モック
        return jsonify({
            "status": "mock",
            "answer": "MOCK fallback: All Deepseek calls returned 403 or error."
        }), 200

    except Exception as e:
        print("[Deepseek Proxy Exception]", e, flush=True)
        return jsonify({"status":"error","message":str(e)}), 500

def call_deepseek_api(model_name, messages, temperature):
    """
    DeepSeekに問い合わせ: /v1/chat
    成功: (True, answer)
    失敗: (False, reason)
    """
    try:
        payload = {
            "model": model_name,
            "temperature": temperature,   # DeepSeek docs: The Temperature Parameter
            "messages": messages
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
        }
        resp = requests.post(
            DEEPSEEK_API_URL,
            json=payload,
            headers=headers,
            timeout=30
        )
        resp.raise_for_status()  # 200以外 -> HTTPError
        data = resp.json()

        # DeepSeek => data["choices"][0]["message"]["content"] 形式
        ans = "(no content)"
        if "choices" in data and len(data["choices"])>0:
            choice = data["choices"][0]
            if "message" in choice and "content" in choice["message"]:
                ans = choice["message"]["content"]

        return True, ans

    except requests.exceptions.HTTPError as http_err:
        print(f"[call_deepseek_api Error {model_name}] {http_err}", flush=True)
        return False, str(http_err)
    except Exception as e:
        print(f"[call_deepseek_api Exception {model_name}] {e}", flush=True)
        return False, str(e)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
