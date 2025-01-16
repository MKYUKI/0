// pages/page4.tsx
import React from 'react'
import Head from 'next/head'

export default function Page4() {
  return (
    <>
      <Head>
        <title>0 - Page4</title>
        <meta charSet="UTF-8" />
      </Head>

      <div className="page4-wrapper">
        <section className="page4-hero">
          <h1>Page4 - Another Layout</h1>
          <p className="page4-intro">
            Showcasing a different style, still responsive.
          </p>
        </section>

        <section className="page4-content">
          <h2>Additional Info</h2>
          <p>Lorem ipsum dolor sit amet, Page4 details here...</p>
        </section>
      </div>
    </>
  )
}
