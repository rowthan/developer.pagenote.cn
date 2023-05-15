import { user } from '@pagenote/shared/lib/extApi'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import WhoAmI = user.WhoAmI

export default function useWhoAmi(): [WhoAmI | undefined | null, boolean] {
  const { data, isLoading, mutate } = useSWR<WhoAmI>('/whoAmI', fetchInfo, {
    fallbackData: {
      version: '9.9.9',
    },
  })
  
  function fetchInfo() {
    return extApi.user
      .getWhoAmI(undefined, {
        timeout: 2000,
      })
      .then(function (res) {
        return res.data || {}
      })
  }

  return [data, isLoading]
}
