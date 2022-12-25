import {SyncTaskActionsMap, SyncTaskDetail, SyncTaskMap} from "@pagenote/shared/lib/library/syncStrategy";


export default function Diff(props:{taskMap: SyncTaskMap}) {
    const {taskMap=new Map()} = props;

    const list: SyncTaskDetail[] = []
    taskMap?.forEach(function (item) {
        list.push(item)
    })

    return(
        <table className="table w-full mt-4">
            <thead>
            <tr>
                <th>变更类型</th>
                <th>ID</th>
                <th>插件</th>
                <th>文件夹</th>
            </tr>
            </thead>
            <tbody>
                {
                    list.map(function (item) {
                        const diff = (item.localAbstract?.updateAt || 0) - (item.cloudAbstract?.updateAt || 0)
                        return(
                            <tr key={item.id}>
                                <td>
                                    {item.actionType}
                                    <div className={'text-xs'}>
                                        <span>
                                            时间差：{diff}ms
                                        </span>
                                    </div>
                                </td>
                                <td className={'max-w-xs break-all overflow-eclipis whitespace-normal text-xs'}>{item.id}</td>
                                <td>
                                    <span className='text-xs'>{item.localAbstract?.updateAt}</span>
                                    <div>
                                        {diff>0 ? <span className={'badge badge-info'}>领先</span> : <span className={'badge badge-error'}>滞后</span>}
                                    </div>
                                </td>
                                <td>
                                    <span className='text-xs'> {item.cloudAbstract?.updateAt}</span>
                                    <div className='text-xs'>
                                        {item.cloudAbstract?.c_id}
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
