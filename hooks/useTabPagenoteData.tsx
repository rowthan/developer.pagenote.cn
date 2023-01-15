import { WebPage } from "@pagenote/shared/lib/@types/data";
import useCurrentTab from "./useCurrentTab";
import extApi from "@pagenote/shared/lib/generateApi";
import {useEffect, useState} from "react";

type TabState = {
    connected: false,
    active: false,
    enabledCopy: false,
}
export default function useTabPagenoteData():[WebPage|undefined,()=>void] {
    const {tab} = useCurrentTab();
    const [data,setData] = useState<WebPage|undefined>()

    useEffect(function () {
        fetchWebpage();
    },[tab])

    function fetchWebpage() {
        if(tab?.url){
            extApi.lightpage.getLightPageDetail({
                key: tab?.url
            }).then(function (res) {
                setData(res.data)
            })
        }
    }

    return [data,fetchWebpage]
}
