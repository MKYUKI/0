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
// File: components/ChatGPTInterface.tsx


/**
 * メッセージ単体をバブル表示するコンポーネント
 * @param role - user | assistant | system
 * @param content - テキスト内容
 */ function MessageBubble({ role, content }) {
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
/**
 * ChatGPTInterface コンポーネント
 *
 * - Deepseek版UIを流用しつつ、 /api/chat => OpenAI(GPT-3.5) へ問い合わせる
 * - ファイルアップロード欄やタイピング表示などの機能を保持
 */ function ChatGPTInterface({ isGlass = false, maxTokens = 2000, presencePenalty = 0, frequencyPenalty = 0, temperature = 0.7, model = "gpt-3.5-turbo" }) {
    // 会話メッセージ群
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    // ユーザー入力欄のテキスト
    const [userInput, setUserInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    // ローディング中（送信中）フラグ
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // 一番下へスクロールするためのref
    const bottomRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // メッセージが追加されるたびに下端までスクロール
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages
    ]);
    /**
   * ファイルアップロード (例: 画像やPDF等)
   * 任意機能なのでそのまま流用
   */ const handleFileUpload = (files)=>{
        if (!files || !files[0]) return;
        const file = files[0];
        const fileMsg = {
            role: "user",
            content: `File uploaded: ${file.name} (size=${file.size} bytes)`
        };
        setMessages((prev)=>[
                ...prev,
                fileMsg
            ]);
    };
    /**
   * 「送信」ボタン押下時の処理
   *  - テキストが空でなければ messages に userメッセージ追加
   *  - API呼び出し (/api/chat)
   *  - GPT応答をassistantメッセージとして messages に追加
   *  - タイピング風に1文字ずつ表示
   */ const handleSend = async ()=>{
        if (!userInput.trim()) return;
        // 1) ユーザーのメッセージを追加
        const userMsg = {
            role: "user",
            content: userInput.trim()
        };
        const newMsgs = [
            ...messages,
            userMsg
        ];
        setMessages(newMsgs);
        setUserInput("");
        setIsLoading(true);
        try {
            // 2) /api/chat (OpenAI)へPOST
            // max_tokens, presence_penalty, frequency_penalty, temperature, model などを送る
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model,
                    messages: newMsgs,
                    temperature,
                    max_tokens: maxTokens,
                    presence_penalty: presencePenalty,
                    frequency_penalty: frequencyPenalty
                })
            });
            // JSONデコード
            const data = await res.json();
            if (!res.ok || data?.error) {
                // APIエラーの場合はログ出力し、assistantメッセージで報告
                console.error("[ChatGPTInterface] /api/chat error:", data?.error || data);
                setMessages((prev)=>[
                        ...prev,
                        {
                            role: "assistant",
                            content: "(APIエラー: " + JSON.stringify(data?.error || data) + ")"
                        }
                    ]);
                setIsLoading(false);
                return;
            }
            // 3) AI応答テキスト (モックfallback時は data.choices[0].message.content にモック文が入る)
            const answerText = data?.choices?.[0]?.message?.content || "(no answer from AI)";
            // 4) タイピング風に少しずつ表示
            let buffer = "";
            let i = 0;
            const intervalId = setInterval(()=>{
                if (i < answerText.length) {
                    buffer += answerText.charAt(i++);
                    setMessages((prev)=>{
                        const last = prev[prev.length - 1];
                        // 最後がassistantなら置き換え, そうでなければ新規追加
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
                    clearInterval(intervalId);
                    setIsLoading(false);
                }
            }, 20) // 1文字打つごとのインターバル(ミリ秒)
            ;
        } catch (err) {
            console.error("Error calling /api/chat:", err);
            setIsLoading(false);
            // ネットワークレベルで失敗時
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: "(通信エラーが発生しました)"
                    }
                ]);
        }
    };
    // ▼▼▼ 以下、UIのスタイル定義（既存のものを踏襲しつつ行数増のためコメント等追加） ▼▼▼
    /**
   * 全体コンテナ: ガラス風 or 通常背景
   *  - 画面中央寄せ、幅max600px, 高さ70vh
   *  - 枠/影/色など
   */ const baseContainer = {
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
    /**
   * 通常の背景(黒+透明度)
   */ const normalBg = {
        background: "rgba(0,0,0,0.4)"
    };
    /**
   * ガラス風 => backgroundを transparent にし、
   * 親要素の backdrop-filter: blur(...) がかかる前提
   */ const glassBg = {
        background: "transparent"
    };
    // コンテナの最終スタイル
    const containerStyle = {
        ...baseContainer,
        ...isGlass ? glassBg : normalBg
    };
    /**
   * 上部: メッセージ表示エリア
   * flex:1 で余白を全て埋める
   * overflowY:auto でスクロール
   */ const topAreaStyle = {
        flex: 1,
        overflowY: "auto",
        padding: "1rem"
    };
    /**
   * 下部: ファイルアップロード + 入力欄 + 送信ボタン
   * 縦に並べる
   */ const bottomAreaStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "0.75rem",
        borderTop: "1px solid rgba(255,255,255,0.3)",
        background: isGlass ? "transparent" : "rgba(0,0,0,0.6)"
    };
    // ファイルアップロード欄
    const fileRowStyle = {
        marginBottom: "0.5rem"
    };
    /**
   * テキスト入力欄:
   * - resize不可
   * - ガラス時はborderを白寄りに
   * - バックグラウンドは通常だと #222
   */ const textAreaStyle = {
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
    /**
   * 送信ボタン
   */ const sendButtonStyle = {
        background: "#31a37d",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "0.6rem 1.2rem",
        fontSize: "1rem",
        cursor: "pointer",
        alignSelf: "flex-end"
    };
    // ▼▼▼ JSX開始 ▼▼▼
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
                        placeholder: "Type your message...",
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
// File: pages/_app.tsx





// グローバルCSS

// ChatGPTInterfaceをフッターに表示

/**
 * シンプルなナビゲーションバー
 * 右側に検索アイコンなどを入れる場合は適宜実装
 */ function NavBar() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
        className: "navbar",
        style: {
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "nav-left",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/",
                        className: "nav-link",
                        style: {
                            marginRight: "16px"
                        },
                        children: "Home"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/aichat",
                        className: "nav-link",
                        style: {
                            marginRight: "16px"
                        },
                        children: "AI Chat"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/art",
                        className: "nav-link",
                        style: {
                            marginRight: "16px"
                        },
                        children: "Art"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/contact",
                        className: "nav-link",
                        style: {
                            marginRight: "16px"
                        },
                        children: "Contact"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "nav-right"
            })
        ]
    });
}
/**
 * 簡易エラーバウンダリー
 * Next.jsはサーバサイドレンダリング時には標準的なエラー画面がでるが
 * クライアントサイドのコンポーネント内エラーを捕捉したい場合に使用
 */ class ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
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
        console.error("[ErrorBoundary] Caught error:", error, info);
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
                        children: "Reload or contact support if the issue persists."
                    })
                ]
            });
        }
        return this.props.children;
    }
}
/**
 * Next.js アプリ全体のラッパ
 */ function MyApp({ Component, pageProps }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        console.log("[MyApp] mounted on client side.");
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ErrorBoundary, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "GPT-3.5 App with Fallback"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "description",
                        content: "Next.js + GPT-3.5, with fallback for insufficient_quota error."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                id: "app-wrapper",
                style: {
                    minHeight: "100vh",
                    background: "#000",
                    color: "#fff"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NavBar, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                        id: "main-content",
                        style: {
                            padding: "20px"
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                            ...pageProps
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
                        id: "chat-footer",
                        style: {
                            marginTop: "20px",
                            padding: "10px"
                        },
                        children: router.pathname !== "/" && router.pathname !== "/art" && router.pathname !== "/aichat" && router.pathname !== "/contact" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                borderTop: "1px solid #666",
                                paddingTop: "8px"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    children: "Global GPT Chat"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ChatGPTInterface__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    isGlass: false,
                                    maxTokens: 1200,
                                    temperature: 0.7,
                                    presencePenalty: 0,
                                    frequencyPenalty: 0
                                })
                            ]
                        })
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