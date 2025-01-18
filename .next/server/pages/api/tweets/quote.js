"use strict";
(() => {
var exports = {};
exports.id = 269;
exports.ids = [269];
exports.modules = {

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 2113:
/***/ ((module) => {

module.exports = require("next-auth/next");

/***/ }),

/***/ 7449:
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ 3598:
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 580:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Ftweets_2Fquote_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Ftweets_2Fquote_ts_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/tweets/quote.ts
var quote_namespaceObject = {};
__webpack_require__.r(quote_namespaceObject);
__webpack_require__.d(quote_namespaceObject, {
  "default": () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(6429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(7153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7305);
// EXTERNAL MODULE: external "next-auth/next"
var next_ = __webpack_require__(2113);
// EXTERNAL MODULE: ./pages/api/auth/[...nextauth].ts
var _nextauth_ = __webpack_require__(9025);
;// CONCATENATED MODULE: ./pages/api/tweets/quote.ts
// pages/api/tweets/quote.ts


async function handler(req, res) {
    // セッションチェック
    const session = await (0,next_.getServerSession)(req, res, _nextauth_.authOptions);
    if (!session?.user?.email) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    // メソッド確認
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    // 送信データ
    const { tweetId, comment } = req.body;
    if (!tweetId) {
        return res.status(400).json({
            message: "tweetId is required"
        });
    }
    // 例: Prismaを呼び出していた箇所は削除/コメントアウト
    // import prisma from "../../../lib/prisma";
    // const created = await prisma.quote.create({
    //   data: { tweetId, comment, userId: (session.user as any).id }
    // });
    // ここでは単純に成功メッセージのみを返す例
    return res.status(200).json({
        message: "POST /api/tweets/quote success"
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Ftweets%2Fquote&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Ftweets%2Fquote.ts&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Ftweets_2Fquote_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Ftweets_2Fquote_ts_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(quote_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(quote_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/tweets/quote",
        pathname: "/api/tweets/quote",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: quote_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172,25], () => (__webpack_exec__(580)));
module.exports = __webpack_exports__;

})();