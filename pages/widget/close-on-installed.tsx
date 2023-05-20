import { type ReactNode, useEffect } from 'react'
import useVersionValid from 'hooks/useVersionValid'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useCurrentTab from 'hooks/useCurrentTab'

interface Props {
  children?: ReactNode
}

export default function CloseOnInstalled(props: Props) {
  const { children } = props
  const { valid } = useVersionValid('0.26.5')
  const { tab } = useCurrentTab()
  useEffect(
    function () {
      if (valid && tab?.id) {
        extApi.developer.chrome({
          namespace: 'tabs',
          type: 'remove',
          args: [tab?.id],
        })
      }
    },
    [valid, tab]
  )
  return <div className="">{children}</div>
}
