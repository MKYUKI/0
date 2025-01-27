"use strict";
exports.id = 25;
exports.ids = [25];
exports.modules = {

/***/ 9025:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authOptions: () => (/* binding */ authOptions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3227);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7449);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);
// File: pages/api/auth/[...nextauth].ts


const authOptions = {
    providers: [
        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials, req) {
                // ... 認証ロジック ...
                // 成功時 => userオブジェクト返却
                return {
                    id: "12345",
                    name: "TestUser"
                };
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            // userが存在するなら tokenにidを保存
            if (user?.id) {
                token.id = user.id;
            }
            return token;
        },
        async session ({ session, token }) {
            // token.id を session.user.id にコピー
            if (token?.id) {
                session.user = session.user || {};
                session.user.id = token.id;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));


/***/ })

};
;