import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'
import { NOTION_BASE_ROOT_PAGE } from 'notion.config'

export const getStaticProps = async () => {
  return await getNotionDocDetail(NOTION_BASE_ROOT_PAGE)
}

function Page(props: NotionDocProp) {
  return <NotionDoc {...props} />
}

export default Page
