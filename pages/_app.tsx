import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import {ThemeProvider} from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return(
      // <ThemeProvider attribute='class'>
      //
      // </ThemeProvider>
      <Component {...pageProps} />
  )
}

export default MyApp
