// pages/index.tsx
import React from 'react'
import Head from 'next/head'

// 1ページ目用のCSS(アニメ/色など)
import '../public/css/kaleido1.css'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | MasakiKusaka Portfolio & Resume</title>
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="root-container">
        <section style={{ padding: '3rem', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1.5rem' }}>
            MasakiKusaka 日下真旗: Portfolio + Resume
          </h1>
          <p style={{ marginBottom: '2rem' }}>
            This unstoppable unstoppable code merges fractal illusions with
            multi-head self-attention, culminating in the apex of civilization.
          </p>

          <h3>Resume & CareerHistory (Word/PDF)</h3>
          <p>
            <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a> |{' '}
            <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
          </p>
          <p>
            <a href="/docs/MasakiKusaka_CareerHistory.docx" download>CareerHistory (Word)</a> |{' '}
            <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>CareerHistory (PDF)</a>
          </p>
        </section>
      </main>
    </>
  )
}
