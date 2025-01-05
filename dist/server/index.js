"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/index.ts
const express_1 = __importDefault(require("express"));
const get_port_1 = __importDefault(require("get-port"));
const defaultPort = 3006;
(async () => {
    const port = await (0, get_port_1.default)({ port: defaultPort });
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.send(`> Custom server is running on port ${port}`);
    });
    app.listen(port, () => {
        console.log(`> Custom server ready on http://localhost:${port}`);
    });
})();
