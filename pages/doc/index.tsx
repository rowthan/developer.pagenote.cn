import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { NOTION_BASE_ROOT_PAGE } from 'const/env'
import { getNotionDocDetail } from 'service/doc'

export const getStaticProps = async () => {
  return await getNotionDocDetail(NOTION_BASE_ROOT_PAGE)
}

function Page(props: NotionDocProp) {
  return <NotionDoc {...props} />
}
export default Page
