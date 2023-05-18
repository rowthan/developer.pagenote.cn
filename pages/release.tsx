import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'


export const getStaticProps = async () => {
  return await getNotionDocDetail('c5865cde-2ef5-4f36-9c0f-e2dce97f6a1c')
}

function Release(props: NotionDocProp) {
  return (
    <div>
      <NotionDoc {...props} header={<div></div>} />
    </div>
  )
}

export default Release
