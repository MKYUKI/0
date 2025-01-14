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
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
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
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    const bottomRef = (0,external_react_.useRef)(null);
    // 常に最下部へスクロール
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
    // ファイルアップロード(Word, PDF, 画像…)
    const handleFileUpload = (files)=>{
        if (!files || !files[0]) return;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e)=>{
            const base64 = e.target?.result;
            if (!base64 || typeof base64 !== "string") return;
            // とりあえずメッセージに反映
            const fileMsg = {
                role: "user",
                content: `File uploaded: ${file.name}, size=${file.size} bytes, base64Len=${base64.length}`
            };
            setMessages((prev)=>[
                    ...prev,
                    fileMsg
                ]);
        };
        reader.readAsDataURL(file);
    };
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
                            // すでにアシスタントが直前にいれば連結
                            return [
                                ...prev.slice(0, -1),
                                {
                                    role: "assistant",
                                    content: buffer
                                }
                            ];
                        } else {
                            // なければ新規追加
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
            }, 25);
        } catch (err) {
            console.error("Error calling /api/chat:", err);
            setIsLoading(false);
        }
    };
    // レイアウト定義
    // isPage1Override が true ならさらに大きく
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        background: "#fafafa",
        borderTop: "1px solid #ddd",
        borderLeft: "1px solid #ddd",
        borderRight: "1px solid #ddd",
        borderRadius: "8px 8px 0 0",
        overflow: "hidden",
        width: "100%"
    };
    // 1ページ目のみ「height: calc(100vh - 60px - 80px)」 で完璧に埋める
    if (isPage1Override) {
        containerStyle.height = "calc(100vh - 60px - 80px)";
    } else {
        // 2～6ページ目はある程度の高さ(60vh)で十分
        containerStyle.height = "60vh";
        containerStyle.maxWidth = "800px";
        containerStyle.margin = "0 auto";
    }
    const topArea = {
        flex: 1,
        overflowY: "auto",
        padding: "1rem"
    };
    const bottomArea = {
        display: "flex",
        gap: "0.5rem",
        padding: "0.75rem",
        borderTop: "1px solid #ccc",
        background: "#f3f3f3"
    };
    const textAreaStyle = {
        flex: 1,
        resize: "none",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "0.75rem",
        fontSize: "0.95rem",
        fontFamily: "sans-serif"
    };
    const fileButtonStyle = {
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        padding: "0.3rem"
    };
    const sendButtonStyle = {
        background: "#31a37d",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "0 16px",
        fontSize: "1rem",
        cursor: "pointer"
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        style: containerStyle,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: topArea,
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
                style: bottomArea,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("input", {
                        type: "file",
                        style: fileButtonStyle,
                        onChange: (e)=>handleFileUpload(e.target.files)
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("textarea", {
                        style: textAreaStyle,
                        placeholder: "(Reference: chatgpt.com) Enter message or attach file...",
                        value: userInput,
                        onChange: (e)=>setUserInput(e.target.value),
                        disabled: isLoading
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
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

;// CONCATENATED MODULE: ./pages/_app.tsx
// pages/_app.tsx






// ★ グローバルCSS一括 import









/** 上部ナビバー: 固定高さ60px想定 */ function NavBar() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("header", {
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            height: "60px",
            width: "100%",
            zIndex: 9999,
            background: "#222",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem",
            color: "#fff"
        },
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("span", {
                style: {
                    fontWeight: "bold",
                    marginRight: "2rem"
                },
                children: "GPT-4 Model"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("nav", {
                style: {
                    display: "flex",
                    gap: "1rem",
                    fontSize: "1rem"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "/",
                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                            style: {
                                cursor: "pointer"
                            },
                            children: "Page1"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "/page2",
                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                            style: {
                                cursor: "pointer"
                            },
                            children: "Page2"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "/page3",
                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                            style: {
                                cursor: "pointer"
                            },
                            children: "Page3"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "/page4",
                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                            style: {
                                cursor: "pointer"
                            },
                            children: "Page4"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "/page5",
                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                            style: {
                                cursor: "pointer"
                            },
                            children: "Page5"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "/page6",
                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                            style: {
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
/** Attention可視化(オプション) */ function AttentionPopup() {
    const [open, setOpen] = external_react_default().useState(false);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        style: {
            position: "fixed",
            top: "60px",
            right: "1rem",
            zIndex: 9999,
            fontSize: "0.9rem"
        },
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("button", {
                style: {
                    background: "#444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.4rem 0.8rem",
                    cursor: "pointer"
                },
                onClick: ()=>setOpen(!open),
                children: open ? "Hide Transformer" : "Show Transformer"
            }),
            open && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: {
                    marginTop: "0.3rem",
                    background: "rgba(0,0,0,0.85)",
                    color: "#fff",
                    padding: "1rem",
                    borderRadius: "8px",
                    width: "280px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("h4", {
                        style: {
                            marginBottom: "0.3rem"
                        },
                        children: "Attention Is All You Need (2017)"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                        style: {
                            fontSize: "0.88rem",
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
    const router = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
    // もしクライアントサイドで動的インポートしたいJSがあればここ
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "0 - The Ultimate GPT-4 Quantum Clone"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "description",
                        content: "0: GPT-4 based ChatGPT-like site with quantum illusions, synergy, unstoppable expansions."
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
                    // 上部60px分だけ余白あけて、ヘッダーが被らないように
                    paddingTop: "60px",
                    // 下部に80px分だけ空けてフッターとの被り回避
                    paddingBottom: "80px",
                    minHeight: "100vh",
                    boxSizing: "border-box"
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
                    height: "80px",
                    width: "100%",
                    background: "#f0f0f0",
                    boxShadow: "0 -2px 6px rgba(0,0,0,0.2)",
                    zIndex: 10000,
                    display: "flex",
                    alignItems: "center"
                },
                children: /*#__PURE__*/ jsx_runtime.jsx(ChatGPTInterface, {
                    isPage1Override: router.pathname === "/"
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