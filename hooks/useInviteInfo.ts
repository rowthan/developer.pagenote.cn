import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import User = user.User;

type InviteInfo = {
    inviteCode?: string
    inviteBrief?: string

    invitedList?: {}[]
}


export function fetchInfo(forceRefresh: boolean=false) {
    return extApi.network.pagenote({
        url: '/api/'
    }).then(function (res) {
        return res.data
    })
}

export default function useUserInfo():[InviteInfo|undefined,()=>void] {
    const {data,mutate} = useSWR<InviteInfo|undefined>('/invite',fetchInfo);

    return [data,mutate]
}
