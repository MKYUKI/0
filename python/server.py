# server.py
from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    # 6ページのうちの "index.html" を返す例 (静的ファイルを返却)
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    # 6ページ + CSSファイルをまとめて返却できるようにする静的ルート
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    else:
        return "File Not Found", 404

# 何らかのAPIサンプル (POST, GET)
@app.route('/api/data', methods=['GET','POST'])
def get_data():
    if request.method=='POST':
        # 例: JSON受け取って何か処理
        data = request.json
        return jsonify({"msg":"Received your data", "youSent": data})
    else:
        return jsonify({"msg":"Hello from Flask server"})

if __name__ == '__main__':
    # 例: ポート5000番で立ち上げる
    app.run(host='0.0.0.0', port=5000, debug=True)
