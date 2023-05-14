import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'
import { PRO_PLAN_PAGE } from 'const/notion'

export const getStaticProps = async () => {
  return await getNotionDocDetail(PRO_PLAN_PAGE)
}

function Rate(props: NotionDocProp) {
  return (
    <NotionDoc
      {...props}
      pageTitle={<div className={'text-center'}>{props.title}</div>}
    />
  )
}

export default Rate
