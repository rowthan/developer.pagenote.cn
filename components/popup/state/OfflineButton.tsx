import extApi from '@pagenote/shared/lib/pagenote-api'
import useTabPagenoteState from 'hooks/useTabPagenoteState'
import {useEffect, useState} from 'react'
import useCurrentTab from 'hooks/useCurrentTab'
import {toast} from 'utils/toast'
import {basePath} from 'const/env'
import {html} from '@pagenote/shared/lib/extApi'
import {RiDownloadCloudLine} from 'react-icons/ri'

import OfflineHTML = html.OfflineHTML
import ActionButton from "../../button/ActionButton";
import dayjs from "dayjs";
import useTableQuery from "../../../hooks/useTableQuery";
import {SnapshotResource} from "@pagenote/shared/lib/@types/data";
import { Badge } from "@/components/ui/badge"
import {Button} from "../../../@/components/ui/button";

export default function OfflineButton() {
    const [tabState] = useTabPagenoteState()
    const {tab} = useCurrentTab()
    const [resourceList] = useTableQuery<OfflineHTML>('resource', 'html', {
        limit: 9,
        query: {
            relatedPageUrl: tab?.url
        },
        projection: {
            resourceId: 1,
            relatedPageUrl: 1,
        },
    })

    function offlineHtml() {
        if (resourceList.length > 4) {
            alert('请删除历史离线版本后，再创建新版本')
            return;
        }
        extApi.developer
            .requestFront({
                params: {
                    cssToInline: true,
                    imageToLocal: true,
                    removeScript: true,
                },
                type: 'offlineHTML',
            })
            .then(function (res) {
                toast(res?.error || '离线化成功。')
                setTimeout(function () {
                    window.close()
                }, 1000)
            })
    }


    function gotoOffline(resourceList: Partial<OfflineHTML>) {
        window.open(
            resourceList.localUrl ||
            `${basePath}/ext/offline.html?id=${resourceList.resourceId}&url=${resourceList.relatedPageUrl}`
        )
    }

    const cnt = resourceList.length
    return (
        <div className={'flex'}>
            <ActionButton
                onClick={offlineHtml}
                disabled={!tabState?.connected}
                tip={'离线网页'}
                active={cnt > 0}
            >
                <RiDownloadCloudLine/>
            </ActionButton>
            <div className={'ml-2'}>
                {
                    resourceList.map((item, index) => (
                        <Button onClick={() => {
                            gotoOffline(item)
                        }} className={'text-xs mx-1 mb-1'} size={'sm'} variant="outline" key={index}>
                            v.{dayjs(item.createAt).format('MM/DD')}
                        </Button>
                    ))
                }
                {
                    resourceList.length === 0 &&
                    <span className={'text-sm text-color-200'}>保存当前网页为 HTML，离线状态下亦可访问。</span>
                }
            </div>
        </div>
    )
}
