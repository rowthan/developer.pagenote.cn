import { Html, Head, Main, NextScript } from 'next/document'
import { TDK } from '../const/tdk'

// 运行在服务端
export default function Document() {
  return (
    <Html lang="zh">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="https://developer.pagenote.cn/favicon.ico"
          type="image/x-icon"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={'crossOrigin'}
        />
        <meta name="description" content={TDK.common.description} />
        <meta name="keywords" content={TDK.common.keywords} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
