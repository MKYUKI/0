"use strict";
(() => {
var exports = {};
exports.id = 170;
exports.ids = [170];
exports.modules = {

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 8163:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Fchat_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fchat_ts_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/chat.ts
var chat_namespaceObject = {};
__webpack_require__.r(chat_namespaceObject);
__webpack_require__.d(chat_namespaceObject, {
  "default": () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(6429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(7153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7305);
;// CONCATENATED MODULE: ./pages/api/chat.ts
// File: pages/api/chat.ts
// GPT-3.5 Turbo endpoint
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
/**
 * このAPIは、OpenAI GPT-3.5へリクエストし、失敗時(特に insufficient_quota)にモック応答を返す。
 */ async function handler(req, res) {
    try {
        // リクエストBody: { model, messages, temperature, max_tokens, presence_penalty, frequency_penalty } など
        const { model = "gpt-3.5-turbo", messages = [], temperature = 0.7, max_tokens = 2000, presence_penalty = 0, frequency_penalty = 0 } = req.body || {};
        // 環境変数からOpenAI APIキーを取得
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({
                error: "OPENAI_API_KEY is not set in environment."
            });
        }
        // バリデーション
        if (!Array.isArray(messages)) {
            return res.status(400).json({
                error: '"messages" must be an array of {role, content}.'
            });
        }
        // OpenAIへ送るペイロード
        const payload = {
            model,
            messages,
            temperature,
            max_tokens,
            presence_penalty,
            frequency_penalty
        };
        // OpenAI API呼び出し
        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 認証ヘッダ
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            // 失敗 => エラー詳細を取得
            const errData = await response.json();
            console.error("[OpenAI API Error]", errData);
            // もし「insufficient_quota」ならモック応答で代替
            const code = errData?.error?.code;
            if (code === "insufficient_quota") {
                console.warn("[Fallback to mock response due to insufficient_quota]");
                return res.status(200).json({
                    id: "mock-fallback",
                    object: "chat.completion.mock",
                    created: Math.floor(Date.now() / 1000),
                    choices: [
                        {
                            index: 0,
                            finish_reason: "mock_fallback",
                            message: {
                                role: "assistant",
                                content: "(OpenAI quota切れ: これはモック応答です。AIの応答ではありません。)"
                            }
                        }
                    ]
                });
            }
            // それ以外のエラー => そのまま転送
            return res.status(response.status).json({
                error: errData
            });
        }
        // 正常時 => OpenAIからのJSONをそのまま返す
        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        console.error("[OpenAI Chat API Catch Error]", err);
        return res.status(500).json({
            error: `Unexpected error in /api/chat: ${String(err)}`
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fchat&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Fchat.ts&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Fchat_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fchat_ts_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(chat_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(chat_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/chat",
        pathname: "/api/chat",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: chat_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(8163)));
module.exports = __webpack_exports__;

})();