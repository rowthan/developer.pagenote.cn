import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/generateApi";
import useSWR from "swr";
import User = user.User;


export default function useUserInfo():[User|undefined,()=>void] {
    const {data} = useSWR<User>('/user',fetchInfo);

    function fetchInfo() {
        return extApi.user.getUser(undefined).then(function (res) {
            return res.data
        })
    }

    return [data,fetchInfo]
}
