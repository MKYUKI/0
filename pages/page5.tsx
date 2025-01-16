// pages/page5.tsx
import React from 'react'
import Head from 'next/head'

export default function Page5() {
  return (
    <>
      <Head>
        <title>0 - Page5</title>
        <meta charSet="UTF-8" />
      </Head>

      <div className="page5-wrapper">
        <section className="page5-hero">
          <h1>Page5 - Yet Another Layout</h1>
          <p className="page5-intro">
            Here we illustrate more content sections with responsiveness.
          </p>
        </section>

        <section className="page5-content">
          <h2>Page5 Main Content</h2>
          <p>This is a sample text for Page5. Mobile friendly!</p>
        </section>
      </div>
    </>
  )
}
