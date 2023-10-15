import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import { Find } from '@pagenote/shared/lib/@types/database'

export default function useTableQuery<T>(
  db: string,
  table: string,
  find: Find<T>
): [Partial<T>[], () => void] {
  const { data = [], mutate } = useSWR<Partial<T>[]>(function () {
    return `/table/${table}/${JSON.stringify(find)}`
  }, fetchData)

  function fetchData() {
    return extApi.table
      .query({
        db: db,
        params: find,
        table: table,
      })
      .then(function (res) {
        return res.data.list as Partial<T>[]
      })
  }

  return [data, mutate]
}
