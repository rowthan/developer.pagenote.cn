import { useRouter } from 'next/router'
import PageDetailWithId from 'components/webpage/PageDetailWithId'

export default function Page() {
  const router = useRouter()
  return <PageDetailWithId id={router.query.id as string} />
}
