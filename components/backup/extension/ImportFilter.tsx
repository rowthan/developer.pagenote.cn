import React, {useState} from "react";
import {BackupData} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/pagenote-api";
import {toast} from "../../../utils/toast";
import FilterCheckBox from "./FilterCheckBox";

enum ImportState {
    unset = 0,
    resolved = 1,
    importing = 2,
}
export default function ImportFilter(props:{backupData: BackupData, onSuccess:()=>void}) {
    const {backupData} = props
    const {pages=[],lights=[],snapshots=[],htmlList=[]} = backupData || {};
    const [importState, setImportState] = useState<ImportState>(ImportState.unset);
    const [selected, setSelected] = useState(['html', 'page', 'light', 'snapshot'])

    function toggleSelect(key: string) {
        const index = selected.indexOf(key);
        if(index===-1){
            selected.push(key)
        }else{
            selected.splice(index,1)
        }
        setSelected([...selected])
    }
    async function doImport() {
        setImportState(ImportState.importing);
        const importData = {
            ...backupData,
            htmlList: selected.includes('html') ? backupData.htmlList: [],
            pages: selected.includes('page') ? backupData.pages: [],
            lights: selected.includes('light') ? backupData.lights: [],
            snapshots: selected.includes('snapshot') ? backupData.snapshots: [],
        }
        extApi.lightpage.importBackup({
            backupData: importData,
        },{
            timeout: 10 * 1000,
        }).then(function (res) {
            if (res.success) {
                toast('已成功导入');
                props.onSuccess()
            } else {
                toast(res.error || '导入失败')
            }
            setImportState(ImportState.unset)
        })
    }

    const importIng = importState === ImportState.importing


    return(
        <div>
            <h3 className="font-bold text-lg">请确认你的备份文件</h3>
            <div className="py-4">
                导入的数据将 <b className={'text-error'}>覆盖插件内现有数据</b>！请谨慎操作。
                <table className="table table-compact w-full">
                    <thead>
                    <tr>
                        <th>数据类型</th>
                        <th>数量</th>
                        <th>筛选</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>网页</td>
                        <td>{pages.length}个</td>
                        <td>
                            <FilterCheckBox field={'page'} selected={selected} onChange={toggleSelect} />
                        </td>
                    </tr>
                    <tr>
                        <td>标记</td>
                        <td>{lights.length}个</td>
                        <td>
                            <FilterCheckBox field={'light'} selected={selected} onChange={toggleSelect} />
                        </td>
                    </tr>
                    <tr>
                        <td>截图</td>
                        <td>{snapshots.length}个</td>
                        <td>
                            <FilterCheckBox field={'snapshot'} selected={selected} onChange={toggleSelect} />
                        </td>
                    </tr>
                    <tr>
                        <td>离线网页</td>
                        <td>{htmlList.length}个</td>
                        <td>
                            <FilterCheckBox field={'html'} selected={selected} onChange={toggleSelect} />
                        </td>
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
    )
}
