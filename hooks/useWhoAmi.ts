import {user} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import WhoAmI = user.WhoAmI;


export default function useWhoAmi():[WhoAmI|undefined|null,boolean] {
    const {data,isLoading,mutate} = useSWR<WhoAmI>('/whoAmI',fetchInfo,{
        fallbackData: {
            origin: "",
            extensionId: "",
            version: '',
            browser: "",
            browserPlatform: "",
            browserVersion: "",
            did: "",

            isCN: false,
            isMac: false,
            isTest: false,
            language: "",
            mainVersion: "",
            name: "-",

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
                },2000)
            }
            return res.data;
        })
    }

    return [data,isLoading]
}
