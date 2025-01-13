// pages/page2.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido2.css'

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page2 | GPT Search UI</title>
        <link rel="stylesheet" href="/css/kaleido2.css" />
      </Head>

      <main className="kaleidoMain2">
        <section className="page2-search">
          <h1>Page2: ChatGPT Search-like Interface</h1>
          <p>
            White BG, black lines. 
            <strong> Searching unstoppable unstoppable code </strong>
            with 2017 Transformer synergy...
          </p>
          <div className="search-bar2">
            <input type="text" placeholder="Search unstoppable illusions..." />
            <button>Search</button>
          </div>
        </section>
      </main>
    </>
  )
}
