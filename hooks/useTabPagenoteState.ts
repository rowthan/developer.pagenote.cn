import useSWR from 'swr'
import extApi from '@pagenote/shared/lib/pagenote-api'

function fetchStatus(tabId?: number) {
  // @ts-ignore
  return extApi.developer
    .requestFront({
      type: 'fetchStatus',
      params: undefined,
      header: {
        targetTabId: tabId,
        timeout: 2000,
      },
    })
    .then(function (res) {
      return res.data as TabState
    })
}

type TabState = {
  connected: false
  active: false
  enabledCopy: false
  keywords?: string[]
  description?: string
}
export default function useTabPagenoteState(
  tabId?: number
): [TabState | undefined, () => void, boolean] {
  const { data, mutate, isLoading } = useSWR<TabState>(
    `/tab/state/${tabId}`,
    function () {
      return fetchStatus(tabId)
    }
  )

  return [data, mutate, isLoading]
}
