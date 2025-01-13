"use strict";
exports.id = 248;
exports.ids = [248];
exports.modules = {

/***/ 9248:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ReferencesDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
// components/ReferencesDropdown.tsx


function ReferencesDropdown() {
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            marginTop: "2rem",
            textAlign: "center"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                style: {
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer"
                },
                onClick: ()=>setOpen(!open),
                children: open ? "Hide References" : "Show References"
            }),
            open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    marginTop: "1rem",
                    background: "#fefefe",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    textAlign: "left",
                    padding: "1rem",
                    maxWidth: "600px",
                    margin: "1rem auto",
                    fontSize: "0.95rem"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        children: "Key References"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://arxiv.org/abs/1706.03762",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Attention Is All You Need (2017)"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://arxiv.org/abs/2106.01345",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Scaling Laws for Neural Language Models"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://arxiv.org/abs/2003.08934",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "NeRF: Representing Scenes as Neural Radiance Fields"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://arxiv.org/abs/2112.10752",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Latent Diffusion Models"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://arxiv.org/abs/1701.06538",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Sparsely-Gated Mixture-of-Experts"
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ })

};
;