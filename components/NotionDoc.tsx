import { NotionRenderer } from 'react-notion-x'
import Doc from 'layouts/Doc'
import Footer from 'components/Footer'
import { ExtendedRecordMap,Block } from 'notion-types'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { get } from 'lodash'
import { NOTION_BASE_ROOT_PAGE } from 'const/env'
import { searchInNotion } from 'service/doc'
import Image from 'next/image'
import Link from 'next/link'

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
}

function getPathFromProperties(block?: Block){
  if(!block){
    return
  }
  for(let i in block.properties){
    const prop = block.properties[i];
    const plainText = get(prop,'0.0')
    const tag = get(prop,'0.1.0.0');
    const value = get(prop,'0.1.0.1');
    // 无法从确定的属性值中获取，所以hack一下，遍历所有属性，进行判断后作为 path 来使用，可能存在误差。需要保证属性中只有一个URL类型的字段，否则可能导致异常
    if(plainText===value && tag==='a'){
      return plainText
    }
  }
}



export default function NotionDoc(props: NotionDocProp) {
  const { recordMap, title = '', description,keywords } = props || {}
  const [dark, setDark] = useState<boolean>(function () {
    return new Date().getHours() > 18
  })

  useEffect(function () {
    const darkMode =
      window?.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    if (darkMode) {
      setDark(true)
    }
  }, [])

  return (
    <Doc>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description||''}></meta>
        <meta name='keywords' content={keywords?.toString()||''}></meta>
      </Head>
      <NotionRenderer
        recordMap={recordMap}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
        }}
        fullPage={true}
        darkMode={dark}
        footer={<Footer />}
        searchNotion={searchInNotion}
        rootPageId={NOTION_BASE_ROOT_PAGE}
        mapPageUrl={(pageID) => {
          if(pageID===NOTION_BASE_ROOT_PAGE){
            return '/doc'
          }
          // console.log(pageID,recordMap.block[pageID])
          // ToDo 语义化 URL path 没有找到明确的方法取到 path，从几个测试挂载在属性 i}_v 上
          const path = getPathFromProperties(recordMap.block[pageID]?.value)
          return `/doc/${path || pageID}`
        }}
      />
    </Doc>
  )
}
