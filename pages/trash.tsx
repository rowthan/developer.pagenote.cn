import {useEffect, useState} from "react";
import {WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/generateApi";
import dayjs from "dayjs";
import * as React from "react";
import CheckVersion from "../components/CheckVersion";
import {onVisibilityChange} from "@pagenote/shared/lib/utils/document";


export default function Trash() {
    const [list,setList] = useState<WebPage[]>([])

    useEffect(function () {
        loadTrashList()
        return onVisibilityChange(function () {
            loadTrashList();
        })
    }, [])

    function loadTrashList() {
        extApi.lightpage.queryPages({
            query: {
                deleted: true
            },
            limit: 100,
            sort: {
                updateAt: -1
            },
            projection: {
                title: 1,
                url: 1,
                key: 1,
                updateAt: 1,
                icon: 1
            }
        }).then((res) => {
            if (res.success) {
                setList((res.data.list || []) as WebPage[])
            }
        })
    }

    function removeItem(key: string) {
        extApi.lightpage.removePages({
            keys: [key]
        }).then(function () {
            loadTrashList();
        })
    }

    function revert(key: string) {
        extApi.lightpage.updatePages([{
            key: key,
            deleted: false,
        }]).then(function () {
            loadTrashList()
        })
    }

    function removeAll() {
        extApi.lightpage.removePages({
            keys: list.map(function (item) {
                return item.key
            })
        }).then(function () {
            loadTrashList()
        })
    }

    return(
        <CheckVersion requireVersion={'0.23.8'}>
            <table className="table table-compact w-3/4 min-h-100 m-10 mx-auto">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>网页</th>
                    <th>更新时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map(function (item,index) {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <div>
                                        <img className='inline' width={14} height={14} src={item.icon} alt=""/> {item.title}
                                    </div>
                                    <div className='overflow-ellipsis max-w-screen-sm break-words pre-wrap overflow-hidden max-w-xs'>
                                        <a className='hover:text-blue-400 text-blue-200' target='_blank' href={item.url}>
                                            {item.url || item.key}
                                        </a>
                                    </div >
                                </td>
                                <td>{dayjs(item.updateAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                <td>
                                    <button onClick={()=>{removeItem(item.key)}} className="m-2 btn btn-sm btn-warning">
                                        彻底删除
                                    </button>
                                    <button onClick={()=>{revert(item.key)}} className="m-2 btn btn-sm btn-success">
                                        恢复
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
                <tfoot>
                <tr>
                    <th>共 {list.length} 个删除网页</th>
                    <th colSpan={3}>
                        {
                            list.length> 0 &&
                            <button onClick={removeAll} className="btn btn-outline btn-success">
                                清空
                            </button>
                        }
                    </th>
                </tr>
                </tfoot>
            </table>
        </CheckVersion>
    )
}
