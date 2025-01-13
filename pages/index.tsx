// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page1.css'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | Ultimate GPT Clone</title>
        <link rel="stylesheet" href="/css/page1.css" />
      </Head>

      <main className="page1-main-container">
        <div className="quantum-lines-overlay"></div>

        <section className="page1-content">
          <h1>MasakiKusaka - Page1</h1>
          <p>
            White background + black quantum lines swirling with unstoppable synergy.<br/>
            Experience the ultimate 2017 Transformer synergy plus advanced 3D illusions.
          </p>

          <div className="resume-links">
            <h3>Resume & Career History</h3>
            <p>
              <a href="/docs/MasakiKusaka_Resume.docx" download>Resume(Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume(PDF)</a>
            </p>
            <p>
              <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career(Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>Career(PDF)</a>
            </p>
          </div>
        </section>

        <div className="page1-chat-wrap">
          <p style={{ textAlign:'center', color:'#777', marginBottom:'1rem' }}>
            (Below is an actual Chat interface!)
          </p>
        </div>

        <ReferencesDropdown />
      </main>
    </>
  )
}
