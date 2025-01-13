// pages/page3.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido3.css'

export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page3 | Purple Lightning</title>
        <link rel="stylesheet" href="/css/kaleido3.css"/>
      </Head>

      <main className="kaleidoMain3">
        <div className="purple-lights">
          <h2>Purple Lightning - Sparse MoE</h2>
          <p>
            Harness advanced mixture-of-experts with lightning storms...
          </p>
        </div>
      </main>
    </>
  )
}
