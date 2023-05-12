import { Html, Head, Main, NextScript } from 'next/document'

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

        <meta
          name="description"
          content="pagenote 一个小而美的网页标记工具。一款浏览器插件，支持在Firefox、Chrome、edge等浏览器中使用。"
        />
        <meta
          name="keywords"
          content="pagenote,小而美,标记,插件,Firefox,Chrome,Edge"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
