import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'

export const getStaticProps = async () => {
  return await getNotionDocDetail('96d0f3f4fc3d4b82b38b41d94dd8b339')
}

export default function Page(props: NotionDocProp) {
  return <NotionDoc {...props} />
}
