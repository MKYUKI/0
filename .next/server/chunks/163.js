exports.id = 163;
exports.ids = [163];
exports.modules = {

/***/ 3754:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ChatGPTInterface)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
// =====================================================
// File: components/ChatGPTInterface.tsx
// =====================================================


function MessageBubble({ role, content }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `message-bubble ${role}`,
        style: {
            margin: "0.4rem 0"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                style: {
                    textTransform: "capitalize"
                },
                children: [
                    role,
                    ":"
                ]
            }),
            " ",
            content
        ]
    });
}
function ChatGPTInterface({ isGlass }) {
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [userInput, setUserInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const bottomRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages
    ]);
    // ファイルアップロード
    const handleFileUpload = async (files)=>{
        if (!files || !files[0]) return;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e)=>{
            const base64 = e.target?.result;
            if (!base64 || typeof base64 !== "string") return;
            const fileMsg = {
                role: "user",
                content: `File uploaded: ${file.name} (size=${file.size} bytes)`
            };
            setMessages((prev)=>[
                    ...prev,
                    fileMsg
                ]);
        };
        reader.readAsDataURL(file);
    };
    // 送信
    const handleSend = async ()=>{
        if (!userInput.trim()) return;
        // ユーザー発言
        const userMsg = {
            role: "user",
            content: userInput.trim()
        };
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        setUserInput("");
        setIsLoading(true);
        try {
            // ダミーAPI例
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        ...messages,
                        userMsg
                    ]
                })
            });
            const data = await res.json();
            const text = data?.choices?.[0]?.message?.content || "";
            // テキストを1文字ずつ表示
            let buffer = "";
            let i = 0;
            const intervalId = setInterval(()=>{
                if (i < text.length) {
                    buffer += text.charAt(i++);
                    setMessages((prev)=>{
                        const last = prev[prev.length - 1];
                        if (last && last.role === "assistant") {
                            // すでにアシスタントメッセージがあれば差し替え
                            return [
                                ...prev.slice(0, -1),
                                {
                                    role: "assistant",
                                    content: buffer
                                }
                            ];
                        } else {
                            // 新規追加
                            return [
                                ...prev,
                                {
                                    role: "assistant",
                                    content: buffer
                                }
                            ];
                        }
                    });
                } else {
                    clearInterval(intervalId);
                    setIsLoading(false);
                }
            }, 25);
        } catch (err) {
            console.error("Error calling /api/chat:", err);
            setIsLoading(false);
        }
    };
    // コンテナスタイル
    const baseContainer = {
        margin: "0 auto",
        width: "90%",
        maxWidth: "600px",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        color: "#fff",
        position: "relative",
        zIndex: 10,
        overflow: "hidden"
    };
    // 背景(黒半透明 or transparent)
    const normalBg = {
        background: "rgba(0,0,0,0.4)"
    };
    const glassBg = {
        background: "transparent"
    };
    const containerStyle = {
        ...baseContainer,
        ...isGlass ? glassBg : normalBg
    };
    const topAreaStyle = {
        flex: 1,
        overflowY: "auto",
        padding: "1rem"
    };
    const bottomAreaStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "0.75rem",
        borderTop: "1px solid rgba(255,255,255,0.3)",
        background: isGlass ? "transparent" : "rgba(0,0,0,0.6)"
    };
    const fileRowStyle = {
        marginBottom: "0.5rem"
    };
    const textAreaStyle = {
        resize: "none",
        border: isGlass ? "1px solid rgba(255,255,255,0.4)" : "1px solid #444",
        borderRadius: "4px",
        padding: "0.75rem",
        fontSize: "0.95rem",
        fontFamily: "sans-serif",
        background: isGlass ? "transparent" : "#222",
        color: "#fff",
        width: "100%",
        marginBottom: "0.5rem"
    };
    const sendButtonStyle = {
        background: "#31a37d",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "0.6rem 1.2rem",
        fontSize: "1rem",
        cursor: "pointer",
        alignSelf: "flex-end"
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: containerStyle,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: topAreaStyle,
                children: [
                    messages.map((m, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MessageBubble, {
                            role: m.role,
                            content: m.content
                        }, idx)),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        ref: bottomRef
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: bottomAreaStyle,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: fileRowStyle,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "file",
                            onChange: (e)=>handleFileUpload(e.target.files),
                            style: {
                                color: "#fff",
                                background: "transparent"
                            }
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                        style: textAreaStyle,
                        placeholder: "メッセージを入力...",
                        value: userInput,
                        onChange: (e)=>setUserInput(e.target.value),
                        disabled: isLoading
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        style: sendButtonStyle,
                        onClick: handleSend,
                        disabled: isLoading || !userInput.trim(),
                        children: isLoading ? "..." : "Send"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 4178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MyApp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_ChatGPTInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3754);
// ===============================================
// File: pages/_app.tsx
// ===============================================







// NavBarコンポーネント
function NavBar() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
        className: "navbar",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "nav-left",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/",
                        className: "nav-link",
                        children: "Home"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/aichat",
                        className: "nav-link",
                        children: "AI Chat"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/art",
                        className: "nav-link",
                        children: "Art"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/contact",
                        className: "nav-link",
                        children: "Contact"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "nav-right",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "search-container",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "text",
                            placeholder: "チャットで質問を入力..."
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "search-icon"
                        })
                    ]
                })
            })
        ]
    });
}
// 簡易エラーバウンダリー
class ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error:", error, info);
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    color: "red",
                    textAlign: "center",
                    marginTop: "50px"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        children: "Something went wrong."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "Please reload or contact support."
                    })
                ]
            });
        }
        return this.props.children;
    }
}
function MyApp({ Component, pageProps }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        console.log("MyApp mounted - client side.");
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ErrorBoundary, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "GPT-4 Universe"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "description",
                        content: "Cosmic illusions, multi-galaxy swirl, and more."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                id: "app-wrapper",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NavBar, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                        id: "main-content",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                            ...pageProps
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
                        id: "chat-footer",
                        children: router.pathname !== "/" && router.pathname !== "/art" && router.pathname !== "/aichat" && router.pathname !== "/contact" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ChatGPTInterface__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {})
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 3162:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6859);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);
// pages/_document.tsx


class MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {
    static async getInitialProps(ctx) {
        const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);
        return {
            ...initialProps
        };
    }
    render() {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {
            lang: "ja",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            charSet: "UTF-8"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "description",
                            content: "宇宙のシミュレーションで歴史に残るホーム画面"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                            rel: "icon",
                            href: "/favicon.ico"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}),
                        "     ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {})
                    ]
                })
            ]
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyDocument);


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ })

};
;