import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail, computeStaticPaths } from 'service/server/doc'
import NotFound from 'components/error/NotFound'
import Footer from 'components/Footer'
import { SEO_REVERT_MAP } from 'const/notion'

export async function getStaticPaths() {
  const pages = await computeStaticPaths()
  console.log(
    pages.paths.length,
    'static paths',
    pages.paths.map(function (item: { params: { paths: any } }) {
      return item.params.paths
    })
  )
  return pages
}

export async function getStaticProps(props: { params: { paths: string[] } }) {
  const { params } = props
  const basepath = params.paths[0]
  let id = `/${params.paths.join('/')}`
  if (basepath === SEO_REVERT_MAP['/']) {
    id = params.paths[1]
  }
  console.log('getStaticProps id::', id)
  return await getNotionDocDetail(id)
}

export default function Page(props: NotionDocProp) {
  const { recordMap, title, path, keywords, description } = props || {}
  if (!recordMap) {
    return (
      <div className={'h-screen'}>
        <NotFound />
        <Footer />
      </div>
    )
  }
  return (
    <NotionDoc
      recordMap={recordMap}
      title={title}
      path={path}
      keywords={keywords}
      description={description}
    />
  )
}
