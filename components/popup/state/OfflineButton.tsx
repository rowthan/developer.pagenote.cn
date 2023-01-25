import extApi from "@pagenote/shared/lib/generateApi";
import OfflineSvg from "assets/svg/offline_download.svg";
import TipInfoSvg from "assets/svg/info.svg";
import useTabPagenoteState from "hooks/useTabPagenoteState";
import {useEffect, useState} from "react";
import {localResource} from "@pagenote/shared/lib/extApi";
import LocalResource = localResource.LocalResource;
import useCurrentTab from "hooks/useCurrentTab";
import {toast} from "utils/toast";

export default function OfflineButton() {
    const [tabState] = useTabPagenoteState();
    const {tab} = useCurrentTab();
    const [resourceList, setList] = useState<Partial<LocalResource>[]>([])

    function offlineHtml() {
        extApi.developer.requestFront({
            params: {
                cssToInline: true,
                imageToLocal: false,
                removeScript: true
            },
            type: 'offlineHTML'
        }).then(function (res) {
            if (res?.data?.data?.localURL) {
                window.open(res.data.data.localURL)
            }
            fetchResourceList()
            toast('离线化成功。')
            console.log(res.data.data, 'offline res')
        })
    }

    function fetchResourceList() {
        if (!tab?.url) {
            return
        }
        extApi.localResource.query({
            query: {
                relatedPageUrl: tab.url
            },
            page: 0,
            pageSize: 9999,
            projection: {
                resourceId: 1,
            }
        }).then(function (res) {
            if (res.success) {
                setList(res.data.list || [])
            }
        })
    }

    function gotoOffline(e: { stopPropagation: () => void; }) {
        e.stopPropagation();
        // @ts-ignore
        window.open(resourceList[0].localURL || `/ext/offline.html?id=${resourceList[0].resourceId}`)
    }

    useEffect(function () {
        fetchResourceList();
    }, [tab])

    return (
        <button onClick={offlineHtml}
                disabled={!tabState?.connected}
                className={`w-60 m-auto btn btn-sm rounded  mx-1 ${resourceList.length > 0 ? "btn-primary text-white" : "btn-outline"}`}>
            <OfflineSvg className={'fill-current'}/> 网页离线化
            <span className={`tooltip tooltip-bottom tooltip-info align-bottom`}
                  data-tip={'将当前访问的网页永久保存为离线网页。'}>
                <TipInfoSvg className={'fill-current'}/>
            </span>
            {
                resourceList.length > 0 &&
                <button data-tip={'点击查看历史快照'} className={'tooltip btn btn-xs btn-outline'} onClick={gotoOffline}>{resourceList.length}</button>
            }
        </button>
    )
}
