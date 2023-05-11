import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import User = user.User;

type UserInfo = {
    leftPermanent?: number
} & User


export function fetchUserInfo(forceRefresh: boolean=false) {
    return extApi.user.getUser(undefined,{
        cacheControl:{
            maxAgeMillisecond: forceRefresh ? 0 : 10000
        }
    }).then(function (res) {
        return res.data
    })
}

export default function useUserInfo():[UserInfo|undefined,()=>void] {
    const {data,mutate} = useSWR<UserInfo|undefined>('/user',()=>{return fetchUserInfo(false)});

    return [data,mutate]
}
