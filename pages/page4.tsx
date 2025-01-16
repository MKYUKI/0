// pages/page4.tsx
import React from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import MobileDetect from 'mobile-detect'

import Page4Desktop from '../components/desktop/Page4Desktop'
import Page4Mobile from '../components/mobile/Page4Mobile'

interface Page4Props {
  isMobile: boolean
}

export default function Page4({ isMobile }: Page4Props) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page4 SSR UA detection</title>
      </Head>

      {isMobile ? <Page4Mobile /> : <Page4Desktop />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Page4Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const ua = ctx.req.headers['user-agent'] || ''
  const md = new MobileDetect(Array.isArray(ua) ? ua[0] : ua)
  const isMobile = !!md.phone() || !!md.tablet()

  return {
    props: { isMobile },
  }
}
