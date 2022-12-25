import BasicLayout from "../../layouts/BasicLayout";
import LocalFileSystem from '@pagenote/shared/lib/library/localFileSystem'
import {useEffect, useMemo, useRef, useState} from "react";
import SyncTable from "../../components/sync/SyncTable";
import {toast} from "../../utils/toast";

export default function DirSync() {
    const [localFile,setLocalFile] = useState(new LocalFileSystem({}));
    const [dirName, setDirName] = useState('');
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

    function doSyncAll() {

    }


    return (
        <BasicLayout>
            <div className='mt-20 mx-auto'>
                {
                    !dirName &&
                    <div className='flex justify-center'>
                        <button className='btn' onClick={setDir}>请选择同步文件夹</button>
                    </div>
                }
                <div>
                    {
                        dirName &&
                        <div>
                            <div>
                                <div></div>
                                <div className="divider">
                                    <button onClick={setDir}>📂{dirName}</button>
                                </div>
                                <div className='grid grid-cols-3 gap-6'>
                                    <SyncTable tableName='page' localFileSystem={localFile} />
                                    <SyncTable tableName='light' localFileSystem={localFile} />
                                    <SyncTable tableName='snapshot' localFileSystem={localFile} />
                                </div>
                                <div className='mt-10 flex justify-center'>
                                    <div className="divider">
                                        <button className='btn' onClick={doSyncAll}>
                                            一键执行
                                        </button>
                                        {/*<button className={`btn btn-outline ${isResolving?'loading':''}`}>同步({dirName})</button>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </BasicLayout>
    )
}
