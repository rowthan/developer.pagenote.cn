import { user } from '@pagenote/shared/lib/extApi'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import User = user.User

type UserInfo = {
  leftPermanent?: number
} & User & {
  profile: {
    role?: number
  }
}

export function fetchUserInfo(forceRefresh: boolean = false) {
  return extApi.user.getUser({ refresh: forceRefresh }).then(function (res) {
    return (res.data || null) as UserInfo
  })
}

export default function useUserInfo(): [
  UserInfo | undefined | null,
  () => void,
  (token: string | null) => void
] {
  const {data, mutate} = useSWR<UserInfo | undefined | null>('/user', fetchUserInfo)

  function setToken(token: string | null) {
    // @ts-ignore
    return extApi.user.setUserToken(token).then(function (res) {
      mutate()
      fetchUserInfo(true).then(function () {
        mutate()
      })
    })
  }

  return [data, mutate, setToken]
}
