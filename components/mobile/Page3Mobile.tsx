// components/mobile/Page3Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page3Mobile() {
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page3-mobile-wrapper">
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page3 - Supreme GPT-4 Portal</h1>
        <h2>Mobile Layout - Page3</h2>
        <p>
          3ページ目モバイル版。Page1のクローンUI。
        </p>
      </section>

      <section className="mobile-public-section">
        <h3>GPT-4 Mobile - Page3</h3>
        <p>
          Additional info or references for page3 (mobile).
        </p>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '1.5rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
