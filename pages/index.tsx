// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (ChatGPT.com Perfect Clone)</title>
      </Head>

      <main className="page1-main-container">
        {/* ★ヒーロー: chatgpt.com 参考 */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">
              お手伝いできることはありますか？
            </h1>
            <h2 className="hero-subtitle">
              <strong>参考文献:</strong> <a href="https://chatgpt.com">chatgpt.com</a>
            </h2>
            <p className="hero-description">
              コメントを入力すると右上に表示され、その直下(左下方向)から
              GPT-4の回答が生成されます。ファイル(Word/PDF/画像)も送信可能。
            </p>
          </div>
        </section>

        {/* Info */}
        <section className="public-section">
          <h2>世界最高峰のGPT-4シナジーを無料開放</h2>
          <p>
            宇宙の誰もが自由に利用可能です。先端の量子錯覚アニメが加わり、
            chatgpt.comと同等機能をさらに進化。
          </p>
        </section>

        {/* チャットUI placeholder (実際はフッター固定) */}
        <section className="chat-ui-section">
          <div className="chat-ui-wrapper">
            <p className="chat-ui-note">
              画面下部(フッター)に本物のチャット欄があります。
              (PC/スマホ対応)
            </p>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
