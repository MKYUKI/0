// pages/page3.tsx
import React from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import MobileDetect from 'mobile-detect'

// PC/モバイル版
import Page3Desktop from '../components/desktop/Page3Desktop'
import Page3Mobile from '../components/mobile/Page3Mobile'

interface Page3Props {
  isMobile: boolean
}

export default function Page3({ isMobile }: Page3Props) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page3 SSR UA detection</title>
      </Head>

      {isMobile ? <Page3Mobile /> : <Page3Desktop />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Page3Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const ua = ctx.req.headers['user-agent'] || ''
  const md = new MobileDetect(Array.isArray(ua) ? ua[0] : ua)
  const isMobile = !!md.phone() || !!md.tablet()

  return {
    props: { isMobile },
  }
}
