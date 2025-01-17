// pages/aichat.tsx
import React, { useEffect } from 'react'
import Head from 'next/head'
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function Page2AIChat() {
  useEffect(() => {
    // ページ2でフッター固定チャットを隠し、独自に配置
    const gf = document.getElementById('chat-footer')
    if (gf) gf.style.display = 'none'
    return () => {
      if (gf) gf.style.display = ''
    }
  }, [])

  return (
    <>
      <Head>
        <title>AI Chat - Page2</title>
      </Head>

      <section
        style={{
          padding: '2rem',
          color: '#fff',
          background: 'rgba(0,0,0,0.4)',
          textAlign: 'center',
        }}
      >
        <h1>AI Chat</h1>
        <p>This page is dedicated to an AI chat interface.</p>
      </section>

      <section
        style={{
          maxWidth: '800px',
          margin: '2rem auto',
          background: '#fff',
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        <h2>Local Chat UI</h2>
        <ChatGPTInterface />
      </section>
    </>
  )
}
