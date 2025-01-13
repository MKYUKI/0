"use strict";
exports.id = 980;
exports.ids = [980];
exports.modules = {

/***/ 9980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authOptions: () => (/* binding */ authOptions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3227);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3598);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7449);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__);
// pages/api/auth/[...nextauth].ts



const authOptions = {
    providers: [
        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2___default()({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                // ここでDB確認など
                if (credentials?.email === "test@example.com" && credentials.password === "testpass") {
                    return {
                        id: "1",
                        name: "TestUser",
                        email: "test@example.com"
                    };
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // pages: { signIn: "/auth/signin", ... },
    callbacks: {
        async jwt ({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session ({ session, token }) {
            if (token.user) session.user = token.user;
            return session;
        }
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));


/***/ })

};
;