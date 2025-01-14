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
    const [open, setOpen] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "references-dropdown",
        style: {
            textAlign: "center",
            marginTop: "1rem"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                className: "references-button",
                onClick: ()=>setOpen(!open),
                style: {
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                    border: "1px solid #ccc",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer"
                },
                children: open ? "Hide References" : "Show References"
            }),
            open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "references-content",
                style: {
                    marginTop: "1rem",
                    background: "#fafafa",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    textAlign: "left",
                    padding: "1rem",
                    maxWidth: "600px",
                    margin: "1rem auto",
                    fontSize: "0.95rem"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "Some references for AI research, quantum lines, synergy, etc."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://arxiv.org/abs/1706.03762",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    style: {
                                        color: "#0066cc",
                                        textDecoration: "underline"
                                    },
                                    children: "Attention Is All You Need (2017)"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://arxiv.org/abs/2003.08934",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    style: {
                                        color: "#0066cc",
                                        textDecoration: "underline"
                                    },
                                    children: "NeRF (2020)"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://arxiv.org/abs/2106.01345",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    style: {
                                        color: "#0066cc",
                                        textDecoration: "underline"
                                    },
                                    children: "Scaling Laws"
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