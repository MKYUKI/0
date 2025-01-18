"use strict";
(() => {
var exports = {};
exports.id = 242;
exports.ids = [242];
exports.modules = {

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Ftweets_2Fmention_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Ftweets_2Fmention_ts_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/tweets/mention.ts
var mention_namespaceObject = {};
__webpack_require__.r(mention_namespaceObject);
__webpack_require__.d(mention_namespaceObject, {
  "default": () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(6429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(7153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7305);
;// CONCATENATED MODULE: ./pages/api/tweets/mention.ts
// pages/api/tweets/mention.ts
// import prisma from "../../../lib/prisma"; // ← 使わないならコメントアウト
// メンションパターン: @ + アルファベット数字_ にマッチ (例: @John123)
const mentionRegex = /@([a-zA-Z0-9_]+)/g;
async function handler(req, res) {
    // メソッドをチェック
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }
    // content を取得
    const { content } = req.body;
    if (!content || typeof content !== "string") {
        return res.status(400).json({
            message: "Invalid content"
        });
    }
    // メンション抽出
    const matches = [
        ...content.matchAll(mentionRegex)
    ];
    // group1 部分(@foo の "foo")を取得
    const mentionedUsernames = matches.map((m)=>m[1]);
    // 重複除去
    const uniqueUsernames = Array.from(new Set(mentionedUsernames));
    // メンション0件なら何もしない
    if (uniqueUsernames.length === 0) {
        return res.status(200).json({
            message: "No mentions found"
        });
    }
    // ===== ここから先はコメントアウト (Prisma使わないなら削除でもOK) =====
    /*
  // const usersToNotify = await prisma.user.findMany({
  //   where: {
  //     username: { in: uniqueUsernames },
  //   },
  // });

  // for (const user of usersToNotify) {
  //   await prisma.notification.create({
  //     data: {
  //       message: `You were mentioned: "${content.slice(0, 50)}..."`,
  //       userId: user.id,
  //     },
  //   });
  // }

  // return res.status(200).json({
  //   message: "Mention handled successfully",
  //   notifiedUserCount: usersToNotify.length,
  // });
  */ // とりあえず、メンションされたユーザー一覧だけ返す
    return res.status(200).json({
        message: "Mention handled successfully (dummy)",
        mentioned: uniqueUsernames
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Ftweets%2Fmention&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Ftweets%2Fmention.ts&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Ftweets_2Fmention_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Ftweets_2Fmention_ts_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(mention_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(mention_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/tweets/mention",
        pathname: "/api/tweets/mention",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: mention_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(574)));
module.exports = __webpack_exports__;

})();