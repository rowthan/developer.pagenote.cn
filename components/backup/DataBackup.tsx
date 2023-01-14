import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import extApi from "@pagenote/shared/lib/generateApi";
import {toast} from "../../utils/toast";
import {resolveImportString} from "@pagenote/shared/lib/utils/data";
import {BackupData} from "@pagenote/shared/lib/@types/data";
import BasicSettingLine from "../setting/BasicSettingLine";
import SettingDetail from "../setting/SettingDetail";
import CloseSvg from 'assets/svg/close.svg'

enum ImportState {
    unset = 0,
    resolved = 1,
    importing = 2,
}

export default function DataBackup() {
    const [downloading, setDownloading] = useState(false);
    const [importState, setImportState] = useState<ImportState>(ImportState.unset)
    const [backupData, setBackupData] = useState<BackupData | null>(null);

    function exportData() {
        setDownloading(true)
        extApi.lightpage.exportBackup({}).then(function (res) {
            if (res.success) {
                toast(`导出成功。文件名：${res.data.filename}`)
            } else {
                toast(`导出失败。${res.error}`, 'error')
            }

        }).finally(function () {
            setDownloading(false)
        })
    }

    async function doImport() {
        setImportState(ImportState.importing)
        extApi.developer.requestBack({
            namespace: 'lightpage',
            params: {
                backupData: backupData,
            },
            type: "onImportBackup",
            header:{
                timeout: 10*1000,
            }
        }).then(function (res) {
            if(res.success){
                toast('已成功导入')
            }else{
                toast(res.error || '导入失败')
            }
            setImportState(ImportState.unset)
        })
    }

    function onImportBackup(e: ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target?.files || []
        if (!selectedFile[0]) {
            return toast('未选择备份文件', 'error')
        }

        const reader = new FileReader();
        reader.onload = function () {
            if (typeof this.result === "string") {
                const backupData = resolveImportString(this.result);
                if (backupData) {
                    setBackupData(backupData);
                    setImportState(ImportState.resolved)
                } else {
                    toast('解析备份文件失败', 'error')
                }
            } else {
                toast('解析失败')
            }
        }
        reader.readAsText(selectedFile[0])
    }


    const {lights = [], pages = [], snapshots = []} = backupData || {};
    const importIng = importState === ImportState.importing
    return (
        <SettingDetail label={'数据管理'}>
            <div className={' min-w-80'}>
                <BasicSettingLine label={'插件内'} subLabel={'随插件卸载清空'} right={
                    <div>
                        <button onClick={exportData}
                                className={`mr-2 btn btn-outline btn-xs ${downloading ? 'loading' : ''}`}>导出
                        </button>
                        <label htmlFor={'backup-input'} className={'btn btn-outline btn-xs'}>
                            <input id={'backup-input'} type="file" style={{width: "0px"}} onChange={onImportBackup}/>
                            导入
                        </label>
                    </div>
                }/>

                <BasicSettingLine label={'云端'} right={
                    <div className={'text-xs'}>
                        敬请期待...
                    </div>
                }/>

                {
                    importState !== ImportState.unset && backupData &&
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <button className={'absolute right-4'} onClick={() => {
                                setImportState(ImportState.unset)
                            }}>
                                <CloseSvg/>
                            </button>
                            <h3 className="font-bold text-lg">请确认你的备份文件</h3>
                            <div className="py-4">
                                备份文件的数据将覆盖现有数据! 导入过程中，请勿关闭页面
                                <table className="table table-compact w-full">
                                    <thead>
                                    <tr>
                                        <th>数据类型</th>
                                        <th>数量</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>网页</th>
                                        <td>{pages.length}个</td>
                                    </tr>
                                    <tr>
                                        <th>标记</th>
                                        <td>{lights.length}个</td>
                                    </tr>
                                    <tr>
                                        <th>截图</th>
                                        <td>{snapshots.length}个</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-action">
                                <button disabled={importIng}
                                        className={`btn btn-primary ${importIng ? 'loading' : ''}`}
                                        onClick={doImport}>确定导入
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </SettingDetail>
    )
}
