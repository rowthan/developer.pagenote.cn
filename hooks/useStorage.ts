import useSWR from 'swr'
import extApi from '@pagenote/shared/lib/pagenote-api'

type Storage = {
  usage: number
}
export default function useStorage(
  dbName: string,
  tableName: string
): [Storage, boolean] {
  const { data, isLoading } = useSWR<Storage>(
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
        maxAgeMillisecond: 3600 * 1000,
      },
      scheduleControl: {
        runAfterMillisecond: [0, 60 * 1000],
      },
    }
    return extApi.table.stat(
      {
        db: dbName,
        table: tableName,
        params: undefined,
      },
      header
    )
  }

  function fetchData() {
    return fetchByTable().then(function (res) {
      return res.data || { usage: 0 }
    })
  }

  return [data || { usage: 0 }, isLoading]
}
