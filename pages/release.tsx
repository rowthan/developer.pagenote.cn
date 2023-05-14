import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'
import { RELEASE_PAGE } from 'const/notion'

export const getStaticProps = async () => {
  return await getNotionDocDetail(RELEASE_PAGE)
}

function Release(props: NotionDocProp) {
  return (
    <div>
      <NotionDoc {...props} header={<div></div>} />
    </div>
  )
}

export default Release
