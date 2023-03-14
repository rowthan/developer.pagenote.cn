import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import debug from "debug";
import { fetchVersions } from "service";
import useWhoAmi from "./useWhoAmi";
import {isLow} from "@pagenote/shared/lib/utils/compare";

interface Version {
    title: string;
    version: string,
    release_time: Date,
    platform: string[],
    tags: string[],
    description: string
    changelog: string,
    _markdown?: string
}
type BookInfo = {list: Version[],latest: string,isOut: boolean}
export default function ():[BookInfo|undefined,()=>void] {
    const [whoAmI] = useWhoAmi();
    const {data} = useSWR<BookInfo>('/version/',fetchBookList,{
        fallbackData:{
            list:[],
            isOut: false,
            latest: ""
        }
    });

    function fetchBookList(cacheDuration?: number) {
        return extApi.network.pagenote({
            url:'/api/graph/site',
            method:'GET',
            data:{
                query: `{versions(released:true){version_id,expect_release_time,released,version,title,release_time,platform,description,tags,changelog,expect_release_time,description}}`
            },
            _config:{
                cacheDuration: cacheDuration || 10 * 60 * 60 * 1000
            }
        }).then(function (res) {
            return {
                list: res.data?.json?.data?.versions || [],
                isOut: false,
                latest: "",
            };
        })
    }

    const latestVersion = data?.list.find(function (item) {
        return item.platform.includes(whoAmI?.extensionPlatform || "");
    })
    return [{
        list: data?.list||[],
        latest: latestVersion?.version||"",
        isOut: isLow(whoAmI?.version,latestVersion?.version||"0.0.0")
    },fetchBookList]

}
