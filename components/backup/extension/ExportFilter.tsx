import React, {useState} from "react";
import extApi from "@pagenote/shared/lib/pagenote-api";
import {BackupData, BackupDataType, BackupVersion, ContentType} from "@pagenote/shared/lib/@types/data";
import dayjs from "dayjs";
import useWhoAmi from "hooks/useWhoAmi";
import FilterCheckBox from "./FilterCheckBox";


export default function ExportFilter() {
    const [downloading, setDownloading] = useState(false);
    const [whoAmI] = useWhoAmi();
    const [selected, setSelected] = useState(['html', 'page', 'light', 'snapshot'])


    async function exportData() {
        setDownloading(true);
        const commonFilter = {
            deleted: {
                $ne: true
            },
        }
        extApi.lightpage.exportBackup({
            htmlFilter: selected.includes('html') ? commonFilter : {resourceId: "1"},
            pageFilter: selected.includes('page') ? commonFilter : {key: "1"},
            lightFilter: selected.includes('light') ? commonFilter : {key: "1"},
            snapshotFilter: selected.includes('snapshot') ? commonFilter : {url: "1"},
        }).then(function (res) {
            console.log(res,'备份结果')
            setDownloading(false)
        })

        return;


        const localDownload = false //whoAmI?.browserType===BrowserType.Firefox TODO v3升级时 Firefox不支持，需兼容
        if (localDownload) {
            const find = {
                limit: 999999999,
                query: {
                    deleted: false
                }
            }
            const pages = (await extApi.lightpage.queryPages(find)).data.list;
            const lights = (await extApi.lightpage.queryLights(find)).data.list;
            const snapshots = (await extApi.lightpage.querySnapshots(find)).data.list;
            const htmlList = (await extApi.html.query(find)).data.list
            const backup: BackupData = {
                backupId: `${Date.now()}`,
                backup_at: Date.now(),
                box: [],
                dataType: [BackupDataType.pages, BackupDataType.light, BackupDataType.snapshot],
                extension_version: whoAmI?.version,
                lights: lights,
                pages: pages,
                remark: "",
                resources: [],
                htmlList: htmlList,
                size: 0,
                snapshots: snapshots,
                version: BackupVersion.version5
            }
            const blob = new Blob([JSON.stringify(backup)], {
                type: ContentType.json,
            })
            const url = URL.createObjectURL(blob)
            const filename = `${whoAmI?.extensionPlatform}_${whoAmI?.version}_${dayjs().format('YYYY-MM-DD')}.${pages.length}_${lights.length}_${snapshots.length}.pagenote.bak`
            extApi.developer.chrome({
                namespace: "downloads",
                type: "download",
                args: [{
                    saveAs: true,
                    url: url,
                    filename: filename
                }]
            }).then(function () {
                URL.revokeObjectURL(url);
                setDownloading(false)
            })
        } else {

        }
    }

    function toggleSelect(key: string) {
        const index = selected.indexOf(key);
        if(index===-1){
            selected.push(key)
        }else{
            selected.splice(index,1)
        }
        setSelected([...selected])
    }

    return (
        <div>
            <table className="table table-compact w-full">
                <thead>
                <tr>
                    <th>备份类型</th>
                    <th>筛选</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>网页</td>
                    <td>
                        <FilterCheckBox field={'page'} selected={selected} onChange={toggleSelect} />
                    </td>
                </tr>
                <tr>
                    <td>标记</td>
                    <td>
                        <FilterCheckBox field={'light'} selected={selected} onChange={toggleSelect} />
                    </td>
                </tr>
                <tr>
                    <td>截图</td>
                    <td>
                        <FilterCheckBox field={'snapshot'} selected={selected} onChange={toggleSelect} />
                    </td>
                </tr>
                <tr>
                    <td>离线网页</td>
                    <td>
                        <FilterCheckBox field={'html'} selected={selected} onChange={toggleSelect} />
                    </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    <td className={'text-right'}>
                        <button disabled={downloading} className={'btn btn-sm'} onClick={exportData}>
                            确定备份
                        </button>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}
