import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'
import { NOTION_BASE_ROOT_PAGE } from 'notion.config'

export const getStaticProps = async () => {
  return await getNotionDocDetail(
    NOTION_BASE_ROOT_PAGE || '1d452a26cb2b48ea836dd623016b9afd'
  )
}

export default function Page(props: NotionDocProp) {
  return <NotionDoc {...props} />
}
