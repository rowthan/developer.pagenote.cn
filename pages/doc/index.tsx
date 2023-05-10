import { ExtendedRecordMap } from 'notion-types'
import { DOC_API_HOST } from 'const/env'
import NotionDoc from 'components/NotionDoc'

const ROOT_PAGE_ID = 'cfd9af87021049349e0420bc708c4206'
export const getStaticProps = async () => {
  const res = await fetch(`${DOC_API_HOST}/api/doc?id=${ROOT_PAGE_ID}`)
  const data = await res.json()
  return {
    props: {
      recordMap: data.recordMap,
      title: data.title,
    },
    revalidate: 100, // In seconds
  }
}

function Page(props: { recordMap: ExtendedRecordMap; title: string }) {
  const { recordMap, title } = props
  return <NotionDoc recordMap={recordMap} title={title} />
}
export default Page
