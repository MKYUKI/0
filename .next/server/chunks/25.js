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


// 例: GitHub, Googleなどを使う場合
// import GitHubProvider from "next-auth/providers/github"
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
                // ユーザー認証ロジック（例）
                // ここでDB照合等を行い、失敗なら null, 成功なら userオブジェクトを返す
                // userには "id" を含める: { id, name, ... }
                if (!credentials?.username || !credentials.password) {
                    return null;
                }
                // 仮の認証例: ユーザーが "test" / "pass" ならOK
                if (credentials.username === "test" && credentials.password === "pass") {
                    // IDを含むユーザーオブジェクトを返す
                    return {
                        id: "12345",
                        name: "Test User"
                    };
                }
                // 認証失敗
                return null;
            }
        })
    ],
    // JWT/Sessionコールバック
    callbacks: {
        async jwt ({ token, user }) {
            // ログイン成功時(userが存在する時)に token.id をセット
            if (user?.id) {
                token.id = user.id;
            }
            return token;
        },
        async session ({ session, token }) {
            // token.id を session.user.id にコピー
            if (token?.id) {
                session.user = session.user || {};
                // <= ここで '=' が抜けていた可能性がある
                //    正しくは session.user.id = token.id as string
                session.user.id = token.id;
            }
            return session;
        }
    },
    // optional
    session: {
        strategy: "jwt"
    },
    // 必要に応じてsecretなど
    secret: process.env.NEXTAUTH_SECRET
};
// NextAuth実行
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));


/***/ })

};
;