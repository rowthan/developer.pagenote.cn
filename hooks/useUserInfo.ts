import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/generateApi";
import useSWR from "swr";
import User = user.User;

function fetchInfo() {
    return extApi.user.getUser(undefined).then(function (res) {
        return res.data
    })
}

export default function useUserInfo():[User|undefined,()=>void] {
    const {data,mutate} = useSWR<User|undefined>('/user',fetchInfo);

    return [data,mutate]
}
