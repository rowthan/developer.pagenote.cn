import useSWR from 'swr'
import { WebPage } from '@pagenote/shared/lib/@types/data'
import extApi from '@pagenote/shared/lib/pagenote-api'

export default function useWebpage(key: string) {
  const { data, isLoading, mutate } = useSWR<WebPage | null>(
    '/detail/' + key,
    fetchInfo
  )
  function fetchInfo() {
    if (!key) {
      return Promise.resolve(null)
    }
    return extApi.lightpage
      .getLightPageDetail({
        key: key,
      })
      .then(function (res) {
        return res.data
      })
  }

  return {
    data,
    isLoading,
    mutate,
  }
}
