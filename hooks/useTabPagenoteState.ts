import useSWR from "swr";
import {fetchStatus} from "../utils/popup";

type TabState = {
    connected: false,
    active: false,
    enabledCopy: false,
}
export default function useTabPagenoteState(tabId?: number):[TabState | undefined,()=>void,boolean] {
    const {data,mutate,isLoading} = useSWR<TabState>(`/tab/state/${tabId}`,function () {
        return fetchStatus(tabId)
    });

    return [data,mutate,isLoading]
}
