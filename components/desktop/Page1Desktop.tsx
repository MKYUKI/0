// components/desktop/Page1Desktop.tsx
import React, { useEffect } from 'react'
import ChatGPTInterface from '../../components/ChatGPTInterface'
import ReferencesDropdown from '../ReferencesDropdown' // 例: 適宜

export default function Page1Desktop() {
  useEffect(() => {
    // グローバルfooterを隠し、このページ内チャットを使う場合
    const gf = document.getElementById('chat-footer')
    if (gf) gf.style.display = 'none'
    return () => {
      if (gf) gf.style.display = ''
    }
  }, [])

  return (
    <div className="page1-desktop-wrapper">
      <section className="hero-section-clone">
        <div className="hero-content" style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '12px',
          padding: '2rem'
        }}>
          <h1 className="hero-title" style={{ color: '#fff' }}>
            0へようこそ (Welcome to 0)
          </h1>
          <h2 className="hero-subtitle" style={{ color: '#ffddaa' }}>
            What can I help you with? (Desktop Layout)
          </h2>
          <p className="hero-description" style={{ color: '#ffeecc' }}>
            背後に世界最大級アニメーション(quantum3D / stars / wave)が動いています！
          </p>
        </div>
      </section>

      <section style={{ padding:'2rem', color:'#000' }}>
        <h2>Information for PC</h2>
        <p>Here is some text on Page1 (Desktop version).</p>
        <ReferencesDropdown />
      </section>

      {/* ページ内チャットUI (任意) */}
      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
