
import useSWR from "swr";
import extApi from "@pagenote/shared/lib/pagenote-api";
import {AbstractInfo} from "@pagenote/shared/lib/library/syncStrategy";
export default function useAbstract(type: "page"|"light"|"html"):[Record<string, AbstractInfo>]{
    const {data,mutate}= useSWR<Record<string, AbstractInfo>>(`/abstract/${type}`,fetchAbstract,{
        fallbackData:{}
    });

    function fetchAbstract(){
        const method = extApi[type].abstract;
        return method().then(function (res) {
            return res.data;
        })
    }

    return [data||{}]
}
