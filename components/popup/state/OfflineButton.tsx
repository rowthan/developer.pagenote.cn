import extApi from "@pagenote/shared/lib/pagenote-api";
import OfflineSvg from "assets/svg/offline_download.svg";
import TipInfoSvg from "assets/svg/info.svg";
import useTabPagenoteState from "hooks/useTabPagenoteState";
import {useEffect, useState} from "react";
import {localResource} from "@pagenote/shared/lib/extApi";
import LocalResource = localResource.LocalResource;
import useCurrentTab from "hooks/useCurrentTab";
import {toast} from "utils/toast";
import {basePath} from "const/env";

export default function OfflineButton() {
    const [tabState] = useTabPagenoteState();
    const {tab} = useCurrentTab();
    const [resourceList, setList] = useState<Partial<LocalResource>[]>([])

    function offlineHtml() {
        extApi.developer.requestFront({
            params: {
                cssToInline: true,
                imageToLocal: true,
                removeScript: true
            },
            type: 'offlineHTML'
        }).then(function (res) {
            fetchResourceList()
            toast(res.error || '离线化成功。')
            setTimeout(function () {
                window.close();
            }, 1000)
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
                relatedPageUrl: 1,
            }
        }).then(function (res) {
            if (res.success) {
                setList(res.data.list || [])
            }
        })
    }

    function gotoOffline(e: { stopPropagation: () => void; }) {
        e.stopPropagation();
        window.open(resourceList[0].localUrl || `${basePath}/ext/offline.html?id=${resourceList[0].resourceId}&url=${resourceList[0].relatedPageUrl}`)
    }

    useEffect(function () {
        fetchResourceList();
    }, [tab])

    const cnt = resourceList.length;
    return (
        <div className={'w-60 flex'}>
            <button onClick={offlineHtml}
                    disabled={!tabState?.connected}
                    className={`w-full flex-shrink m-auto btn btn-sm rounded-none ${cnt > 0 ? "btn-primary text-white" : "btn-outline"}`}>
                <OfflineSvg className={'fill-current'}/> 网页离线化
                <span className={`tooltip tooltip-bottom tooltip-info align-bottom`}
                      data-tip={'将当前访问的网页永久保存为离线网页。'}>
                <TipInfoSvg className={'fill-current'}/>
            </span>
            </button>
            {
                cnt > 0 &&
                <button data-tip={`点击查看${cnt}个历史快照`}
                        className={'rounded-none tooltip btn btn-sm btn-outline btn-primary'}
                        onClick={gotoOffline}>{resourceList.length}</button>
            }
        </div>

    )
}
