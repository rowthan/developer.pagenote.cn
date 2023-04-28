import { BackupData } from "@pagenote/shared/lib/@types/data"
import UploadSvg from "assets/svg/upload.svg"
import { ChangeEvent } from "react"
import { ResolvedBackupData } from "types/backup";

interface DropFileProps {
    onFileChange: (fileName: string,data: ResolvedBackupData) => void
}

function resolveFile(file: File): Promise<BackupData> {
    const reader = new FileReader();
    let onReadSuccess: (value: BackupData | PromiseLike<BackupData>) => void;
    let onReadError: (arg0: unknown) => void
    const promise = new Promise<BackupData>(function(resolve,reject){
        onReadSuccess = resolve;
        onReadError = reject;
    })
    reader.onload = (e) => {
        const fileString = e.target?.result;
        try{
            const data = JSON.parse(fileString as string);
            // TODO 识别文件类型，并格式化，返回格式化后的数据
            onReadSuccess(data);
        }catch(e){
            onReadError(e);
        }
    }
    reader.readAsText(file)
    return promise;

}

export default function ExtensionData(props:DropFileProps) {

    function onFileChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedFiles = e.target?.files || [];
        for(let i=0; i<selectedFiles.length; i++) {
            const file = selectedFiles[i];
            resolveFile(file).then(data => {
                props.onFileChange(file.name,{
                    filePath: file.name,
                    ...data,
                })
            }).catch(function(error){
                console.log('error',error)
                props.onFileChange(file.name,{
                    filePath: file.name,
                    error: '文件破损无法解析：'+error.message,
                    backupId: "",
                    dataType: [],
                })
            })
        }
    }
    
    return(
        <div className="w-full">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col justify-center items-center pt-5 pb-6 text-center">
                        <UploadSvg className="mb-3 w-10 h-10 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">点击上传文件</span>或将文件拖入此处</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            支持的格式 .json .pagenote.bak .pagenote <br />
                            等通过 PAGENOTE 导出的备份文件
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple={true} onInput={onFileChange} />
                </label>
            </div> 
    )
}