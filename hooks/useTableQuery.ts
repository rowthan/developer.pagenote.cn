import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import { Find } from '@pagenote/shared/lib/@types/database'

export default function useTableQuery<T>(
  db: string,
  table: string,
  query: Find<T>
) {
  const { data = [] } = useSWR<Partial<T>[]>(function () {
    return `/table/${table}/${JSON.stringify(query)}`
  }, fetchData)

  function fetchData() {
    return extApi.table
      .query({
        db: db,
        params: query,
        table: table,
      })
      .then(function (res) {
        console.log(res, 'query result', query)
        return res.data.list as Partial<T>[]
      })
  }

  return data
}
