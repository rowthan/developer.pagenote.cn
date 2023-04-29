import {BackupData} from "@pagenote/shared/lib/@types/data"
import UploadSvg from "assets/svg/upload.svg"
import React, {ChangeEvent} from "react"
import {ResolvedBackupData} from "types/backup";

interface DropFileProps {
    onFileChange: (fileName: string, data: ResolvedBackupData) => void
}

function resolveFile(file: File): Promise<BackupData> {
    const reader = new FileReader();
    let onReadSuccess: (value: BackupData | PromiseLike<BackupData>) => void;
    let onReadError: (arg0: unknown) => void
    const promise = new Promise<BackupData>(function (resolve, reject) {
        onReadSuccess = resolve;
        onReadError = reject;
    })
    reader.onload = (e) => {
        try {
            const fileString = e.target?.result;
            const data = JSON.parse(fileString as string);
            // TODO 识别文件类型，并格式化，返回格式化后的数据
            onReadSuccess(data);
        } catch (e) {
            onReadError(e);
        }
    }
    const fileType = file.type;
    if(fileType.startsWith('image/') || fileType.startsWith('video/') || fileType.startsWith('audio/')){
        return Promise.reject(new Error('非法文件类型'));
    }else{
        reader.readAsText(file)
        return promise;
    }
}

const FILES: string[] = ['.json','.pagenote','.pagenote.[*]']
export default function ExtensionData(props: DropFileProps) {
    const [dragOver, setDragOver] = React.useState(false);

    function onGetFile(files: FileList | never[]) {
        if (!files) return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            resolveFile(file).then(data => {
                props.onFileChange(file.name, {
                    filePath: file.name,
                    ...data,
                })
            }).catch(function (error) {
                props.onFileChange(file.name, {
                    filePath: file.name,
                    error: '非法文件或数据破损：' + error.message,
                    backupId: "",
                    dataType: [],
                })
            })
        }
    }

    function onFileChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedFiles = e.target?.files || [];
        onGetFile(selectedFiles)
    }

    function onDropFile(e: React.DragEvent<HTMLLabelElement>) {
        e.stopPropagation();
        e.preventDefault();
        const files = e.dataTransfer?.files || [];
        onGetFile(files)
        setDragOver(false);
    }

    function onDragOver(e: React.DragEvent<HTMLLabelElement>) {
        setDragOver(true);
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div className="w-full">
            <label htmlFor="dropzone-file"
                   onDrop={onDropFile}
                   onDragOver={onDragOver}
                   onDragLeave={() => setDragOver(false)}
                   className={`flex flex-col justify-center items-center w-full h-44 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer 
                       dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600
                       ${dragOver ? "!bg-indigo-200" : ""}
                       `}>
                <div className={`flex flex-col justify-center items-center pt-5 pb-6 text-center`}>
                    <UploadSvg className="mb-3 w-10 h-10 text-gray-400"/>
                    <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {
                            dragOver ?
                                <span>
                                        释放鼠标导入文件
                                    </span> :
                                <span>
                                         <span className="font-semibold">点击上传文件</span>或将以下文件拖入此处
                                    </span>
                        }
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {
                            FILES.map((file, index) => (
                                <code key={index} className={'mx-1'}>{file}</code>
                            ))
                        }
                        {/*<ul className={'text-left'}>*/}
                        {/*    <li></li>*/}
                        {/*    <li></li>*/}
                        {/*    <li></li>*/}
                        {/*</ul>*/}
                    </div>
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept={'.txt,.pagenote,.html,.json'}
                       multiple={true} onInput={onFileChange}/>
            </label>
        </div>
    )
}
