import { user } from '@pagenote/shared/lib/extApi'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import User = user.User

type UserInfo = {
  leftPermanent?: number
} & User

export function fetchUserInfo(forceRefresh: boolean = false) {
  return extApi.user.getUser({ refresh: forceRefresh }).then(function (res) {
    return res.data
  })
}

export default function useUserInfo(): [
  UserInfo | undefined | null,
  () => void,
  (token: string | null) => void
] {
  const { data, mutate } = useSWR<UserInfo | undefined | null>('/user', () => {
    return fetchUserInfo(false)
  })

  function setToken(token: string | null) {
    if (!token) {
      // @ts-ignore
      extApi.user.signout && extApi.user.signout()
    }
    // @ts-ignore
    return extApi.user.setUserToken(token).then(function () {
      fetchUserInfo(true).then(function () {
        mutate()
      })
    })
  }

  return [data, mutate, setToken]
}
