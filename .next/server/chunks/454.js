exports.id = 454;
exports.ids = [454];
exports.modules = {

/***/ 3454:
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
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/next/script.js
var script = __webpack_require__(4298);
var script_default = /*#__PURE__*/__webpack_require__.n(script);
// EXTERNAL MODULE: ./public/css/globalQuantum.css
var globalQuantum = __webpack_require__(5677);
// EXTERNAL MODULE: ./public/css/kaleidoBase.css
var kaleidoBase = __webpack_require__(4355);
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
            // API 呼び出し
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
            // 文字送り
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
            console.error(err);
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
                        placeholder: "Type your message...",
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







function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "Quantum GPT Clone: World’s Most Advanced Transformer"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "description",
                        content: "A GPT-4.0 based ChatGPT clone with advanced 3D animations + Attention synergy."
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx((script_default()), {
                src: "/js/quantum3D.js",
                strategy: "beforeInteractive",
                onError: (e)=>console.error("Failed to load quantum3D.js", e)
            }),
            /*#__PURE__*/ jsx_runtime.jsx((script_default()), {
                src: "/js/starsAnim.js",
                strategy: "beforeInteractive",
                onError: (e)=>console.error("Failed to load starsAnim.js", e)
            }),
            /*#__PURE__*/ jsx_runtime.jsx((script_default()), {
                src: "/js/waveAnim.js",
                strategy: "beforeInteractive",
                onError: (e)=>console.error("Failed to load waveAnim.js", e)
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
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
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                style: {
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100vh"
                },
                children: /*#__PURE__*/ jsx_runtime.jsx(Component, {
                    ...pageProps
                })
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
                        maxWidth: "800px",
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



/***/ })

};
;