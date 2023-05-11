import NotionDoc,{NotionDocProp} from 'components/NotionDoc'
import { NOTION_BASE_ROOT_PAGE } from 'const/env'
import { getNotionDocDetail } from 'service/doc'

export const getStaticProps = async () => {
  const data = await getNotionDocDetail(NOTION_BASE_ROOT_PAGE)
  return data
}

function Page(props: NotionDocProp) {
  return <NotionDoc {...props} />
}
export default Page
