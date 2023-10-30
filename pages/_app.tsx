import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { basePath, isDev, isExt } from 'const/env'
import Head from 'next/head'
import { TDK } from 'const/tdk'
import { StrictMode } from 'react'

// 运行在客户端
function ClientApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Head>
        <title>{isDev ? '开发阶段' : TDK.common.title}</title>
      </Head>
      <Component {...pageProps} />
      <Script src={`${basePath}/components.js`} />
      <Script src={`${basePath}/lib/aliyun-oss-sdk.min.js`} />
      {!isExt && !isDev && <Analytics />}
    </StrictMode>
  )
}

export default ClientApp
