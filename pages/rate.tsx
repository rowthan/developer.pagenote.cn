import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'

export const getStaticProps = async () => {
  return await getNotionDocDetail('rate')
}

function Rate(props: NotionDocProp) {
  return <NotionDoc {...props} />
}
export default Rate
