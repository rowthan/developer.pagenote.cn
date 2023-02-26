import {useEffect, useState} from "react";
import extApi from "@pagenote/shared/lib/pagenote-api";
import {localResource} from "@pagenote/shared/lib/extApi";
import LocalResource = localResource.LocalResource;
import dayjs from "dayjs";
import {onVisibilityChange} from "@pagenote/shared/lib/utils/document";
import {getDomain} from "@pagenote/shared/lib/utils/filter";
import {basePath} from "../../const/env";
import Empty from "../Empty";

export default function LocalHTML() {
    const [group, setGroup] = useState<Record<string, Partial<LocalResource>[]>>({});

    useEffect(function () {
        fetchList();
        return onVisibilityChange(function () {
            fetchList()
        })
    }, [])

    function fetchList() {
        extApi.localResource.group({
            groupBy: 'relatedPageUrl',
            projection: {
                data: -1
            },
        }).then(function (res) {
            setGroup(res.data)
        })
    }


    let list: { url: string, name?: string, versions: Partial<LocalResource>[] }[] = []
    for (let i in group) {
        list.push({
            url: i,
            name: group[i][0].name,
            versions: group[i],
        })
    }
    list = list.sort(function (pre,next) {
        return pre.versions.length > next.versions.length ? 1 : -1
    })

    if(list.length===0){
        return <div>
            <Empty>
                <div>
                    还没有 <key-word preview={'1'}>离线网页</key-word>，去尝试一下吧。
                </div>
            </Empty>
        </div>
    }

    return (
        <div className={'grid grid-cols-5 gap-4 p-2'}>
            {
                list.map((item) => (
                    <div className="stack" key={item.url}>
                        {
                            item.versions.map((version) => (
                                <a target={'_blank'}
                                   href={version.localUrl || `${basePath}/ext/offline.html?id=${version.resourceId}&url=${version.relatedPageUrl}`}
                                   key={version.createAt}
                                   className="w-full h-full text-center border border-base-content card bg-base-100">
                                    <div className={'card-body text-sm'}>
                                            <span>
                                                {dayjs(version.createAt).format('YYYY-MM-DD HH:mm:ss')}
                                            </span>
                                        <div>{item.name}</div>
                                        <div>{getDomain(version.originUrl||'',false)}</div>
                                    </div>
                                </a>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}
