// pages/page2.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page2.css'

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page2 | GPT Search-like UI</title>
        <link rel="stylesheet" href="/css/page2.css"/>
      </Head>

      <main className="page2-container">
        <div className="quantum-swirls-overlay"></div>

        <section className="page2-content">
          <h1>Page2: ChatGPT Search-like Interface</h1>
          <p>
            White background, black quantum lines swirling in unstoppable synergy.
            A search UI reminiscent of ChatGPT’s homepage.
          </p>

          <div className="search-bar2">
            <input type="text" placeholder="Search unstoppable illusions..." />
            <button>Search</button>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
