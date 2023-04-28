import Footer from 'components/Footer';
import type { NextPage } from 'next'
import Head from 'next/head'
import CheckVersion from "../components/check/CheckVersion";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-fill flex-col items-center justify-center py-2 dark:bg-gray-900">
      <Head>
        <title>PAGENOTE 开发者中心</title>
        <link rel="icon" href="https://pagenote.cn/favicon.ico" />
      </Head>

      <div>
        
      </div>

      <Footer />
    </div>
  )
}

export default Home
