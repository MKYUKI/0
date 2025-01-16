// pages/page2.tsx
import React, { useEffect } from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function Page2() {

  // 2ページ目で #chat-footer (グローバル固定チャット) を消し、
  // 代わりにページ内 <ChatGPTInterface/> を配置
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) {
      globalFooter.style.display = 'none'
    }
    return () => {
      if (globalFooter) {
        globalFooter.style.display = ''
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>0 - Page2 (Unified Page - Full Anim + Chat)</title>
        <meta charSet="UTF-8" />
      </Head>

      <div className="page2-unified-wrapper">
        {/* ヒーロー (背後に quantum3D / stars / wave) */}
        <section className="hero-section">
          <div className="black-quantum-overlay">
            <div className="hero-text">
              <h1>MasakiKusaka Official Home - by 0</h1>
              <p className="intro">
                (Restored) Majestic synergy with black quantum lines.
                Enough vertical space to enjoy the original animation.
              </p>
            </div>
          </div>
        </section>

        {/* 白背景セクション */}
        <section className="white-section">
          <div className="resume-section">
            <h3>Resume &amp; Career History</h3>
            <p>
              <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
            </p>
            <p>
              <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career (Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>Career (PDF)</a>
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <ReferencesDropdown />
          </div>
        </section>

        {/* ページ内ローカルChat */}
        <section className="local-chat-section">
          <ChatGPTInterface />
        </section>
      </div>
    </>
  )
}
