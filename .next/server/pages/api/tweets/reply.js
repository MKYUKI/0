"use strict";
(() => {
var exports = {};
exports.id = 18;
exports.ids = [18];
exports.modules = {

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 5557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Ftweets_2Freply_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Ftweets_2Freply_ts_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/tweets/reply.ts
var reply_namespaceObject = {};
__webpack_require__.r(reply_namespaceObject);
__webpack_require__.d(reply_namespaceObject, {
  "default": () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(6429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(7153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7305);
;// CONCATENATED MODULE: ./pages/api/tweets/reply.ts
// pages/api/tweets/reply.ts
// ========== 認証関連コメントアウト ==========
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]";
// Next.jsのAPIルート用型をimport
async function handler(req, res) {
    // ========== 認証呼び出し部分もコメントアウト ==========
    // const session = await getServerSession(req, res, authOptions);
    // if (!session) {
    //   return res.status(401).json({ error: "Not logged in" });
    // }
    // 仮のレスポンス(認証機能無効化中なので誰でもOK)
    return res.status(200).json({
        message: "Auth is temporarily disabled. No errors should occur now."
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Ftweets%2Freply&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Ftweets%2Freply.ts&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Ftweets_2Freply_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Ftweets_2Freply_ts_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(reply_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(reply_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/tweets/reply",
        pathname: "/api/tweets/reply",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: reply_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(5557)));
module.exports = __webpack_exports__;

})();