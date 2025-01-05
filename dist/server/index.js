"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/index.ts
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
async function main() {
    // dev or production
    const dev = process.env.NODE_ENV !== "production";
    // Next.js アプリ
    const app = (0, next_1.default)({ dev });
    const handle = app.getRequestHandler();
    // Next.js 準備
    await app.prepare();
    // get-port v6.x は ESM → dynamic import
    const { default: getPort } = await import("get-port");
    // たとえば 3006〜3016 辺りを候補に
    const portCandidates = [];
    for (let p = 3006; p <= 3016; p++) {
        portCandidates.push(p);
    }
    // 候補の中で空いているポートを自動で取得
    const port = await getPort({ port: portCandidates });
    console.log("Chosen port is:", port);
    // Express サーバ起動
    const server = (0, express_1.default)();
    // Next.js ルーティング
    server.all("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => {
        console.log(`> Custom server ready on http://localhost:${port}`);
    });
}
// 実行
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
