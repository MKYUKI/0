"use strict";
(() => {
var exports = {};
exports.id = 397;
exports.ids = [397];
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

/***/ 9328:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Ftweets_2F_5BtweetId_5D_2Freply_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Ftweets_2F_5BtweetId_5D_2Freply_ts_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/tweets/[tweetId]/reply.ts
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
// EXTERNAL MODULE: external "next-auth/next"
var next_ = __webpack_require__(2113);
// EXTERNAL MODULE: ./pages/api/auth/[...nextauth].ts
var _nextauth_ = __webpack_require__(9025);
;// CONCATENATED MODULE: ./pages/api/tweets/[tweetId]/reply.ts
// pages/api/tweets/[tweetId]/reply.ts
//import prisma from "../../../../lib/prisma";


async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    const session = await (0,next_.getServerSession)(req, res, _nextauth_.authOptions);
    if (!session) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    const { tweetId } = req.query;
    const { content } = req.body;
    if (!content?.trim()) return res.status(400).json({
        error: "No content"
    });
    try {
    // const newReply = await prisma.reply.create({
    //   data:{
    //    content,
    //    tweetId: String(tweetId),
    //   userId: (session.user as any).id
    //  }
    // });
    // return res.json(newReply);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Ftweets%2F%5BtweetId%5D%2Freply&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Ftweets%2F%5BtweetId%5D%2Freply.ts&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Ftweets_2F_5BtweetId_5D_2Freply_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Ftweets_2F_5BtweetId_5D_2Freply_ts_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(reply_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(reply_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/tweets/[tweetId]/reply",
        pathname: "/api/tweets/[tweetId]/reply",
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
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172,25], () => (__webpack_exec__(9328)));
module.exports = __webpack_exports__;

})();