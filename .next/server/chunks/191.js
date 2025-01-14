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
function ChatGPTInterface({ isPage1Override }) {
    const [messages, setMessages] = (0,external_react_.useState)([]);
    const [userInput, setUserInput] = (0,external_react_.useState)("");
    const [file, setFile] = (0,external_react_.useState)(null);
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    const bottomRef = (0,external_react_.useRef)(null);
    // Scroll to bottom
    (0,external_react_.useEffect)(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages
    ]);
    const handleFileChange = (e)=>{
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };
    const handleSend = async ()=>{
        if (!userInput.trim() && !file) return;
        // 送信メッセージ作成
        let userMsgContent = userInput.trim();
        if (file) {
            userMsgContent += ` [Attached File: ${file.name}]`;
        }
        const userMsg = {
            role: "user",
            content: userMsgContent
        };
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        // Reset
        setUserInput("");
        setFile(null);
        setIsLoading(true);
        try {
            // ChatGPT API
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
            // タイピング風表示
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
    // ★ isPage1Override: Chat欄をフル画面に近く
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        background: "#fafafa",
        overflow: "hidden",
        borderTop: "1px solid #ddd",
        borderLeft: "1px solid #ddd",
        borderRight: "1px solid #ddd",
        borderRadius: "8px 8px 0 0"
    };
    if (isPage1Override) {
        containerStyle.height = "calc(100vh - 80px)";
        containerStyle.width = "100%";
        containerStyle.maxWidth = "100%";
    } else {
        containerStyle.height = "60vh";
        containerStyle.width = "100%";
        containerStyle.maxWidth = "800px";
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        style: containerStyle,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "messages-window",
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: 16
                },
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
                style: {
                    display: "flex",
                    background: "#f3f3f3",
                    borderTop: "1px solid #ccc",
                    padding: "0.75rem",
                    gap: "0.75rem"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("input", {
                        type: "file",
                        onChange: handleFileChange
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("textarea", {
                        style: {
                            flex: 1,
                            resize: "none",
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            padding: 12
                        },
                        placeholder: "Type or attach a file...",
                        value: userInput,
                        onChange: (e)=>setUserInput(e.target.value),
                        disabled: isLoading
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                        style: {
                            background: "#31a37d",
                            color: "#fff",
                            border: "none",
                            padding: "0 24px",
                            borderRadius: 4
                        },
                        onClick: handleSend,
                        disabled: isLoading || !userInput.trim() && !file,
                        children: isLoading ? "Thinking..." : "Send"
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./pages/_app.tsx
// pages/_app.tsx





// グローバルCSS








// ChatUI

// シンプルナビバー（上部に 1～6ページへのリンク + 左上にモデル名表記）
function NavBar() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("nav", {
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.6rem 1rem",
            background: "#222",
            color: "#fff"
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: {
                    fontSize: "1.2rem",
                    fontWeight: "bold"
                },
                children: [
                    "[ GPT-4 : ",
                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                        style: {
                            color: "#66ffcc"
                        },
                        children: "0 AI"
                    }),
                    " ]"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
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
            })
        ]
    });
}
// Attention Transformer可視化ポップアップ
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
                            "Visualize multi-head attention or watch how Q-K-V are computed in real-time.",
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
    // ここでクライアントサイドJS読み込みも可能
    // import('../public/js/starsAnim.js')
    // import('../public/js/waveAnim.js')
    // import('../public/js/quantum3D.js')
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "0 - The Ultimate GPT Clone"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "description",
                        content: "0: Next-gen ChatGPT-like site."
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
                    children: /*#__PURE__*/ jsx_runtime.jsx(ChatGPTInterface, {
                        isPage1Override: true
                    })
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