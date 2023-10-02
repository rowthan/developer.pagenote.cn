import useSWR from 'swr'
import {unionFetch} from "../utils/fetch";
import {AuthType} from "../const/oauth";

type PlatInfo = { platformUrl: string; platformIcon: string; bindUrl: string }

export type AuthInfo = {
    authType: AuthType
    authName: string
    authAvatar: string
    avatar?: string
    authEmail?: string
    authId?: string
} & PlatInfo


function fetchAuthList(cacheDuration = 2 * 1000) {
    return unionFetch<{
        authList: AuthInfo[]
    }>(
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
            const list = (res?.data?.authList || []).map(function (item) {
                item.authType = item.authType.toLowerCase() as AuthType;
                return item;
            })
            return list;
        })
}

export function unbindAuth(auth: AuthInfo) {
    return unionFetch({
        data: {
            mutation: `mutation makeUnbind($authId:String,$authType:String) {unBindAuth(authId:$authId,authType:$authType){data}}`,
            variables: {
                authId: auth.authId,
                authType: auth.authType
            },
        },
        method: 'POST',
        url: '/api/graph/auth/',
    })
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
