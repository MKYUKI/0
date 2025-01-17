// pages/page2.tsx
import React, { useEffect } from 'react'
import Head from 'next/head'
import ChatGPTInterface from '../components/ChatGPTInterface'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page2() {

  // 2ページ目ではデフォルトのフッター固定チャットを消して、ページ内に独自Chatを出したい場合
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) {
      globalFooter.style.display = 'none'
    }
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <>
      <Head>
        <title>Page2 - Resume & Career History</title>
      </Head>

      {/*
       * 2ページ目: 全画面アニメ背景 → 
       *   1) ヒーローセクション: 大きい見出し
       *   2) Resume/職務経歴書ダウンロード
       *   3) (必要なら) 下部にローカルチャットUI
       */}

      <div className="page2-wrapper" style={{ position:'relative', minHeight:'100vh' }}>
        {/* 例えばHeroセクション */}
        <section className="hero-section" style={{ 
          position:'relative', 
          width:'100%', 
          height:'400px', 
          background:'rgba(0,0,0,0.3)', 
          color:'#fff', 
          textAlign:'center', 
          padding:'2rem'
        }}>
          <h1 style={{ fontSize:'2rem', margin:'1rem 0' }}>
            MasakiKusaka Resume &amp; Career
          </h1>
          <p style={{ fontSize:'1rem' }}>
            Download Word/PDF versions below.
          </p>
        </section>

        {/* ↓ コンテンツ領域: Resume & References */}
        <section className="resume-section" style={{
          position:'relative',
          maxWidth:'800px',
          margin:'2rem auto',
          background:'#fff',
          color:'#000',
          padding:'2rem',
          borderRadius:'8px'
        }}>
          <h2 style={{ marginBottom:'1rem', textAlign:'center' }}>Resume &amp; Career History</h2>
          <p style={{ textAlign:'center' }}>
            <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a> |{" "}
            <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
          </p>
          <p style={{ textAlign:'center' }}>
            <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career (Word)</a> |{" "}
            <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>Career (PDF)</a>
          </p>

          <div style={{ marginTop:'2rem' }}>
            <ReferencesDropdown />
          </div>
        </section>

        {/* ページ内専用チャット */}
        <section className="local-chat-section" style={{
          position:'relative',
          maxWidth:'800px',
          margin:'2rem auto',
          background:'rgba(255,255,255,0.05)',
          padding:'1rem',
          borderRadius:'8px',
          boxShadow:'0 2px 5px rgba(0,0,0,0.4)'
        }}>
          <ChatGPTInterface />
        </section>
      </div>
    </>
  )
}
