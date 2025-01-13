// pages/page6.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page6.css'

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page6 | Rainbow Finale + Ultra-Transformer</title>
        <link rel="stylesheet" href="/css/page6.css"/>
        <script src="/js/page6Logic.js" defer />
      </Head>

      <main className="page6-container">
        <div className="rainbow-overlay"></div>

        <section className="page6-content">
          <h2>Finale: Rainbow Blessing + Ultra-Transformer</h2>
          <p>
            Melding quantum fractals with 
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
              2017 Transformer
            </a> and 
            <a href="https://arxiv.org/abs/2106.01345" target="_blank" rel="noreferrer">
              scaling laws
            </a>. 
            A historical apex of synergy.
          </p>

          <ReferencesDropdown />
          <div style={{marginTop:'1rem'}}>
            <a href="/" style={{color:'#2b6feb'}}>Return to Home</a>
          </div>
        </section>
      </main>
    </>
  )
}
