import { useContextSelector } from 'use-context-selector'
import { context } from '../../../store/ContextProvider'
import useWebpage from '../../../hooks/useWebpage'
import WebPageDetail from '../../webpage/WebPageDetail'
import { useMemo } from 'react'
import Empty from '../../Empty'

export default function PageDetail() {
  const state = useContextSelector(context, (v) => v[0])
  const { data: webpage } = useWebpage(state.selectedPageKey || '')

  return useMemo(
    () =>
      state.selectedPageKey ? (
        <WebPageDetail
          key={state.selectedPageKey}
          initWebpage={webpage}
          pageKey={state.selectedPageKey}
        />
      ) : (
        <Empty>
          <div>请选择一个页面查看</div>
        </Empty>
      ),
    [state.selectedPageKey]
  )
}
