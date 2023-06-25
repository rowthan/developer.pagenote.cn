import WebPageDetail from './WebPageDetail'

export default function PageDetailWithId(props: { id: string }) {
  return <WebPageDetail pageKey={props.id} />
}
