import { NotionRenderer } from 'react-notion-x'
import Doc from 'layouts/Doc'
import Footer from 'components/Footer'
import { ExtendedRecordMap } from 'notion-types'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
)

export default function NotionDoc(props: {
  recordMap: ExtendedRecordMap
  title: string
}) {
  const { recordMap, title = '' } = props || {}
  const [dark, setDark] = useState<boolean>(function () {
    return new Date().getHours() > 18
  })

  useEffect(function () {
    const darkMode =
      window?.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(darkMode)
  }, [])

  return (
    <Doc>
      <Head>
        <title>{title}</title>
      </Head>
      <NotionRenderer
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
        }}
        fullPage={true}
        darkMode={dark}
        footer={<Footer />}
        mapPageUrl={(pageID) => {
          // ToDo 语义化 URL path
          return `/doc/${pageID}`
        }}
      />
    </Doc>
  )
}
