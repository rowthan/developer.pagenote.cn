import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";

// import {ThemeProvider} from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return(
      <>
        <Head>
            <link rel="shortcut icon" href="https://pagenote.cn/favicon.ico" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
      </>
      // <ThemeProvider attribute='class'>
      //
      // </ThemeProvider>
  )
}

export default MyApp
