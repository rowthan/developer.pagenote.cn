import NotionDoc, { NotionDocProp } from 'components/NotionDoc'
import { getNotionDocDetail } from 'service/doc'

export const getStaticProps = async () => {
  return await getNotionDocDetail('b29f947e-1df6-4468-982e-e36e8ad1009c')
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
