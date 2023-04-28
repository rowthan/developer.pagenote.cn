import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import User = user.User;
import { BaseMessageHeader } from "@pagenote/shared/lib/communication/base";

type UserInfo = {
    leftPermanent?: number
} & User


export function fetchUserInfo(forceRefresh: boolean=false) {
    return extApi.user.getUser({
        forceRefresh: forceRefresh, // TODO 通过 cache 实现，删除 forceRefresh
    }).then(function (res) {
        return res.data
    })
}

export default function useUserInfo():[UserInfo|undefined,()=>void] {
    const {data,mutate} = useSWR<UserInfo|undefined>('/user',()=>{return fetchUserInfo(false)});

    return [data,mutate]
}
