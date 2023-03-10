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


      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          欢迎来到 PAGENOTE
          <a className="text-blue-600" href="https://developer.pagenote.cn">
            开发者中心
          </a>
        </h1>

        <CheckVersion requireVersion={'0.23.6'}>
          <p className="mt-3 text-2xl">
            从这里参与开发{' '}
            <code className="rounded-md bg-gray-100 dark:bg-gray-500 p-3 font-mono text-lg">
              <a href="https://github.com/rowthan/developer.pagenote.cn">pages/index.tsx</a>
            </code>
          </p>
        </CheckVersion>


        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="projects"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">PAGENOTE 项目结构 &rarr;</h3>
            <div className="mt-4 text-xl">
              PAGENOTE 插件由多个模块组成，选择你擅长的部分，开发维护。
            </div>
          </a>

          <a
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">教程 &rarr;</h3>
            <p className="mt-4 text-xl">
              视频教程还在制作中，稍等一下...
            </p>
          </a>

          <a
            href="/demo"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">示例 &rarr;</h3>
            <p className="mt-4 text-xl">
              和 PAGENOTE 插件通信示例
            </p>
          </a>

          <a
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">部署服务 &rarr;</h3>
            <p className="mt-4 text-xl">
              提交 MR 至主分支后，将自动部署.
            </p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
