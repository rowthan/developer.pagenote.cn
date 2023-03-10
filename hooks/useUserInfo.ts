import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import User = user.User;

type UserInfo = {
    leftPermanent?: number
} & User


function fetchInfo() {
    return extApi.user.getUser({}).then(function (res) {
        return res.data
    })
}

export default function useUserInfo():[UserInfo|undefined,()=>void] {
    const {data,mutate} = useSWR<UserInfo|undefined>('/user',fetchInfo);

    return [data,mutate]
}
