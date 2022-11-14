import {useEffect, useState} from "react";
import {WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/generateApi";
import dayjs from "dayjs";
import * as React from "react";
import CheckVersion from "../components/CheckVersion";


export default function Trash() {
    const [list,setList] = useState<WebPage[]>([])

    useEffect(function () {
        loadTrashList()
    },[])

    function loadTrashList() {
        extApi.lightpage.queryPages({
            query:{
                deleted: true
            },
            limit: 999,
        }).then((res)=>{
            if(res.success){
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
            <table className="table table-compact w-full min-h-100">
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
                                        {item.title}
                                    </div>
                                    <a href={item.url}>
                                        {item.url || item.key}
                                    </a>
                                </td>
                                <td>{dayjs(item.updateAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                <td>
                                    <button onClick={()=>{removeItem(item.key)}} className="m-2 btn btn-sm btn-success">
                                        彻底删除
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
                <tfoot>
                <tr>
                    <th>共计{list.length}</th>
                    <th colSpan={3}>
                        <button onClick={removeAll} className="btn btn-outline btn-success">
                            清空
                        </button>

                    </th>
                </tr>
                </tfoot>
            </table>
        </CheckVersion>
    )
}
