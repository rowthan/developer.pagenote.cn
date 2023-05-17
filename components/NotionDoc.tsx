import { NotionRenderer } from 'react-notion-x'
import Doc from 'layouts/Doc'
import Footer from 'components/Footer'
import { Block, ExtendedRecordMap } from 'notion-types'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { searchInNotion } from 'service/doc'
import Image from 'next/image'
import Link from 'next/link'
import { TDK } from 'const/tdk'
import { NOTION_BASE_ROOT_PAGE, DEFAULT_BASE_DOC_PATH } from 'notion.config'
import { getPathFromProperties } from 'utils/notion'

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

export type NotionDocProp = {
  recordMap: ExtendedRecordMap // notion 原始数据
  title: string | null // 文章标题
  path: string | null // SEO 优化映射路径
  description: string | null
  keywords: string[]
} & Partial<Parameters<typeof NotionRenderer>[0]>



export default function NotionDoc(props: NotionDocProp) {
  const { recordMap, pageTitle, title, description, keywords } = props || {}
  const [dark, setDark] = useState<boolean>(function () {
    return new Date().getHours() >= 19
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
        <title>{title || TDK.common.title}</title>
        <meta
          name="description"
          content={description || TDK.common.description}
        ></meta>
        <meta
          name="keywords"
          content={keywords?.toString() || TDK.common.keywords}
        ></meta>
      </Head>
      <NotionRenderer
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
        }}
        pageTitle={pageTitle}
        fullPage={true}
        darkMode={dark}
        footer={<Footer />}
        searchNotion={searchInNotion}
        rootPageId={NOTION_BASE_ROOT_PAGE}
        mapPageUrl={(pageID) => {
          if (pageID === NOTION_BASE_ROOT_PAGE) {
            return '/'
          }
          const path = getPathFromProperties(recordMap.block[pageID]?.value)
          return path || `/${DEFAULT_BASE_DOC_PATH}/${pageID}`
        }}
        {...props}
      />
    </Doc>
  )
}
