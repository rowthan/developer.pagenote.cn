import {useCallback, useEffect, useState} from "react";
import {Step, WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/generateApi";
import {QueryValue} from "@pagenote/shared/lib/@types/database";
import {useLazyEffect} from "../../hooks/userLazyEffect";
import set from 'lodash/set'
import get from "lodash/get";
import HighLightText from "../HighLightText";
import dayjs from "dayjs";

const LIGHT_PLACE_KEY = 'plainData.steps'

function mergeWebpage(webpage: Partial<WebPage>[], lights: Partial<Step>[]): Partial<WebPage>[] {
    const webpageMap = new Map<string, Partial<WebPage>>();
    webpage.forEach(function (item) {
        webpageMap.set(item.key as string, item)
    })
    lights.forEach(function (item) {
        const tempPage = webpageMap.get(item.pageKey as string);
        if (tempPage) {
            const currentSteps = get(tempPage, LIGHT_PLACE_KEY) || []
            currentSteps.push(item as Step);
            set(tempPage, LIGHT_PLACE_KEY, currentSteps)
        } else {
            webpageMap.set(item.pageKey || '', {
                key: item.pageKey,
                plainData: {
                    steps: [item as Step]
                }
            })
        }
    })
    const result:Partial<WebPage>[] = [];
    webpageMap.forEach(function (item) {
        result.push(item)
    })
    return result;
}

export default function Search(props: { keyword: string }) {
    const {keyword=''} = props;
    const [list, setList] = useState<Partial<WebPage>[]>([])

    const search = function () {
        // TODO 搜索所有tab 标签页
        if (keyword.trim()) {
            setList([])
            const regex = '.*' + (keyword || '').trim() + '.*'
            const orFilter: {
                [key in keyof WebPage]?: QueryValue
            }[] = ['title', 'url', 'categories'].map(function (key) {
                return {
                    [key]: {
                        $regex: regex,
                        $options: "i"
                    }
                }
            })

            extApi.lightpage.queryPages({
                query: {
                    deleted: false,
                    $or: orFilter
                },
                sort:{
                    updateAt: -1
                }
            }).then(function (item) {
                const pageResult = item?.data?.list || [];
                setList(pageResult)
                const orLightFilter: {
                    [key in keyof Step]?: QueryValue
                }[] = ['text', 'tip'].map(function (key) {
                    return {
                        [key]: {
                            $regex: regex,
                            $options: "i"
                        }
                    }
                })
                extApi.lightpage.queryLights({
                    query: {
                        deleted: false,
                        $or: orLightFilter
                    },
                    sort:{
                        updateAt: -1
                    }
                }).then(function (res) {
                    setList(mergeWebpage(pageResult, res?.data?.list||[]))
                })
            })
        } else {
            setList([])
        }
    }

    useLazyEffect(search, [keyword], 500)

    return (
        <div className={'p-2 w-full overflow-ellipsis'}>
            <div className={'text-gray-400 text-xs'}>
                {
                    keyword ? <span>PAGENOTE 为你找到  <mark>{keyword}</mark> 相关搜索标记约 {list.length} 个</span> :
                        <span>请输入搜索词</span>
                }
            </div>
            {/*分组 折叠，搜 pagenote笔记\搜标签页、搜扩展API*/}
            <ul>
                {list.map((item,index) => (
                    <li className={'mb-2 p-2 hover:bg-base-200 border-b'}  key={index} >
                        <div>
                            <a href={item.url || item.key} target={'_blank'} className={'max-w-full link link-primary text-md inline-block truncate'}>
                                <img src={item.icon} width={14} height={14} className={'inline-block'}/> <HighLightText hideOnUnMatch={false} keyword={keyword} text={item.title || item.key || ''} />
                            </a>
                            <div className={'text-gray-300 text-sm'}>
                                <time className={'mr-1'}>{dayjs(item.updateAt).format('YYYY-MM-DD')}</time>
                                <HighLightText keyword={keyword} text={item.description||''} />
                            </div>
                            {
                                item.categories?.map((category)=>(
                                    <HighLightText text={category} keyword={keyword} />
                                ))
                            }
                        </div>
                        <div>
                            {item.plainData?.steps.map( (light)=>(
                                <div key={light.key} className={'text-sm p-1'}>
                                    <span className={'badge badge-xs'} style={{backgroundColor: light.bg}}></span>
                                    {/*<HighLightText keyword={keyword} text={light.pre || ''} />*/}
                                    <span style={{borderColor: light.bg}} className={'border-b'}>
                                        <HighLightText keyword={keyword} text={light.text || ''} />
                                    </span>
                                    {/*<HighLightText keyword={keyword} text={light.suffix || ''} />*/}
                                    <HighLightText keyword={keyword} text={light.tip || ''} />
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
