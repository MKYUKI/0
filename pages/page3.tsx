// pages/page3.tsx
import React from 'react'
import Head from 'next/head'

export default function Page3() {
  return (
    <>
      <Head>
        <title>0 - Page3</title>
        <meta charSet="UTF-8" />
      </Head>

      <div className="page3-wrapper">
        <section className="hero-section3">
          <h1>Page3 - Example Layout</h1>
          <p className="intro3">
            This is an example of page3 content. 
            Adapted to be responsive for both PC and mobile.
          </p>
        </section>

        <section className="content3">
          <p>Some details or placeholders for Page3.</p>
        </section>
      </div>
    </>
  )
}
