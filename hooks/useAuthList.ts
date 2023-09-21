import useSWR from 'swr'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { AUTH_LIST } from '../components/account/AuthBottoms'
import {unionFetch} from "../utils/fetch";

type PlatInfo = { platformUrl: string; platformIcon: string; bindUrl: string }

export type AuthInfo = {
  authType: string
  authName: string
    authAvatar: string
    avatar?: string
    authEmail?: string
    authId?: string
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
    platformIcon: 'https://pagenote-public.oss-cn-beijing.aliyuncs.com/_static/notion.ico',
    bindUrl: AUTH_LIST[1].link,
  },
    email:{
        platformUrl: '',
        platformIcon: 'https://pagenote.cn/favicon.ico',
        bindUrl: '',
    }
}

function fetchAuthList(cacheDuration = 2 * 1000) {
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

export function unbindAuth(auth: AuthInfo, isExt: boolean) {
    return unionFetch({
        data:{
            mutation: `mutation makeUnbind($authId:String,$authType:String) {unBindAuth(authId:$authId,authType:$authType){data}}`,
            variables: {
                authId: auth.authId,
                authType: auth.authType
            },
        },
        method: 'POST',
        url: '/api/graph/auth/',
    },isExt)
}

export default function useAuthList(): { data: AuthInfo[], mutate: () => void, isLoading: boolean } {
    const {data = [], mutate, isLoading} = useSWR<AuthInfo[]>(
        '/authList',
        () => fetchAuthList(),
        {
            fallbackData: [],
        }
    )

    return {
        data,
        mutate,
        isLoading
    }
}
