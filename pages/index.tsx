// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido1.css'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | QuantumGPT - ChatGPT Clone</title>
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="kaleidoMain1">
        <section className="page1-hero">
          <h1>MasakiKusaka - Page1</h1>
          <p>
            White background, black quantum lines swirling with unstoppable synergy.
            <br />
            Resume & CareerHistory below...
          </p>
          <div className="resume-links">
            <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a>
            <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
            <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career (Word)</a>
            <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>Career (PDF)</a>
          </div>
        </section>
      </main>
    </>
  )
}
