import {useCallback, useEffect, useState} from "react";
import {Step, WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/pagenote-api";
import {QueryValue} from "@pagenote/shared/lib/@types/database";
import {useLazyEffect} from "../../hooks/userLazyEffect";
import set from 'lodash/set'
import get from "lodash/get";
import HighLightText from "../HighLightText";
import dayjs from "dayjs";
import { searchInExt } from "service/ext";

export default function Search(props: { keyword: string }) {
    const {keyword=''} = props;
    const [list, setList] = useState<Partial<WebPage>[]>([]);
    const [limit,setLimit] = useState(20);
    const [selected,setSelected] = useState<string[]>([])

    const search = function () {
        // TODO 搜索所有tab 标签页 多关键词搜索🔍
        if (keyword.trim()) {
            console.time(keyword)
            searchInExt(keyword,(result)=>{
                setList(result)
                console.timeEnd(keyword)
            })
        } else {
            setList([])
        }
    }

    function toggleAll() {
        if(selected.length===0){
            setSelected(list.map((item)=>item.key||""))
        }else{
            setSelected([])
        }
    }

    function toggleSelected(id: string) {
        const index = selected.indexOf(id);
        if(index!==-1){
            selected.splice(index,1)
        }else{
            selected.push(id)
        }
        setSelected([...selected])
    }

    function batchCopy() {

    }

    function batchDeleted() {
        // extApi.boxroom.removeItems({
        //     ids: selected
        // }).then(function (res) {
        //     if(res.success){
        //         setSelected([])
        //     }
        // })
    }

    useLazyEffect(search, [keyword], 500)

    const keywords = keyword.split(/\s+/);
    const selectedCnt = selected.length;

    return (
        <div className={'p-2 w-full overflow-ellipsis'}>
            <div className={'text-gray-400 text-xs'}>
                {
                    keyword ? <span>PAGENOTE 为你找到  {
                        keywords.map((item)=>(
                            <mark key={item} className="mx-1">{item}</mark> 
                        ))
                        }相关搜索标记约 {list.length} 个</span> :
                        <span>请输入搜索词</span>
                }
                <div className="my-4 flex items-center">
                    <input type="checkbox" onChange={toggleAll} checked={selectedCnt>0} className="checkbox mx-3"/>
                    <button onClick={batchDeleted} disabled={selectedCnt===0} className="btn btn-xs btn-error mx-2">
                        批量删除{selectedCnt>0?selectedCnt:''}
                    </button>
                    <button onClick={batchCopy} disabled={selectedCnt===0} className={'btn btn-xs btn-info mx-2'}>
                        批量复制{selectedCnt>0?selectedCnt:''}
                    </button>
                </div>
            </div>
            {/*分组 折叠，搜 pagenote笔记\搜标签页、搜扩展API*/}
            <ul>
                {list.slice(0,limit).map((item,index) => (
                    <li className={'mb-2 p-2 hover:bg-base-200 border-b'}  key={index} >
                        <div>
                            <aside className="inline-block relative">
                                <a href={item.url || item.key} target={'_blank'} className={'max-w-full link link-primary text-md inline-block truncate'}>
                                    <img src={item.icon} width={16} height={16} className={'inline-block'}/> <HighLightText hideOnUnMatch={false} keyword={keyword} text={item.title || item.key || ''} />
                                </a>
                                <input type="checkbox" onChange={()=>{toggleSelected(item.key||"")}} checked={selected.includes(item.key||"")}
                                               className="checkbox checkbox-info absolute left-0 top-0 bg-white bg-opacity-50" />
                            </aside>
                            
                            <div className={'text-gray-300 text-sm'}>
                                <time className={'mr-1'}>{dayjs(item.updateAt).format('YYYY-MM-DD')}</time>
                                <HighLightText hideOnUnMatch={true} keyword={keyword} text={item.description||''} />
                            </div>
                            {
                                item.categories?.map((category)=>(
                                   <span className="badge badge-sm" key={category}> <HighLightText text={category} keyword={keyword} /></span>
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
