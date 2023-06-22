import Footer from 'components/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import NotFound from 'components/error/NotFound'

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
  '/setting': '/ext/setting',
  '/pagenote': '/ext/manage',
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
        <div className="container relative z-10 flex items-center px-6 py-24 mx-auto md:px-12">
          <NotFound />
        </div>
        <Footer />
      </main>
    </div>
  )
}
