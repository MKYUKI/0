// pages/page5.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page5.css'

export default function Page5() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page5 | DeepBlue Starfield + Latent Diffusion</title>
        <link rel="stylesheet" href="/css/page5.css"/>
        <script src="/js/page5Logic.js" defer />
      </Head>

      <main className="page5-container">
        <canvas id="deepblue-star-canvas" className="page5-canvas"></canvas>

        <section className="page5-content">
          <h2>DeepBlue Starfield + Latent Diffusion</h2>
          <p>
            A cosmic realm with unstoppable synergy. 
            <a href="https://arxiv.org/abs/2112.10752" target="_blank" rel="noreferrer">
              Latent Diffusion
            </a>
          </p>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
