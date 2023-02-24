import {Table,Page} from '@pagenote/notion-database'
import { useEffect, useRef, useState } from 'react'
import { Client } from '@notionhq/client';
import {SupportedRequestInit} from '@notionhq/client/build/src/fetch-types'
import {PageObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import extApi from '@pagenote/shared/lib/pagenote-api'

const token = "secret_s6ezvxrLA98j38biD2eiDcrBDRkGniMMZMYwfA2BwRv"

const config = {
    rootPage:"55ab36de-de9d-4df9-8ba2-e887a5c1003a",
    clipboard:"",
    page:"",
    light:"",
}

export default function Data() {
    const [root,setRoot] = useState<Page<any>|null>(null)
    const [listPages,setListPages] = useState<PageObjectResponse[]>([]);
    const [tableMap,setTableMap] = useState<Record<string,Table<any>>>({})


    const client = new Client({
        auth: token,
        // @ts-ignore
        fetch: function(url: string, init?:any){
            return extApi.network.fetch({
                url: url,
                headers: init.headers,
                body: init.body,
                method: init.method,
            }).then(function(res){
                const object = {
                    ...res.data,
                    text: function(){
                        return Promise.resolve(res.data.body)
                    }
                }
                return object
            })
        }
    })



    useEffect(function(){
        setRoot(new Page({
            pageId: config.rootPage,
            notion: client,
        }))
        const tables = {
            clipboard: new Table({
                notion: client,
                database_id: config.clipboard,
                cloudDescribe: null,
                demoData: null,
                onError: function(){},
                token:""
            }),
            light: new Table({
                notion: client,
                database_id: config.clipboard,
                cloudDescribe: null,
                demoData: null,
                onError: function(){},
                token:""
            }),
            page: new Table({
                notion: client,
                database_id: config.clipboard,
                cloudDescribe: null,
                demoData: null,
                onError: function(){},
                token:""
            })
        }

        setTableMap(tables)

        // client.request({
        //     path:"/getRecentPageVisits",
        //     method:"get"
        // })
        // client.pages.retrieve({
        //     page_id:"55ab36de-de9d-4df9-8ba2-e887a5c1003a"
        // }).then(function(res){
        //     console.log(res,'page')
        // })

        // client.blocks.children.list({
        //     block_id: "55ab36de-de9d-4df9-8ba2-e887a5c1003a"
        // }).then(function(res){
        //     console.log(res,'blocks')
        // })

        client.search({
            query:"",
            filter: {
                property: "object",
                value: "page",
            },
            // page_size: 4,
            // sort: {
            //     timestamp: "last_edited_time",
            //     direction: "descending",//"ascending" // "descending";
            // }
        }).then(function(res){
            const list = res.results.filter(function(item){
                return (item as PageObjectResponse)?.parent?.type === 'workspace'
            }) as  PageObjectResponse[];
            setListPages(list)
            console.log(res,'执行结果',list)
        })
    },[])

    return(
        <div className={'max-w-lg m-auto mt-24'}>
            <div>
                根页面：{root?.shortPageId ? root.shortPageId : '请选择'}
            </div>
            <div>
                {
                    listPages.map((item)=>(
                        <div key={item.id}>
                            {item.properties.title?.title[0].plain_text}
                        </div>
                    ))
                }
            </div>

            <div>
                <h2>存储表</h2>
                <ul>
                    <li>
                        clipboard: 
                    </li>
                </ul>
            </div>
        </div>
    )
}
