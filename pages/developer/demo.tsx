import BlogLayout from "../../layouts/blog";
import useWhoAmi from "../../hooks/useWhoAmi";
import {useEffect, useState} from "react";
import {WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/generateApi";
import dayjs from 'dayjs';

export default function () {
    const [whoAmI] = useWhoAmi();
    const [webpages,setWebpages] = useState<Partial<WebPage>[]>();

    useEffect(function () {
        extApi.lightpage.queryPages({
            limit: 5,
            sort: {
                createAt: -1
            }
        }).then(function (res) {
            if(res.success){
                setWebpages(res.data.list)
            }
        })
    },[])

    return(
        <BlogLayout post={{excerpt: '与PAGENOTE通信',title: '开发你自己的数据管理页面'}}>
            <div>
                <pre>
                    <code>import extApi from "@pagenote/shared/lib/generateApi";</code>
                </pre>
            </div>
            <div>
                <h2>示例1：<a href="https://github.com/rowthan/developer.pagenote.cn/blob/main/hooks/useWhoAmi.ts#L30">获取当前插件信息</a></h2>
                <pre>
                    <code>
                        extApi.user.getWhoAmI()
                    </code>
                </pre>
                <ul>
                    <li>平台： {whoAmI?.extensionPlatform}</li>
                    <li>版本： {whoAmI?.version}</li>
                </ul>
            </div>
            <h2 className='text'>
                示例2：<a href="https://github.com/rowthan/developer.pagenote.cn/blob/main/pages/demo.tsx#L13">拉取最近标记</a>
            </h2>
            <pre>
                <code>
                    extApi.lightpage.queryPages({"{"}
                        "limit": 5,
                        "sort": {"{"}
                            "createAt": -1
                        {"}"}
                    {"}"})
                </code>
            </pre>
            <ul>
                {
                    webpages?.map(function (webpage) {
                        return (
                            <li className='text-sm text-blue-600' key={webpage.key}>
                                <img className='inline m-0' src={webpage.icon} width={24} height={24} />
                                <a href={webpage.url || webpage.key}>{webpage.title || webpage.url || webpage.key}</a>
                                <div>
                                    <span>{dayjs(webpage.createAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </BlogLayout>
    )
}
