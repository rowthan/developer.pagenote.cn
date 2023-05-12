import useSWR from 'swr'
import { Step } from '@pagenote/shared/lib/@types/data'
import extApi from '@pagenote/shared/lib/pagenote-api'

export default function useLights(pageKey: string) {
  const { data, isLoading, mutate } = useSWR<Partial<Step>[]>(
    '/lights/' + pageKey,
    fetchInfo
  )
  function fetchInfo() {
    if (!pageKey) {
      return Promise.resolve([])
    }

    return extApi.lightpage
      .queryLights({
        query: {
          pageKey: pageKey,
        },
        pageSize: 9999,
      })
      .then(function (res) {
        console.log(res)
        return res.data?.list || []
      })

    // return extApi.light.query({
    //     query:{
    //         pageKey: pageKey
    //     },
    //     pageSize: 9999,
    // }).then(function (res) {
    //     console.log(res)
    //     return res.data?.list || []
    // })
  }

  return {
    data,
    isLoading,
    mutate,
  }
}
