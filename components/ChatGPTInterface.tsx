// File: components/ChatGPTInterface.tsx

import React, { useState, useEffect, useRef } from 'react'

/**
 * 役割(role)は user, assistant, system の3種類
 */
type ChatRole = 'user' | 'assistant' | 'system'

/**
 * メッセージオブジェクトの型
 */
interface ChatMessage {
  role: ChatRole
  content: string
}

/**
 * メッセージ単体をバブル表示するコンポーネント
 * @param role - user | assistant | system
 * @param content - テキスト内容
 */
function MessageBubble({ role, content }: ChatMessage) {
  return (
    <div className={`message-bubble ${role}`} style={{ margin: '0.4rem 0' }}>
      <strong style={{ textTransform: 'capitalize' }}>{role}:</strong>{' '}
      {content}
    </div>
  )
}

/**
 * コンポーネントのprops
 */
interface ChatProps {
  /**
   * 背景を透過ガラス風にするかどうか
   * デフォルト: false
   */
  isGlass?: boolean

  /**
   * API呼び出し時に使用する max_tokens 値
   * GPT-3.5などへのトークン数を制限するための目安。
   * (過剰生成による料金やToken上限エラーを防ぐ)
   * デフォルト: 2000
   */
  maxTokens?: number

  /**
   * presence_penalty, frequency_penalty などを追加する場合はここで定義する
   * デフォルト0
   */
  presencePenalty?: number

  /**
   * frequencyPenalty
   */
  frequencyPenalty?: number

  /**
   * temperature (生成の多様性/ランダム度)
   * デフォルト: 0.7
   */
  temperature?: number

  /**
   * モデル指定 (標準: gpt-3.5-turbo など)
   * デフォルト: 'gpt-3.5-turbo'
   */
  model?: string
}

/**
 * ChatGPTInterface コンポーネント
 *
 * - Deepseek版UIを流用しつつ、 /api/chat => OpenAI(GPT-3.5) へ問い合わせる
 * - ファイルアップロード欄やタイピング表示などの機能を保持
 */
