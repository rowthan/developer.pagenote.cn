import * as React from "react";
import {ChangeEvent, ChangeEventHandler, useRef, useState} from "react";
import {resolveImportString} from "@pagenote/shared/lib/utils/data";
import {addBackup} from "./db";
import dayjs from "dayjs";


export default function UploadBackup(props:{onUpload:()=>void}) {
    const [loading,setLoading] = useState(false);
    const input = useRef(null);


    function onImportData (e){
        setLoading(true)
        const selectedFile = e.target.files[0];
        const reader = new FileReader();//这是核心,读取操作就是由它完成.
        reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
        reader.onload = function () {
            if (typeof this.result === "string") {
                const backupData = resolveImportString(this.result);
                if(backupData){
                    backupData.backupId = backupData.backupId || dayjs().format('YYYY-MM-DD_HH_mm_ss')
                    backupData.remark = backupData.remark || `${backupData.pages?.length} 个网页；${backupData.lights?.length || 0} 个标记；${backupData.version<=3 ? '低版本备份数据，请使用新版插件备份': ''} 。`
                    addBackup(backupData).then(function () {
                        props.onUpload()
                    })
                }
                setLoading(false)
            }
        }
    }

    return(
        <div>
            <label htmlFor="import-data">
                {/*<div className="form-control w-full max-w-xs">*/}
                {/*    <label className="label">*/}
                {/*        <span className="label-text">上传备份文件</span>*/}
                {/*    </label>*/}
                {/*    <input type="file"  onChange={onImportData}  className="file-input file-input-bordered w-full max-w-xs" />*/}
                {/*</div>*/}

                <input id="import-data" ref={input} type="file" style={{display: "none"}} onChange={onImportData} />
                <button
                    onClick={()=>{input.current.click()}}
                    disabled={loading}
                    className="btn btn-outline btn-success">
                    上传备份文件
                </button>
            </label>
        </div>
    )
}
