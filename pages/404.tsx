import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NotFoundSvg from 'assets/svg/404/not_found.svg'
import Head from 'next/head'

const redirectMap: Record<string, string> = {
  '/log': '/developer/log',
  '/projects': '/developer/project',
  '/feedback': '/contact/feedback',
  '/debug': '',
  '/demo': '/developer/demo',
  '/trash': '/manage/trash',
  '/page': '/manage/page',
  '/light': '/manage/light',
  '/manage/pages': '/manage/page',
}

export default function Custom404() {
  const router = useRouter()

  useEffect(
    function () {
      const redirectUrl = redirectMap[router.asPath]
      if (redirectUrl) {
        router.replace(redirectUrl)
      } else {
        if (router.asPath.indexOf('.html') > -1) {
          const path = router.asPath.replace('.html', '')
          router.replace(path)
        }
      }
    },
    [router.asPath]
  )

  return (
    <div>
      <Head>
        <title>闯入了一片无人之境-404</title>
      </Head>
      <main className="relative h-screen ">
        {/* <header className="absolute top-0 left-0 right-0 z-20">
                    <nav className="container px-6 py-4 mx-auto md:px-12">
                        <div className="items-center justify-between md:flex">
                            <div className=" space-x-4 md:flex md:items-center md:justify-end">
                                <button className="px-6 py-2 text-white uppercase transition duration-200 ease-in bg-blue-400 border border-blue-400 w-36 hover:bg-blue-500 focus:outline-none">
                                    Login
                                </button>
                                <button className="px-6 py-2 uppercase transition duration-200 ease-in border border-blue-400 w-36 hover:bg-blue-400 hover:text-white focus:outline-none">
                                    Register
                                </button>
                            </div>
                        </div>
                    </nav>
                </header> */}
        <div className="container relative z-10 flex items-center px-6 py-24 mx-auto md:px-12">
          <div className="container relative flex flex-col items-center justify-between px-6 mx-auto">
            <div className="flex flex-col items-center justify-center w-full mb-16 space-x-12 md:flex-row md:mb-8">
              <h1 className="text-6xl font-thin text-center text-gray-400">
                走丢了 ?
              </h1>
              <a
                href="https://pagenote.cn/feedback"
                className="w-32 px-3 py-2 text-center text-2xl font-light uppercase transition duration-200 ease-in border-b border-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none"
              >
                帮助
              </a>
            </div>
            <div className="relative block w-full mx-auto mt-6 md:mt-0">
              <NotFoundSvg className="max-w-3xl m-auto" />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
