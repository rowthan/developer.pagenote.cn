import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { basePath } from '../const/env'
import Head from 'next/head'
import { TDK } from '../const/tdk'

// 运行在客户端
function ClientApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{TDK.common.title}</title>
      </Head>
      <Component {...pageProps} />
      <Script src={`${basePath}/components.js`} />
    </>
  )
}

export default ClientApp
