import { type ReactNode, useEffect } from 'react'
import useVersionValid from 'hooks/useVersionValid'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useCurrentTab from 'hooks/useCurrentTab'
import { useRouter } from 'next/router'

interface Props {
  children?: ReactNode
}

export default function CloseOnInstalled(props: Props) {
  const { children } = props
  const router = useRouter()
  const { valid } = useVersionValid(
    router.query?.version?.toString() || '0.26.5'
  )
  const { tab } = useCurrentTab()
  useEffect(
    function () {
      if (router.query && valid && tab?.id) {
        extApi.developer.chrome({
          namespace: 'tabs',
          type: 'remove',
          args: [tab?.id],
        })
      }
    },
    [valid, tab, router.query]
  )
  return <div className="">{children}</div>
}
