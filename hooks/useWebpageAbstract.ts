
import useSWR from "swr";
import extApi from "@pagenote/shared/lib/pagenote-api";

export default function useWebpageAbstract(type: "page"|"light"|"html") {
    const {data,mutate}= useSWR<Record<string,any>>('/webpage/abstract',fetchAbstract,{
        fallbackData:{}
    });

    function fetchAbstract(){
        return extApi.page
    }

    return [data,mutate]
}