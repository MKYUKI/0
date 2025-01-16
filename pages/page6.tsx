// pages/page6.tsx
import React from 'react'
import Head from 'next/head'

export default function Page6() {
  return (
    <>
      <Head>
        <title>0 - Page6</title>
        <meta charSet="UTF-8" />
      </Head>

      <div className="page6-wrapper">
        <section className="page6-hero">
          <h1>Page6 - Final Layout Example</h1>
          <p className="page6-intro">
            A final page showcasing a consistent responsive approach.
          </p>
        </section>

        <section className="page6-content">
          <h2>Conclusion</h2>
          <p>This site is fully responsive on pages 1 through 6!</p>
        </section>
      </div>
    </>
  )
}
