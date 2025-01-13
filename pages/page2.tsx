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
        <div className="fireworkGroup2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`fireLine2 l${i}`} />
          ))}
        </div>

        <section className="page2-content">
          <h1>ChatGPT Search-Like Interface (Black Fireworks)</h1>
          <p>
            White background, unstoppable synergy with black lines & search bar. 
            Inspired by ChatGPT's homepage.
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
