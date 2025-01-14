exports.id = 191;
exports.ids = [191];
exports.modules = {

/***/ 3191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MyApp)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/next/script.js
var script = __webpack_require__(4298);
var script_default = /*#__PURE__*/__webpack_require__.n(script);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./public/css/globalQuantum.css
var globalQuantum = __webpack_require__(5677);
// EXTERNAL MODULE: ./public/css/kaleidoBase.css
var kaleidoBase = __webpack_require__(4355);
// EXTERNAL MODULE: ./public/css/page1.css
var page1 = __webpack_require__(9710);
// EXTERNAL MODULE: ./public/css/page2.css
var page2 = __webpack_require__(1141);
// EXTERNAL MODULE: ./public/css/page3.css
var page3 = __webpack_require__(401);
// EXTERNAL MODULE: ./public/css/page4.css
var page4 = __webpack_require__(8590);
// EXTERNAL MODULE: ./public/css/page5.css
var page5 = __webpack_require__(2238);
// EXTERNAL MODULE: ./public/css/page6.css
var page6 = __webpack_require__(9055);
;// CONCATENATED MODULE: ./components/ChatGPTInterface.tsx
// components/ChatGPTInterface.tsx


function MessageBubble({ role, content }) {
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: `message-bubble ${role}`,
        children: content
    });
}
function ChatGPTInterface() {
    const [messages, setMessages] = (0,external_react_.useState)([]);
    const [userInput, setUserInput] = (0,external_react_.useState)("");
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    const bottomRef = (0,external_react_.useRef)(null);
    const scrollToBottom = ()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0,external_react_.useEffect)(()=>{
        scrollToBottom();
    }, [
        messages
    ]);
    const handleSend = async ()=>{
        if (!userInput.trim()) return;
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
            let buffer = "";
            let i = 0;
            const intervalID = setInterval(()=>{
                if (i < text.length) {
                    buffer += text.charAt(i++);
                    setMessages((prev)=>{
                        const last = prev[prev.length - 1];
                        if (last && last.role === "assistant") {
                            return [
                                ...prev.slice(0, -1),
                                {
                                    role: "assistant",
                                    content: buffer
                                }
                            ];
                        } else {
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
                    clearInterval(intervalID);
                    setIsLoading(false);
                }
            }, 20);
        } catch (err) {
            console.error("Error calling /api/chat:", err);
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "chat-container",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "messages-window",
                children: [
                    messages.map((m, idx)=>/*#__PURE__*/ jsx_runtime.jsx(MessageBubble, {
                            role: m.role,
                            content: m.content
                        }, idx)),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        ref: bottomRef
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "input-container",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("textarea", {
                        placeholder: "Send a message...",
                        value: userInput,
                        onChange: (e)=>setUserInput(e.target.value),
                        disabled: isLoading
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                        onClick: handleSend,
                        disabled: isLoading || !userInput.trim(),
                        children: isLoading ? "Thinking..." : "Send"
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./pages/_app.tsx
// pages/_app.tsx





// ★ グローバルCSSをまとめてインポート








// ChatUI

// シンプルナビバー
function NavBar() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("nav", {
        style: {
            textAlign: "center",
            padding: "0.6rem",
            background: "#222"
        },
        children: [
            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                href: "/",
                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                    style: {
                        color: "#fff",
                        margin: "0 8px",
                        cursor: "pointer"
                    },
                    children: "Page1"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                href: "/page2",
                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                    style: {
                        color: "#fff",
                        margin: "0 8px",
                        cursor: "pointer"
                    },
                    children: "Page2"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                href: "/page3",
                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                    style: {
                        color: "#fff",
                        margin: "0 8px",
                        cursor: "pointer"
                    },
                    children: "Page3"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                href: "/page4",
                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                    style: {
                        color: "#fff",
                        margin: "0 8px",
                        cursor: "pointer"
                    },
                    children: "Page4"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                href: "/page5",
                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                    style: {
                        color: "#fff",
                        margin: "0 8px",
                        cursor: "pointer"
                    },
                    children: "Page5"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                href: "/page6",
                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                    style: {
                        color: "#fff",
                        margin: "0 8px",
                        cursor: "pointer"
                    },
                    children: "Page6"
                })
            })
        ]
    });
}
// AttentionPopup コンポーネント（正しく JSX を return する）
function AttentionPopup() {
    const [open, setOpen] = external_react_default().useState(false);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        style: {
            position: "fixed",
            top: "60px",
            right: "1rem",
            zIndex: 999
        },
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("button", {
                style: {
                    background: "#444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer"
                },
                onClick: ()=>setOpen(!open),
                children: open ? "Hide Transformer" : "Show Transformer"
            }),
            open && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: {
                    marginTop: "0.5rem",
                    background: "rgba(0,0,0,0.85)",
                    color: "#fff",
                    padding: "1rem",
                    borderRadius: "8px",
                    width: "300px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("h4", {
                        children: "Attention Is All You Need (2017)"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                        style: {
                            fontSize: "0.9rem",
                            lineHeight: "1.4"
                        },
                        children: [
                            "Visualize multi-head attention or see how Q-K-V are computed in real-time.",
                            /*#__PURE__*/ jsx_runtime.jsx("br", {}),
                            /*#__PURE__*/ jsx_runtime.jsx("a", {
                                href: "https://arxiv.org/abs/1706.03762",
                                target: "_blank",
                                rel: "noreferrer",
                                style: {
                                    color: "#66ffcc",
                                    textDecoration: "underline"
                                },
                                children: "[arXiv:1706.03762]"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function MyApp({ Component, pageProps }) {
    (0,external_react_.useEffect)(()=>{
    // 例: クライアントサイドでJSを動的に読み込むなら:
    // import('../public/js/starsAnim.js')
    // import('../public/js/waveAnim.js')
    // import('../public/js/quantum3D.js')
    // ここでは <Script> で読み込むのでコメントアウト
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "0 - Ultimate GPT Clone"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "description",
                        content: "0: GPT-4 site with unstoppable illusions, quantum lines, advanced synergy."
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx((script_default()), {
                src: "/js/quantum3D.js",
                strategy: "beforeInteractive"
            }),
            /*#__PURE__*/ jsx_runtime.jsx((script_default()), {
                src: "/js/starsAnim.js",
                strategy: "beforeInteractive"
            }),
            /*#__PURE__*/ jsx_runtime.jsx((script_default()), {
                src: "/js/waveAnim.js",
                strategy: "beforeInteractive"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    zIndex: 0
                },
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("canvas", {
                        id: "bg-canvas",
                        className: "bg-canvas-layer"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("canvas", {
                        id: "stars-canvas",
                        className: "bg-canvas-layer"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("canvas", {
                        id: "wave-canvas",
                        className: "bg-canvas-layer"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: {
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100vh"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(NavBar, {}),
                    /*#__PURE__*/ jsx_runtime.jsx(AttentionPopup, {}),
                    /*#__PURE__*/ jsx_runtime.jsx(Component, {
                        ...pageProps
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx("footer", {
                style: {
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background: "#f0f0f0",
                    boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
                    zIndex: 10
                },
                children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                    style: {
                        maxWidth: "1400px",
                        margin: "0 auto"
                    },
                    children: /*#__PURE__*/ jsx_runtime.jsx(ChatGPTInterface, {})
                })
            })
        ]
    });
}


/***/ }),

/***/ 5677:
/***/ (() => {



/***/ }),

/***/ 4355:
/***/ (() => {



/***/ }),

/***/ 9710:
/***/ (() => {



/***/ }),

/***/ 1141:
/***/ (() => {



/***/ }),

/***/ 401:
/***/ (() => {



/***/ }),

/***/ 8590:
/***/ (() => {



/***/ }),

/***/ 2238:
/***/ (() => {



/***/ }),

/***/ 9055:
/***/ (() => {



/***/ })

};
;