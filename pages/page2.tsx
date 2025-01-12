// pages/page2.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido2.css' // 2ページ目専用にしたい場合

export default function Page2() {
  return (
    <>
      <Head>
        <title>Page2 | GPT Search-like Interface</title>
        <meta
          name="description"
          content="GPT-4.0 chat UI with a white background and quantum black lines"
        />
        <link rel="stylesheet" href="/css/kaleido2.css" />
      </Head>

      <main className="kaleidoMain2">
        <h1 style={{ textAlign: 'center' }}>
          Page2: Next-Level GPT Search UI
        </h1>

        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          This page simulates a <strong>ChatGPT Search-like</strong> interface
          with a white background and quantum black lines dancing in the back.
        </p>

        {/* 
          もし下部にチャットを入れたいなら 
          <ChatGPTInterface /> 
          ただしフッターにすでにChatUIがあるなら不要かも
        */}
      </main>
    </>
  )
}
