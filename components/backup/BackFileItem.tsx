import {BackupData, WebPage} from "@pagenote/shared/lib/@types/data";
import dayjs from "dayjs";
import {ResolvedBackupData} from "types/backup";
import DiffWebPage from "./DiffWebPage";
import TipInfo from "../TipInfo";

interface BackFileItemProps {
    item?: Partial<ResolvedBackupData>
}

export default function BackFileItem(props: BackFileItemProps) {
    const {item} = props;

    if (!item) return null;

    const {pages = []} = item;

    const hasError = !!item.error;
    return (
        <div className='border p-1 border-gray-300 rounded'>
            <div
                className={'text-sm font-medium whitespace-nowrap overflow-hidden overflow-ellipsis '}>{item.filePath}</div>
            {
                hasError ?
                    <div className="text-red-400 text-xs flex items-center">
                        <span>{item.error}</span>
                        <a href="https://developer.pagenote.cn/question" target={'_blank'}>
                            <TipInfo tip={'联系开发者处理'}/>
                        </a>
                    </div> :
                    <div>
                        <div className={'text-xs text-gray-500'}>
                            <time>{dayjs(item.backup_at).format('YYYY-MM-DD HH:mm:ss')} </time>
                            <span className="ml-2">{item.remark}</span>
                        </div>
                        <DiffWebPage pages={pages}/>
                    </div>


            }
        </div>
    )
}
