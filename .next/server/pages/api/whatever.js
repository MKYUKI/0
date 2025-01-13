"use strict";
(() => {
var exports = {};
exports.id = 83;
exports.ids = [83];
exports.modules = {

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

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

/***/ 689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Fwhatever_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fwhatever_ts_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/whatever.ts
var whatever_namespaceObject = {};
__webpack_require__.r(whatever_namespaceObject);
__webpack_require__.d(whatever_namespaceObject, {
  "default": () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(6429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(7153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7305);
// EXTERNAL MODULE: external "next-auth"
var external_next_auth_ = __webpack_require__(3227);
// EXTERNAL MODULE: ./pages/api/auth/[...nextauth].ts
var _nextauth_ = __webpack_require__(9980);
;// CONCATENATED MODULE: ./pages/api/whatever.ts
// pages/api/whatever.ts


async function handler(req, res) {
    const session = await (0,external_next_auth_.getServerSession)(req, res, _nextauth_.authOptions);
    if (!session) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }
    return res.status(200).json({
        message: "OK",
        user: session.user
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fwhatever&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Fwhatever.ts&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Fwhatever_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fwhatever_ts_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(whatever_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(whatever_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/whatever",
        pathname: "/api/whatever",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: whatever_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172,980], () => (__webpack_exec__(689)));
module.exports = __webpack_exports__;

})();