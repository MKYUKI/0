// pages/page2.tsx
import React from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import MobileDetect from 'mobile-detect'

// デスクトップ/モバイル版
import Page2Desktop from '../components/desktop/Page2Desktop'
import Page2Mobile from '../components/mobile/Page2Mobile'

interface Page2Props {
  isMobile: boolean
}

export default function Page2({ isMobile }: Page2Props) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page2 SSR UA detection</title>
      </Head>

      {isMobile ? <Page2Mobile /> : <Page2Desktop />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Page2Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const ua = ctx.req.headers['user-agent'] || ''
  const md = new MobileDetect(Array.isArray(ua) ? ua[0] : ua)
  const isMobile = !!md.phone() || !!md.tablet()

  return {
    props: { isMobile },
  }
}
