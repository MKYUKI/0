// pages/page1.tsx
import React from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import MobileDetect from 'mobile-detect'

// ★ PC版・モバイル版
import Page1Desktop from '../components/desktop/Page1Desktop'
import Page1Mobile from '../components/mobile/Page1Mobile'

interface Page1Props {
  isMobile: boolean
}

export default function Page1({ isMobile }: Page1Props) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 SSR UA detection</title>
      </Head>

      {isMobile ? <Page1Mobile /> : <Page1Desktop />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Page1Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const ua = ctx.req.headers['user-agent'] || ''
  const md = new MobileDetect(Array.isArray(ua) ? ua[0] : ua)
  const isMobile = !!md.phone() || !!md.tablet()

  return { props: { isMobile } }
}
