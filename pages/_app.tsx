import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import Script from "next/script";
import {basePath} from "../const/env";

// import {ThemeProvider} from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return(
      <>
        <Head>
            <link rel="shortcut icon" href="https://pagenote.cn/favicon.ico" type="image/x-icon" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'crossOrigin'} />
        </Head>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;400;700&display=swap"
                rel="stylesheet"/>
          <Script src={`${basePath}/components.js`}/>
        <Component {...pageProps} />
      </>
      // <ThemeProvider attribute='class'>
      //
      // </ThemeProvider>
  )
}

export default MyApp
