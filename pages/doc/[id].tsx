import { NotionRenderer } from 'react-notion-x'
import Doc from 'layouts/Doc'
import Footer from 'components/Footer'
import { ExtendedRecordMap } from 'notion-types'
import Head from 'next/head'
import { get } from 'lodash'
import { DOC_API_HOST } from 'const/env'

export async function getStaticPaths() {
  let pages = []
  try {
    const res = await fetch(`${DOC_API_HOST}/api/doc`)
    pages = (await res.json()).pages
  } catch (e) {
    console.error(e, 'getStaticPaths 请检查 /api/doc')
  }

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
  const res = await fetch(`${DOC_API_HOST}/api/doc?id=${id}`)
  const { recordMap } = await res.json()
  const title = get(
    recordMap?.block[id]?.value?.properties?.title || null,
    '0.0'
  )
  // Pass post data to the page via props
  return {
    props: {
      recordMap: recordMap || null,
      title: title || '',
    },
    revalidate: 60 * 10,
  }
}

export default function Page(props: {
  recordMap: ExtendedRecordMap
  title: string
}) {
  const { recordMap, title } = props || {}
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
          // ToDo 语义化 URL path
          return `/doc/${pageID}`
        }}
      />
    </Doc>
  )
}