export default function ChatGPTInterface({
  isGlass = false,
  maxTokens = 2000,
  presencePenalty = 0,
  frequencyPenalty = 0,
  temperature = 0.7,
  model = 'gpt-3.5-turbo'
}: ChatProps) {
  // 会話メッセージ群
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // ユーザー入力欄のテキスト
  const [userInput, setUserInput] = useState('')

  // ローディング中（送信中）フラグ
  const [isLoading, setIsLoading] = useState(false)

  // 一番下へスクロールするためのref
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // メッセージが追加されるたびに下端までスクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /**
   * ファイルアップロード (例: 画像やPDF等)
   * 任意機能なのでそのまま流用
   */
  const handleFileUpload = (files: FileList | null) => {
    if (!files || !files[0]) return
    const file = files[0]
    const fileMsg: ChatMessage = {
      role: 'user',
      content: `File uploaded: ${file.name} (size=${file.size} bytes)`
    }
    setMessages((prev) => [...prev, fileMsg])
  }

  /**
   * 「送信」ボタン押下時の処理
   *  - テキストが空でなければ messages に userメッセージ追加
   *  - API呼び出し (/api/chat)
   *  - GPT応答をassistantメッセージとして messages に追加
   *  - タイピング風に1文字ずつ表示
   */
  const handleSend = async () => {
    if (!userInput.trim()) return

    // 1) ユーザーのメッセージを追加
    const userMsg: ChatMessage = {
      role: 'user',
      content: userInput.trim()
    }
    const newMsgs = [...messages, userMsg]
    setMessages(newMsgs)
    setUserInput('')
    setIsLoading(true)

    try {
      // 2) /api/chat (OpenAI)へPOST
      // max_tokens, presence_penalty, frequency_penalty, temperature, model などを送る
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: newMsgs,
          temperature,
          max_tokens: maxTokens,
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty
        })
      })

      // JSONデコード
      const data = await res.json()

      if (!res.ok || data?.error) {
        // APIエラーの場合はログ出力し、assistantメッセージで報告
        console.error('[ChatGPTInterface] /api/chat error:', data?.error || data)
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '(APIエラー: ' + JSON.stringify(data?.error || data) + ')' }
        ])
        setIsLoading(false)
        return
      }

      // 3) AI応答テキスト (モックfallback時は data.choices[0].message.content にモック文が入る)
      const answerText = data?.choices?.[0]?.message?.content || '(no answer from AI)'

      // 4) タイピング風に少しずつ表示
      let buffer = ''
      let i = 0
      const intervalId = setInterval(() => {
        if (i < answerText.length) {
          buffer += answerText.charAt(i++)
          setMessages((prev) => {
            const last = prev[prev.length - 1]
            // 最後がassistantなら置き換え, そうでなければ新規追加
            if (last && last.role === 'assistant') {
              return [
                ...prev.slice(0, -1),
                { role: 'assistant', content: buffer }
              ]
            } else {
              return [
                ...prev,
                { role: 'assistant', content: buffer }
              ]
            }
          })
        } else {
          clearInterval(intervalId)
          setIsLoading(false)
        }
      }, 20) // 1文字打つごとのインターバル(ミリ秒)
    } catch (err) {
      console.error('Error calling /api/chat:', err)
      setIsLoading(false)
      // ネットワークレベルで失敗時
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '(通信エラーが発生しました)' }
      ])
    }
  }

  // ▼▼▼ 以下、UIのスタイル定義（既存のものを踏襲しつつ行数増のためコメント等追加） ▼▼▼

  /**
   * 全体コンテナ: ガラス風 or 通常背景
   *  - 画面中央寄せ、幅max600px, 高さ70vh
   *  - 枠/影/色など
   */
  const baseContainer: React.CSSProperties = {
    margin: '0 auto',
    width: '90%',
    maxWidth: '600px',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    color: '#fff',
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden'
  }

  /**
   * 通常の背景(黒+透明度)
   */
  const normalBg = { background: 'rgba(0,0,0,0.4)' }

  /**
   * ガラス風 => backgroundを transparent にし、
   * 親要素の backdrop-filter: blur(...) がかかる前提
   */
  const glassBg = { background: 'transparent' }

  // コンテナの最終スタイル
  const containerStyle = {
    ...baseContainer,
    ...(isGlass ? glassBg : normalBg)
  }

  /**
   * 上部: メッセージ表示エリア
   * flex:1 で余白を全て埋める
   * overflowY:auto でスクロール
   */
  const topAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem'
  }

  /**
   * 下部: ファイルアップロード + 入力欄 + 送信ボタン
   * 縦に並べる
   */
  const bottomAreaStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.75rem',
    borderTop: '1px solid rgba(255,255,255,0.3)',
    background: isGlass ? 'transparent' : 'rgba(0,0,0,0.6)'
  }

  // ファイルアップロード欄
  const fileRowStyle: React.CSSProperties = { marginBottom: '0.5rem' }

  /**
   * テキスト入力欄:
   * - resize不可
   * - ガラス時はborderを白寄りに
   * - バックグラウンドは通常だと #222
   */
  const textAreaStyle: React.CSSProperties = {
    resize: 'none',
    border: isGlass ? '1px solid rgba(255,255,255,0.4)' : '1px solid #444',
    borderRadius: '4px',
    padding: '0.75rem',
    fontSize: '0.95rem',
    fontFamily: 'sans-serif',
    background: isGlass ? 'transparent' : '#222',
    color: '#fff',
    width: '100%',
    marginBottom: '0.5rem'
  }

  /**
   * 送信ボタン
   */
  const sendButtonStyle: React.CSSProperties = {
    background: '#31a37d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    alignSelf: 'flex-end'
  }

  // ▼▼▼ JSX開始 ▼▼▼
  return (
    <div style={containerStyle}>
      {/* メッセージ表示エリア */}
      <div style={topAreaStyle}>
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        {/* 常に最下部に配置 => 自動スクロール */}
        <div ref={bottomRef} />
      </div>

      {/* 下部エリア => ファイルアップロード+入力+送信 */}
      <div style={bottomAreaStyle}>
        <div style={fileRowStyle}>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ color: '#fff', background: 'transparent' }}
          />
        </div>

        <textarea
          style={textAreaStyle}
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          style={sendButtonStyle}
          onClick={handleSend}
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
