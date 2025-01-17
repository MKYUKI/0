// pages/contact.tsx
import React from 'react'
import Head from 'next/head'

export default function Page4Contact() {
  return (
    <>
      <Head>
        <title>Contact Info - Page4</title>
      </Head>

      <section
        style={{ padding: '2rem', background: '#fafafa', textAlign: 'center' }}
      >
        <h1>Contact Information</h1>
        <p style={{ margin: '1rem auto', maxWidth: '600px' }}>
          If you have any inquiries, feel free to email me at:
          <br />
          <strong>my-email-address@example.com</strong>
        </p>
        <p>
          Or find me on social networks:
          <br />
          <a href="https://twitter.com/myaccount" target="_blank" rel="noreferrer">
            Twitter
          </a>{' '}
          |{' '}
          <a
            href="https://linkedin.com/in/myprofile"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </section>
    </>
  )
}
