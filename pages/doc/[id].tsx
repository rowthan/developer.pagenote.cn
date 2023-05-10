import { ExtendedRecordMap } from 'notion-types'
import { DOC_API_HOST } from 'const/env'
import NotionDoc from 'components/NotionDoc'

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
  const { recordMap, title } = await res.json()
  // Pass post data to the page via props
  return {
    props: {
      recordMap: recordMap || null,
      title: title || null,
    },
    revalidate: 60 * 10,
  }
}

export default function Page(props: {
  recordMap: ExtendedRecordMap
  title: string
}) {
  const { recordMap, title } = props || {}
  return <NotionDoc recordMap={recordMap} title={title} />
}
