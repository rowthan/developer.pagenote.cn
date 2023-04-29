import BackFileItem from "components/backup/BackFileItem";
import DropFile from "components/backup/DropFile";
import ExtensionData from "components/backup/extension/ExtensionData";
import { useCallback, useState } from "react";
import { ResolvedBackupData } from "types/backup";
import BasicLayout from "../../layouts/BasicLayout";

const dataMap = new Map<string,ResolvedBackupData>();
export default function Data() {
    const [backupSet, setBackupSet] = useState<Set<string>>(new Set());
    const onFileChange = useCallback((fileName: string,backupData: ResolvedBackupData) =>{
        dataMap.set(fileName,backupData)
        setBackupSet(new Set(backupSet.add(fileName)))
    },[backupSet])


    // backupSet 转换为 数组
    const backupList = Array.from(backupSet).sort(function (pre,next) {
        return dataMap.get(next)?.error ? -1 : 1;
    })


    return(
        <BasicLayout nav={false} title={'数据中心'}>
            <div className={'max-w-3xl m-auto p-6'}>
                <ExtensionData />
                <DropFile onFileChange={onFileChange} />
                <div className={'mt-4'}>
                    {
                        backupList.map((id,index) => {
                            return(
                                <div key={id} className={'mt-4'}>
                                    <BackFileItem item={dataMap.get(id)} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </BasicLayout>

    )
}
