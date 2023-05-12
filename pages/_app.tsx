import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { basePath } from '../const/env'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script src={`${basePath}/components.js`} />
    </>
  )
}

export default MyApp
