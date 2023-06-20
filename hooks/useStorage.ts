import useSWR from 'swr'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { get } from 'lodash'

type Storage = {
  usage: number
}
export default function useStorage(
  dbName: string,
  tableName: string
): [Storage] {
  const { data } = useSWR<Storage>(
    '/storage/info/' + dbName + tableName,
    fetchData,
    {
      fallback: {
        usage: 0,
      },
    }
  )

  function fetchByTable() {
    const header = {
      cacheControl: {
        maxAgeMillisecond: 3600 * 2 * 1000,
      },
      scheduleControl: {
        runAfterMillisecond: [0, 3600 * 1000],
      },
    }
    switch (tableName) {
      case 'webpage':
        return extApi.page.stat(undefined, header)
      case 'light':
        return extApi.light.stat(undefined, header)
      case 'snapshot':
        return extApi.snapshot.stat(undefined, header)
      case 'html':
        return extApi.html.stat(undefined, header)
    }
    return extApi.page.stat(undefined, header)
  }

  function fetchData() {
    return fetchByTable().then(function (res) {
      return res.data || { usage: 0 }
    })
  }

  return [data || { usage: 0 }]
}
