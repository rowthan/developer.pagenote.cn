import {useEffect, useState} from "react";
import {WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/generateApi";
import dayjs from "dayjs";
import * as React from "react";
import CheckVersion from "../../components/check/CheckVersion";
import Table from "../../components/Table";
import {Pagination, QueryValue} from "@pagenote/shared/lib/@types/database";
import {onVisibilityChange} from "@pagenote/shared/lib/utils/document";
import SearchIcon from '../../assets/svg/search.svg'
import CloseIcon from '../../assets/svg/close.svg'
import Breadcrumbs from "../../components/Breadcrumbs";
import {developer} from "@pagenote/shared/lib/extApi";
import LogInfo = developer.LogInfo;
import BasicLayout from "../../layouts/BasicLayout";

export default function Pages() {
    const [list, setList] = useState<LogInfo[]>([])
    const [pagination, setPagination] = useState<Pagination>({
        page: 0,
        pageSize: 20,
        total: 0,
    })
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(function () {
        return onVisibilityChange(function () {
            loadPages();
        })
    }, [])

    useEffect(function () {
        loadPages()
    }, [pagination.page, pagination.pageSize])

    /**拉取页面数据*/
    function loadPages() {
        extApi.developer.logs({
            query:{
              // level: 'info'
            },
            limit: pagination.pageSize,
            page: pagination.page,
            pageSize: pagination.pageSize,
            sort: {
                createAt: -1
            },
            projection:{
                json: -1,
                meta: -1
            }
        }).then((res) => {
            if (res.success) {
                setList((res.data.list || []) as LogInfo[])
                setPagination({
                    ...pagination,
                    page: res.data.page || 0,
                    total: res.data.total || 0,
                })
            }
        })
    }

    /**分页器修改*/
    function changePagination(page: number, pageSize: number) {
        setPagination({
            pageSize: pageSize,
            page: page,
            total: pagination.total
        })
    }

    return (
        <BasicLayout>
            <CheckVersion requireVersion={'0.24.2'}>
                <div className='mx-auto'>
                    <Table list={list}
                           pageSteps={[10,50,100]}
                           disableSelect={true}
                           pagination={pagination}
                           onPaginationChange={changePagination}
                           selectedIds={selectedIds}
                           onSelectIds={setSelectedIds}
                           primaryKey={'id'}
                           headLabels={["分组", "级别","更新时间","日志内容",  "操作"]}
                           renderTDS={function (item: LogInfo, index) {
                               return (
                                   <>
                                       <td className='w-10'>
                                           <div className='max-w-md overflow-hidden	overflow-ellipsis truncate'>
                                               {/*<img className='inline' width={14} height={14} src={item.icon} alt=""/>*/}
                                               {item.namespace}
                                           </div>
                                       </td>
                                       <td className='pre-wrap '>
                                           <span key={index} className="badge badge-ghost badge-sm">{item.level}</span>
                                       </td>

                                       <td className={`text-sm` }>{dayjs(item.createAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                       <td className={`text-${item.level}`}>
                                           {item.message || item.stack}
                                       </td>
                                   </>
                               )
                           }}
                    />
                </div>
            </CheckVersion>
        </BasicLayout>
    )
}
