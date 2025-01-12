// pages/page2.tsx
import React from 'react'
import Head from 'next/head'

// 2ページ目専用CSS
import '../public/css/kaleido2.css'

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page2 | GPT Search-like UI</title>
        <link rel="stylesheet" href="/css/kaleido2.css" />
      </Head>

      <main className="kaleidoMain2">
        <h1>ChatGPT Search-Like Interface</h1>
        <p>
          Enjoy the unstoppable unstoppable synergy with a 
          <strong> ChatGPT style search bar</strong> on a white background, 
          black quantum lines, and advanced synergy.
        </p>

        <div className="search-bar">
          <input type="text" placeholder="Search unstoppable code..." />
          <button>Search</button>
        </div>
      </main>
    </>
  )
}
