import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import { Find } from '@pagenote/shared/lib/@types/database'
import { Collection, dbTableMap } from '../../const/collection'

export default function useTableQuery<T>(
  collection: Collection,
  find: Find<T>
) {
  const {
    data = [],
    isLoading,
    mutate,
  } = useSWR<Partial<T>[]>(function () {
    return `/collection/${collection}/${JSON.stringify(find)}`
  }, fetchData)

  function fetchData() {
    return extApi.table
      .query({
        ...dbTableMap[collection],
        params: find,
      })
      .then(function (res) {
        return res.data.list as Partial<T>[]
      })
  }

  return {
    data,
    isLoading,
    mutate,
  }
}
