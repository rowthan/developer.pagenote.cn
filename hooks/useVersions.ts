import extApi from "@pagenote/shared/lib/pagenote-api";
import { fetchVersions } from "service";
import useSWR from "swr";

export type Version = {
    title: string;
    version: string,
    release_time: Date,
    platform: string[],
    tags: string[],
    description: string
    changelog: string,
    _markdown?: string
}

export default function useVersions():[Version[]|undefined] {
    const {data=[],isLoading} = useSWR<Version[]>('/versions',fetchInfo,{
        fallbackData:[]
    });

    function fetchInfo() {
        return fetchVersions();
    }


    return [data]
}
