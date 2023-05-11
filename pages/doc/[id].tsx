import { DOC_API_HOST } from 'const/env'
import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'

export async function getStaticPaths() {
  let pages = []
  try {
    const res = await fetch(`${DOC_API_HOST}/api/doc`)
    pages = (await res.json()).pages
  } catch (e) {
    console.error(e, 'getStaticPaths 请检查 /api/doc')
  }

  const paths = pages.map((post: { id: string }) => {
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
  const res = await getNotionDocDetail(id);
  // Pass post data to the page via props
  return res
}

export default function Page(props: NotionDocProp) {
  const { recordMap, title,path,keywords,description } = props || {}
  return <NotionDoc recordMap={recordMap} title={title} path={path} keywords={keywords} description={description} />
}
