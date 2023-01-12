import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/generateApi";
import useSWR from "swr";
import WhoAmI = user.WhoAmI;


export default function useWhoAmi():[WhoAmI|undefined,boolean] {
    const {data,isLoading,mutate} = useSWR<WhoAmI>('/whoAmI',fetchInfo,{
        fallbackData: {
            version: '',
            browser: "",
            browserPlatform: "",
            browserVersion: "",
            did: "",
            extensionId: "",
            isCN: false,
            isMac: false,
            isTest: false,
            language: "",
            mainVersion: "",
            name: "-",
            origin: "",
            platform: "",
            short_name: "",
            supportSDK: [],
        }
    });

    function fetchInfo() {
        return extApi.user.getWhoAmI(undefined,{
            timeout: 3000,
        }).then(function (res) {
            if(!res.data){
                setTimeout(function () {
                    mutate()
                },3000)
            }
            return res.data || null
        })
    }

    return [data,isLoading]
}
