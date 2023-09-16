import useSWR from 'swr'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { AUTH_LIST } from '../components/account/AuthBottoms'

type PlatInfo = { platformUrl: string; platformIcon: string; bindUrl: string }

type AuthInfo = {
  authType: string
  authName: string
    authAvatar: string
    avatar?: string
} & PlatInfo

const GitHubConfig = {
  platformUrl: 'https://github.com/settings/installations',
  platformIcon: 'https://github.githubassets.com/favicons/favicon.svg',
  bindUrl: AUTH_LIST[0].link,
}
export const authMap: Record<string, PlatInfo> = {
  GitHub: GitHubConfig,
  github: GitHubConfig,
  notion: {
    platformUrl: 'https://www.notion.so/my-integrations',
    platformIcon: 'https://www.notion.so/images/favicon.ico',
    bindUrl: AUTH_LIST[1].link,
  },
}

function fetchAuthList(cacheDuration = 2 * 60 * 1000) {
  return extApi.network
    .pagenote(
      {
        data: {
            query: `query{authList{authType,authName,authId,authAvatar}}`,
        },
        method: 'GET',
        url: '/api/graph/auth/',
      },
      {
        cacheControl: {
          maxAgeMillisecond: cacheDuration,
        },
      }
    )
    .then(function (res) {
      const list = (res.data?.json?.data?.authList || []) as AuthInfo[]
        return list;
    })
}

export default function useAuthList(): [AuthInfo[], () => void] {
  const { data = [], mutate } = useSWR<AuthInfo[]>(
      '/authList',
      () => fetchAuthList(4000),
      {
          fallbackData: [],
      }
  )

  return [data, mutate]
}
