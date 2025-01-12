# app.py
from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def home():
    # index.html を返却
    return send_from_directory('.', 'index.html')

@app.route('/pages/<path:filename>')
def static_pages(filename):
    # 例: /pages/page2.html などを返す
    filepath = os.path.join('.', filename)
    if os.path.exists(filepath):
        return send_from_directory('.', filename)
    else:
        return "Not Found", 404

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "OK", "message": "Flask server is running"})

@app.route('/api/echo', methods=['POST'])
def echo_api():
    # 送られたJSONをそのまま返すサンプル
    data = request.json or {}
    return jsonify({"receivedData": data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
