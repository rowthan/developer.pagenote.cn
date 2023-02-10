import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/generateApi";
import useSWR from "swr";
import User = user.User;

function fetchInfo() {
    return extApi.network.pagenote({
        body: undefined,
        method: 'GET',
        url: "/user/",
        _config:{
            cacheDuration: 4000,
        }
    },{

    }).then(function (res) {
        return res.data as User
    })
}

export default function useUserInfo():[User|undefined,()=>void] {
    const {data,mutate} = useSWR<User>('/user',fetchInfo);

    return [data,mutate]
}
