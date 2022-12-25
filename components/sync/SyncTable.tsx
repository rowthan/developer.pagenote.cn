import {useEffect, useRef, useState} from "react";
import SyncStrategy, {SYNC_ACTION, SyncTaskActionsMap} from "@pagenote/shared/lib/library/syncStrategy";
import LocalFileSystem from '@pagenote/shared/lib/library/localFileSystem'
import SyncBrief from "./SyncBrief";
import {getSyncByDir} from "../../utils/sync";
import {DataBasic, TableNameType} from "../../utils/sync/const";
import {onVisibilityChange} from "@pagenote/shared/lib/utils/document";

enum SyncState {
    unset = 1,
    computing = 2,
    computeError = 6,
    waitingResolve = 3,
    resolving = 4,
    resolved = 5,
    resolvedError = 6
}

const labelName: Record<SyncState, string> = {
    [SyncState.unset]: '统计差异',
    [SyncState.computing]: '比较中...',
    [SyncState.computeError]: '统计失败❌',
    [SyncState.waitingResolve]: '点击同步',
    [SyncState.resolving]: '同步中...',
    [SyncState.resolved]: '已同步',
    [SyncState.resolvedError]: '同步失败❌',
}

export default function SyncTable(props: { tableName: TableNameType, localFileSystem: LocalFileSystem }) {
    const {tableName, localFileSystem} = props;
    const [errorMsg,setErrorMsg] = useState('')

    const [state, setState] = useState(SyncState.unset)
    const [syncTask, setSyncTask] = useState<SyncTaskActionsMap>({
        clientAdd: new Map(),
        clientDelete: new Map(),
        clientUpdate: new Map(),
        conflict: new Map(),
        serverAdd: new Map(),
        serverDelete: new Map(),
        serverUpdate: new Map()
    });

    let totalDiff = 0;
    for(let i in syncTask){
        totalDiff += syncTask[i as SYNC_ACTION].size;
    }

    const syncClient = useRef<SyncStrategy<DataBasic>>()

    useEffect(function () {
        // @ts-ignore
        syncClient.current = getSyncByDir(tableName,localFileSystem)
        if (state === SyncState.unset && localFileSystem.rootName) {
            computeTask();
        }
    }, [localFileSystem,tableName])

    useEffect(function () {
        return onVisibilityChange(function (hide) {
            if(!hide){
                console.log('visible change')
                computeTask()
            }
        })
    },[])

    function computeTask() {
        if(!localFileSystem.rootName){
            return;
        }
        if (state === SyncState.computing) {
            return
        }
        setState(SyncState.computing)
        setErrorMsg('')
        console.time('记录'+tableName)
        syncClient.current?._computeSyncTask().then(function (res) {
            setState(SyncState.waitingResolve)
            setSyncTask(res)
        }).catch(function (reason) {
            console.error(reason)
            setState(SyncState.computeError)
            setErrorMsg(reason.toString())
        }).finally(function () {
            console.timeEnd('记录'+tableName)
        })
    }

    function doSync() {
        setState(SyncState.resolving)
        syncClient.current?.sync().then(function (res) {
            setState(SyncState.resolved)
            setTimeout(function () {
                computeTask();
            },2000)
        }).catch(function (reason) {
            setState(SyncState.resolvedError)
            setErrorMsg(reason.toString())
        })
    }

    function onClick() {
        if(totalDiff > 0){
            doSync()
        }else{
            computeTask()
        }
    }


    const waitingResolve = state === SyncState.waitingResolve;
    const synced = waitingResolve && totalDiff === 0
    const loading = [SyncState.resolving].includes(state);
    const disabled = [SyncState.computing,SyncState.resolving].includes(state);
    return (
        <div>
            <div className={'flex justify-between my-2'}>
                <h2 className="badge badge-outline">{tableName}</h2>
                <div>
                    {synced &&
                        <div className={'text-xs text-gray-400'}>
                            已保持同步
                        </div>}
                </div>
            </div>
            <SyncBrief taskMap={syncTask}/>
            <div className={'flex justify-end'}>
                <button disabled={disabled}
                        className={`btn btn-sm ${loading ? 'loading' : ''}  w-full`}
                        onClick={onClick}>
                    {synced ? '已同步' : labelName[state]}
                    {totalDiff > 0 ? <span>({totalDiff})</span> : ''}
                </button>
            </div>
            <div className={'text-sm text-red-500'}>
                {errorMsg}
            </div>
        </div>
    )
}
