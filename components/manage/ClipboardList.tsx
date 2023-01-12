import dayjs from "dayjs";
import * as React from "react";
import {useEffect, useState} from "react";
import {onVisibilityChange} from "@pagenote/shared/lib/utils/document";
import extApi from "@pagenote/shared/lib/generateApi";
import {toast} from "../../utils/toast";
import useClipboardSync from "../../hooks/useClipboardSync";
import {Pagination} from "@pagenote/shared/lib/@types/database";
import {boxroom} from "@pagenote/shared/lib/extApi";
import TipSvg from 'assets/svg/info.svg'
import BoxItem = boxroom.BoxItem;

export default function ClipboardList() {
    const [list, setList] = useState<BoxItem[]>([])
    const [syncInfo] = useClipboardSync();
    const [pagination, setPagination] = useState<Pagination>({
        limit: 100,
        total: 0,
        page: 0
    })
    useEffect(function () {
        return onVisibilityChange(function () {
            loadTrashList();
        })
    }, [])

    useEffect(function () {
        loadTrashList()
    }, [pagination.page, pagination.limit])

    function loadTrashList() {
        extApi.boxroom.queryItems({
            sort:{
                createAt: -1
            },
            pageSize:100,
            page: 0,
            limit: 100,
        }).then((res) => {
            if (res.success) {
                setList((res.data.list || []) as BoxItem[])
                setPagination({
                    limit: pagination.limit,
                    page: pagination.page,
                    total: res.data.total,
                })
            }
        })
    }


    function removeItem(key: string) {
        extApi.boxroom.removeItems({
            ids: [key],
        }).then(function () {
            loadTrashList();
        })
    }

    function copyItem(text: string) {
        navigator.clipboard.writeText(text);
        toast('已复制')
    }
    return(
        <div>
            <div className='mx-auto p-3'>
                {
                    list.map(function (item) {
                        return(
                            <div  key={item.id} className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={item.icon} />
                                    </div>
                                </div>
                                <div className="chat-header">
                                        <span className='mr-2'>
                                            <a href={item.from} target='_blank'>{item.domain}</a>
                                        </span>
                                    <time className="text-xs opacity-50"> {dayjs(item.createAt).format(('YYYY-MM-DD HH:mm:ss'))}</time>
                                </div>
                                <div onClick={()=>{item.text && copyItem(item.text)}} className="break-all chat-bubble chat-bubble-accent text-sm">{item.text}</div>
                                <div className="chat-footer opacity-50 mt-1">
                                    <button className='btn btn-xs btn-outline' onClick={()=>removeItem(item.id || '')}>删除</button>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="alert shadow-lg">
                    <div>
                        <TipSvg width={32} height={32} />
                        <div>
                            <h3 className="font-bold">
                                {
                                    (syncInfo?.hasToken && syncInfo?.lastSyncAt) ? <span>与Notion同步于 {dayjs((syncInfo.lastSyncAt)).format('YYYY-MM-DD HH:mm:ss')}</span> : ''
                                }
                                {
                                    !syncInfo?.hasToken &&
                                    <span>尚未与 <a href="https://notion.so">Notion</a> 绑定，授权后可 <a href="https://page-note.notion.site/Notion-PAGENOTE-6a7353124e9d4d49a6a2bed07acff3df">将剪切板数据同步至Notion</a></span>
                                }
                            </h3>
                            <div className="text-xs">共计 {list.length} 条剪切板数据。保留30天内、最多100条数据。</div>
                        </div>
                    </div>
                    <div className="flex-none">
                        {
                            syncInfo?.manageUrl ? <button className='btn btn-sm'><a target={'_blank'} href={syncInfo.manageUrl}>在Notion中查看</a></button> :
                                <button className="btn btn-sm">
                                    <a target='_blank' href="https://www.bilibili.com/video/BV1TR4y1Q7Yf">了解Notion 同步方法</a>
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
