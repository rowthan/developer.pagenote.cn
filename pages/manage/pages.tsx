import {useEffect, useState} from "react";
import {WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/generateApi";
import dayjs from "dayjs";
import * as React from "react";
import CheckVersion from "../../components/CheckVersion";


export default function Pages() {
    const [list,setList] = useState<WebPage[]>([])
    const [pagination,setPagination] = useState({
        page: 0,
        limit: 10,
        total: 0,
    })

    useEffect(function () {
        loadPages()
    },[])

    function loadPages(skip=0) {
        extApi.lightpage.queryPages({
            query:{
                deleted: false
            },
            limit: pagination.limit,
            skip: skip,
            sort:{
                updateAt: -1
            },
            projection:{
                title: 1,
                url: 1,
                key: 1,
                updateAt: 1,
                icon: 1,
                categories: 1
            }
        }).then((res)=>{
            if(res.success){
                setList((res.data.list || []) as WebPage[])
                setPagination({
                    page: res.data.page || 0,
                    total: res.data.total || 0,
                    limit: res.data.limit || 10,
                })
            }
        })
    }

    function loadPagesByPage(page:number) {
        const skip = pagination.page * pagination.limit + list.length;
        loadPages(skip)
    }

    function detail(key: string) {
        extApi.lightpage.queryPages({
            query: {
                key: key
            },
            limit: 1
        }).then(function () {

        })
    }


    return(
        <CheckVersion requireVersion={'0.23.8'}>
            <table className="table table-compact w-3/4 min-h-100 m-10 mx-auto">
                <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                    </th>
                    <th>网页</th>
                    <th>标签</th>
                    <th>更新时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map(function (item) {
                        return (
                            <tr key={item.key}>
                                <td className=''>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td className='w-10'>
                                    <div className='max-w-full	overflow-ellipsis truncate'>
                                        <img className='inline' width={14} height={14} src={item.icon} alt=""/>
                                        {item.title}
                                    </div>
                                    <div className='max-w-full overflow-ellipsis truncate'>
                                        <a className='hover:text-blue-400 text-blue-200' target='_blank' href={item.url}>
                                            {item.url || item.key}
                                        </a>
                                    </div >
                                </td>
                                <td className='pre-wrap '>
                                    {item.categories?.map(function (item,index) {
                                        return <span key={index} className="badge badge-ghost badge-sm">{item}</span>
                                    })}
                                </td>
                                <td className='text-sm'>{dayjs(item.updateAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                <td>
                                    <button onClick={()=>{detail(item.key)}} className="m-2 btn btn-sm btn-success">
                                        查看详情
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
                <tfoot>
                <tr>
                    <th>共 {pagination.total} 个网页</th>
                    <th colSpan={4}>
                        <div className="btn-group">
                            <button disabled={pagination.page < 1} className="btn" onClick={()=>{loadPagesByPage(pagination.page - 1)}}>«</button>
                            <button className="btn">{pagination.page}</button>
                            <button className="btn" onClick={()=>{loadPagesByPage(pagination.page + 1)}}>»</button>
                        </div>
                    </th>
                </tr>
                </tfoot>
            </table>
        </CheckVersion>
    )
}
