import useSWR from 'swr'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { get } from 'lodash'

type Storage = {
  usage?: number
}
export default function useStorage(
  dbName: string,
  tableName: string
): [Storage | undefined] {
  const { data } = useSWR<Storage>(
    '/storage-local/' + dbName + tableName,
    fetchData
  )

  function fetchData() {
    let method = extApi.page.stat
    if (get(extApi, tableName)) {
      method = get(extApi, tableName)
    }
    return method(undefined, {
      cacheControl: {
        maxAgeMillisecond: 3600 * 24 * 1000,
      },
      scheduleControl: {
        runAfterMillisecond: [0, 3600 * 1000],
      },
    }).then(function (res) {
      console.log(res, '统计结果')
      return {
        usage: res.data.usage,
      }
    })
  }

  return [data]
}
