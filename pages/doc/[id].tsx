import { NotionRenderer } from 'react-notion-x'
import Doc from '../../layouts/Doc'
import Footer from '../../components/Footer'
import { ExtendedRecordMap } from 'notion-types'
import Head from 'next/head'
import { get } from 'lodash'

const DOC_API = 'http://localhost:3000/api/doc'

export async function getStaticPaths() {
  const res = await fetch(DOC_API)
  const { pages = [] } = await res.json()

  const paths = pages.map((post: { title?: string; id: string }) => {
    return {
      params: { id: post.id },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

// This also gets called at build time
export async function getStaticProps(props: { params: { id: string } }) {
  const { params } = props
  const { id } = params
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`${DOC_API}?id=${id}`)
  const { recordMap } = await res.json()

  // Pass post data to the page via props
  return {
    props: {
      recordMap: recordMap,
      title: get(recordMap?.block[id] || {}, 'value.properties.title[0][0]'), // ToDo 语义化 URL path
    },
    revalidate: 60 * 2,
  }
}

export default function Page(props: {
  recordMap: ExtendedRecordMap
  title: string
}) {
  const { recordMap, title } = props
  console.log(title)
  return (
    <Doc>
      <Head>
        <title>{title}</title>
      </Head>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        footer={<Footer />}
        mapPageUrl={(pageID) => {
          return `/doc/${pageID}`
        }}
      />
    </Doc>
  )
}
