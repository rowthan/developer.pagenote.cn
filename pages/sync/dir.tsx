import BasicLayout from "../../layouts/BasicLayout";
import LocalFileSystem from '@pagenote/shared/lib/library/localFileSystem'
import {useEffect, useMemo, useRef, useState} from "react";
import SyncTable from "../../components/sync/SyncTable";
import {toast} from "../../utils/toast";
import useWhoAmi from "hooks/useWhoAmi";
import set from "lodash/set";
import throttle from 'lodash/throttle'
import { readForFile } from "utils/sync/file";
import { getExtBasicMethodByType } from "utils/sync/ext";
import SyncStrategy, { AbstractInfo,SyncTaskDetail } from "../../lib/SyncStrategy"//"@pagenote/shared/lib/library/syncStrategy";
import { WebPage } from "@pagenote/shared/lib/@types/data";
import md5 from "md5";
import extApi from "@pagenote/shared/lib/pagenote-api";


export default function DirSync() {
    const [localFile,setLocalFile] = useState(new LocalFileSystem({}));
    const [dirName, setDirName] = useState('');
    const [whoAmI] = useWhoAmi();
    const pageTable = useRef(null)
    function setDir() {
        const newFile = new LocalFileSystem({});
        setLocalFile(newFile);
        newFile.setRoot().then(r => {
            setDirName(r?.name || '');
        }).catch(function (reason) {
            toast('未授权成功。'+reason,'error')
        })
    }

    async function doSyncAll(doSync:boolean) {
        const tableName = 'snapshot'
        const FILE_PREFIX = '_'

        /**1. 设置注册**/ 
        const registerFile = `/table/${tableName}/${FILE_PREFIX}clients.json`;
        const registerString = await readForFile(localFile,registerFile,JSON.stringify({}));

        let registerManagerInfo: {
            [key: string]: {
                id: string,
                registerAt: number,
            }
        } = { };

        try{
            registerManagerInfo = JSON.parse(registerString)
        }catch(e){

        }

        const currentDidRegister = {
            id: whoAmI?.did,
            registerAt: Date.now()
        }
        set(registerManagerInfo,`${whoAmI?.did}`,currentDidRegister)
        localFile.writeFile(registerFile,JSON.stringify(registerManagerInfo))

        const tableRoot = `/table/${tableName}/${whoAmI?.did||""}/` //local 对应的文件夹根目录

        /**摘要比较*/

        function getFilePath(key: string,taskDetail?: SyncTaskDetail) {
            const filePath = taskDetail?.cloudAbstract?.self_id || `${tableRoot}/documents/${md5(key)}.${tableName}.json`
            return filePath
        }

        const syncByDir = new SyncStrategy<WebPage>({
            client: {
                cloud: {
                    computeAbstractByData: function(data){
                        if (!data) {
                            return null
                        }
            
                        const abstract: AbstractInfo = {
                            id: data.key,
                            self_id: getFilePath(data.key||""),
                            updateAt: data.updateAt
                        }
                        return abstract
                    },
                    getCurrentSnapshot: async function(){
                        const didtTableAbstract = `${tableRoot}/${FILE_PREFIX}documents_abstract.json`;
                        const abstractInfo = await readForFile(localFile,didtTableAbstract,JSON.stringify({}));
                        return Promise.resolve(JSON.parse(abstractInfo))
                    },
                    getSourceId: function(){
                        return readForFile(localFile,`${FILE_PREFIX}database_id.txt`,md5(`${localFile.rootName}${Date.now()}`)) // 根文件夹的ID标识（基于文件夹根名称生成）
                    },
                    add: function (id, data,taskDetail) {
                        return localFile.writeFile(getFilePath(id,taskDetail),JSON.stringify(data)).then(function (res) {
                            return res ? data : null
                        })
                    },
                    query: function (id,taskDetail) {
                        return localFile.readFile(getFilePath(id,taskDetail)).then(function(text){
                            return JSON.parse(text)
                        })
                    },
                    remove: function (id,taskDetail) {
                        return localFile.unlink(getFilePath(id,taskDetail)).then(function () {
                            return null;
                        })
                    },
                    update: function (id, data, taskDetail) {
                        return localFile.writeFile(getFilePath(id,taskDetail),JSON.stringify(data)).then(function (res) {
                            return res ? data : null
                        })
                    },
                },
                local: getExtBasicMethodByType(tableName),
                cache:{
                    getLastSyncSnapshot: function (storeId){
                        return readForFile(localFile,`${tableRoot}/${FILE_PREFIX}sync/last_sync_abstract_${storeId}.json`,JSON.stringify({})).then(function(res){
                            return JSON.parse(res)
                        })
                        return extApi.commonAction.getPersistentValue(storeId).then(function (res) {
                            return res.data
                        })
                    },
                    setLastSyncSnapshot: throttle(function (storeId, snapshot) {
                        return localFile.writeFile(`${tableRoot}/${FILE_PREFIX}sync/last_sync_abstract_${storeId}.json`,JSON.stringify(snapshot)).then(function(){

                        })
                        return extApi.commonAction.setPersistentValue({
                            key: storeId,
                            value: snapshot
                        }).then(function () {
        
                        })
                    },1000),
                },
                hooks:{
                    onFinishedSingleTask: function(resolveBy,taskDetail,abstract){
                        console.log(taskDetail,abstract[resolveBy])
                    }
                }
            },
            lockResolving: 1000 * 60 * 2,
        })

        syncByDir._computeSyncTask().then(function(res){
            console.log(res,'同步任务')
        })

        // syncByDir._computeSelfDiff('local').then(function(res){
        //     console.log("本地修改",res)
        // })


        // syncByDir._computeSelfDiff('cloud').then(function(res){
        //     console.log("云修改",res)
        // })


        if(doSync){
            syncByDir.sync().then(function(result){
                
            })
        }

    }


    return (
        <BasicLayout title="同步">
            <div className='mt-20 mx-auto'>
                {
                    !dirName &&
                    <div className='flex justify-center'>
                        <button className='btn' onClick={setDir}>请选择同步文件夹</button>
                    </div>
                }
                {
                    dirName && 
                    <div>
                        <button onClick={()=>{doSyncAll(false)}}>同步计算</button>

                        <button onClick={()=>{doSyncAll(true)}}>同步执行</button>
                    </div>
                }
            </div>
        </BasicLayout>
    )
}


