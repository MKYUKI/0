"use strict";
(() => {
var exports = {};
exports.id = 960;
exports.ids = [960];
exports.modules = {

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 7518:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Fdummy_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fdummy_ts_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/dummy.ts
var dummy_namespaceObject = {};
__webpack_require__.r(dummy_namespaceObject);
__webpack_require__.d(dummy_namespaceObject, {
  "default": () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(6429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(7153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7305);
;// CONCATENATED MODULE: external "openai"
const external_openai_namespaceObject = require("openai");
;// CONCATENATED MODULE: ./pages/api/dummy.ts
// pages/api/dummy.ts
 // openai v4系
// ↑ "import { OpenAIApi } from 'openai'" では無いので要注意
async function handler(req, res) {
    // openai client
    const openai = new external_openai_namespaceObject.OpenAI({
        apiKey: process.env.OPENAI_API_KEY ?? ""
    });
    // 例: POST で promptを受け取ってChatCompletion
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Only POST allowed"
        });
    }
    const { prompt } = req.body || {};
    if (!prompt) {
        return res.status(400).json({
            error: "Missing prompt"
        });
    }
    try {
        const chatResp = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        const content = chatResp.choices[0]?.message?.content || "(no response)";
        return res.status(200).json({
            content
        });
    } catch (err) {
        console.error("OpenAI error:", err);
        return res.status(500).json({
            error: err.message || "OpenAI error"
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fdummy&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Fdummy.ts&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Fdummy_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fdummy_ts_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(dummy_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(dummy_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/dummy",
        pathname: "/api/dummy",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: dummy_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(7518)));
module.exports = __webpack_exports__;

})();