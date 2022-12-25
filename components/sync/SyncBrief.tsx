import {SyncTaskActionsMap} from "@pagenote/shared/lib/library/syncStrategy";
import {useState} from "react";
import Diff from "./Diff";
import get from "lodash/get";

function Value(props: { number: number, onClick?:()=>void }) {
    const {number,onClick=()=>{}} = props;
    if(number===0){
        return <span>✅</span>
    }
    return <span onClick={onClick} className={`text ${number > 0 ? 'text-red-500 font-bold' : ''}`}>{number}</span>
}

export default function SyncBrief(props: { taskMap: SyncTaskActionsMap }) {

    const [detailKey,setDetailKey] = useState('')

    const {
        clientDelete,
        clientUpdate,
        clientAdd,
        conflict,
        serverDelete,
        serverUpdate,
        serverAdd,
    } = props.taskMap;


    return (
        <div>
            <div className={`modal modal-${detailKey?'open':'close'}`}>
                <div className="modal-box max-w-4xl">
                    <label htmlFor="my-modal-3"
                           onClick={()=>{setDetailKey('')}}
                           className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <Diff taskMap={get(props.taskMap,detailKey) || new Map()} />
                    {/*<div className="modal-action">*/}
                    {/*    <button className="btn" onClick={()=>{setDetailKey('')}}>关闭</button>*/}
                    {/*</div>*/}
                </div>
            </div>
            <table className="schema-table table table-compact w-full">
                <thead>
                <tr>
                    <th>变更类型</th>
                    <th>插件</th>
                    <th>文件夹</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>
                        <div className="tooltip" data-tip="按更新时间自动处理">
                            <span>冲突</span>
                        </div>
                    </th>
                    <td>
                        <Value number={conflict.size} onClick={()=>{setDetailKey('conflict')}}/>
                    </td>
                    <td>
                        <Value number={conflict.size} onClick={()=>{setDetailKey('conflict')}}/>
                    </td>
                </tr>
                <tr>
                    <th>待新增</th>
                    <td>
                        <Value number={clientAdd.size} onClick={()=>{setDetailKey('clientAdd')}}/>
                    </td>
                    <td>
                        <Value number={serverAdd.size} onClick={()=>{setDetailKey('serverAdd')}}/>
                    </td>
                </tr>

                <tr>
                    <th>待删除</th>
                    <td>
                        <Value number={clientDelete.size} onClick={()=>{setDetailKey('clientDelete')}}/>
                    </td>
                    <td>
                        <Value number={serverDelete.size} onClick={()=>{setDetailKey('serverDelete')}}/>
                    </td>
                </tr>

                <tr>
                    <th>待更新</th>
                    <td>
                        <Value number={clientUpdate.size} onClick={()=>{setDetailKey('clientUpdate')}}/>
                    </td>
                    <td>
                        <Value number={serverUpdate.size} onClick={()=>{setDetailKey('serverUpdate')}}/>
                    </td>
                </tr>
                </tbody>
            </table>
            <div>

            </div>
        </div>
    )
}
