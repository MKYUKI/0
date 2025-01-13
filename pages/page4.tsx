// pages/page4.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido4.css'

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page4 | Beige Canvas + NeRF illusions</title>
        <link rel="stylesheet" href="/css/kaleido4.css" />
      </Head>

      <main className="kaleidoMain4">
        <section className="page4-nerf">
          <h2>Beige + NeRF illusions</h2>
          <p>
            3D illusions & advanced 2017 Transformer synergy...
          </p>
        </section>
      </main>
    </>
  )
}
