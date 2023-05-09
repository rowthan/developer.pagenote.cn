import { NotionRenderer } from 'react-notion-x'
import Doc from 'layouts/Doc'
import { ExtendedRecordMap } from 'notion-types'
import Footer from 'components/Footer'

const ROOT_PAGE_ID = 'cfd9af87021049349e0420bc708c4206'
export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/doc?id=${ROOT_PAGE_ID}`)
  const data = await res.json()
  return {
    props: {
      recordMap: data.recordMap,
    },
    revalidate: 100, // In seconds
  }
}

function Page(props: { recordMap: ExtendedRecordMap }) {
  const { recordMap } = props
  return (
    <Doc>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        footer={<Footer />}
        mapPageUrl={(pageID) => {
          return `/doc/${pageID}`
        }}
      />
    </Doc>
  )
}
export default Page
