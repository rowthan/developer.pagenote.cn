import extApi from "@pagenote/shared/lib/generateApi";
import useSWR from "swr";
import {SyncStat} from "@pagenote/shared/lib/extApi";

export default function useClipboardSync():[SyncStat|undefined,()=>void] {

    const {data} = useSWR<SyncStat>('/clipboard/sync',fetchInfo,{
        fallbackData: {
            lastSyncAt: 0,
            connected: false,
            resolving: false,
            message: '',
            hasToken: false,
            manageUrl: ''
        }
    });

    function fetchInfo() {
        return extApi.boxroom.syncStat({sync: false}).then(function (res) {
            return res.data
        })
    }


    return [data,fetchInfo]
}
