# File: 0/python/proxy.py
import os
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Deepseekエンドポイント(仮)
DEEPSEEK_API_URL = "https://platform.deepseek.com/api/v1/chat"
DEEPSEEK_MODEL = "deepseek-R1-latest"
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY","sk-2e5bb6e7bc214e98b3d5721eb386982b")

# Java fallback => localhost:8080
JAVA_MOCK_URL = "http://localhost:8080/deepseek/chat"

@app.route('/deepseek/chat', methods=['POST'])
def handle_chat():
    try:
        data = request.get_json(force=True)
        messages = data.get("messages", [])
        model = data.get("model", DEEPSEEK_MODEL)

        print("[Flask] messages=", messages, " model=", model, flush=True)

        # 1) Deepseek
        dresp = call_deepseek(model, messages)
        if dresp["ok"]:
            return jsonify({"status":"success","answer":dresp["answer"]}),200

        # 2) fallback => Java
        fallback = call_java_mock(model, messages)
        return jsonify({"status":"fallback","answer":fallback}),200

    except Exception as e:
        print("[Flask Error]", e, flush=True)
        return jsonify({"status":"error","message":str(e)}),500

def call_deepseek(model, messages):
    try:
        payload = {"model": model, "messages": messages}
        headers = {
            "Content-Type":"application/json",
            "Authorization":f"Bearer {DEEPSEEK_API_KEY}"
        }
        r = requests.post(DEEPSEEK_API_URL, json=payload, headers=headers, timeout=30)
        r.raise_for_status()
        js = r.json()
        print("[Deepseek Resp]", js, flush=True)

        ans = "(no content)"
        if "choices" in js and len(js["choices"])>0:
            c0= js["choices"][0]
            if "message" in c0 and "content" in c0["message"]:
                ans = c0["message"]["content"]
        return {"ok":True,"answer":ans}

    except Exception as e:
        print("[Deepseek error]", e, flush=True)
        return {"ok":False}

def call_java_mock(model, messages):
    try:
        payload={"model":model,"messages":messages}
        r = requests.post(JAVA_MOCK_URL, json=payload, timeout=10)
        r.raise_for_status()
        data = r.json()
        return data.get("content","(mock fallback no content)")
    except Exception as e:
        print("[Java mock error]", e, flush=True)
        return "(mock fallback also failed)"

if __name__=="__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
