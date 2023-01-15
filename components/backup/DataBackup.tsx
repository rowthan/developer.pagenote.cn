import React, {ChangeEvent, useState} from "react";
import extApi from "@pagenote/shared/lib/generateApi";
import {toast} from "../../utils/toast";
import {resolveImportString} from "@pagenote/shared/lib/utils/data";
import {BackupData, BackupDataType, BackupVersion, ContentType} from "@pagenote/shared/lib/@types/data";
import BasicSettingLine from "../setting/BasicSettingLine";
import SettingDetail from "../setting/SettingDetail";
import CloseSvg from 'assets/svg/close.svg'
import TipInfo from "components/TipInfo";
import useWhoAmi from "../../hooks/useWhoAmi";
import dayjs from "dayjs";

enum ImportState {
    unset = 0,
    resolved = 1,
    importing = 2,
}

export default function DataBackup() {
    const [downloading, setDownloading] = useState(false);
    const [importState, setImportState] = useState<ImportState>(ImportState.unset)
    const [backupData, setBackupData] = useState<BackupData | null>(null);
    const [whoAmI] = useWhoAmi();
    async function exportData() {
        setDownloading(true);
        const localDownload = false //whoAmI?.browserType===BrowserType.Firefox TODO v3升级时 Firefox不支持，需兼容
        if(localDownload){
            const find = {
                limit: 999999999,
                query:{
                    deleted: false
                }
            }
            const pages = (await extApi.lightpage.queryPages(find)).data.list;
            const lights = (await extApi.lightpage.queryLights(find)).data.list;
            const snapshots = (await extApi.lightpage.querySnapshots(find)).data.list;
            const backup: BackupData = {
                backupId: `${Date.now()}`,
                backup_at: Date.now(),
                box: [],
                dataType: [BackupDataType.pages,BackupDataType.light,BackupDataType.snapshot],
                extension_version: whoAmI?.version,
                lights: lights,
                pages: pages,
                remark: "",
                resources: [],
                size: 0,
                snapshots: snapshots,
                version: BackupVersion.version4
            }
            const blob = new Blob([JSON.stringify(backup)],{
                type: ContentType.json,
            })
            const url = URL.createObjectURL(blob)
            const filename = `${whoAmI?.extensionPlatform}_${whoAmI?.version}_${dayjs().format('YYYY-MM-DD')}.${pages.length}_${lights.length}_${snapshots.length}.pagenote.bak`
            extApi.developer.chrome({
                namespace: "downloads",
                type: "download",
                args:[{
                    saveAs: true,
                    url: url,
                    filename: filename
                }]
            }).then(function () {
                URL.revokeObjectURL(url);
                setDownloading(false)
            })
        }else{
            extApi.lightpage.exportBackup({}).then(function (res) {
                setDownloading(false)
            })
        }
    }

    async function doImport() {
        setImportState(ImportState.importing)
        extApi.developer.requestBack({
            namespace: 'lightpage',
            params: {
                backupData: backupData,
            },
            type: "onImportBackup",
            header: {
                timeout: 10 * 1000,
            }
        }).then(function (res) {
            if (res.success) {
                toast('已成功导入')
            } else {
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

                <BasicSettingLine label={<div>
                    插件内<TipInfo
                    position={'right'}
                    tip={'产生的数据存储在浏览器中。当插件被卸载时，数据也一并清空。如要卸载，请注意导出备份。'}/>
                </div>} subLabel={'随插件卸载清空'} right={
                    <div>
                        <button onClick={exportData}
                                className={`mr-2 btn btn-outline btn-xs ${downloading ? 'loading' : ''}`}>导出
                        </button>
                        <label htmlFor={'backup-input'} className={'btn btn-outline btn-xs mr-2'}>
                            <input id={'backup-input'} type="file" style={{width: "0px"}} onChange={onImportBackup}/>
                            导入
                        </label>
                    </div>
                }/>

                <BasicSettingLine label={
                    <span>
                        云端
                        <TipInfo
                            position={'right'}
                            tip={'将数据存储在云端，多设备可以同步数据。'}/>
                    </span>
                } right={
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
                                导入的数据将 <b className={'text-error'}>覆盖插件内现有数据</b>！请谨慎操作。
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
