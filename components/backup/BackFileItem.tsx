import { BackupData, WebPage } from "@pagenote/shared/lib/@types/data";
import dayjs from "dayjs";
import { ResolvedBackupData } from "types/backup";
import DiffWebPage from "./DiffWebPage";

interface BackFileItemProps {
    item?: Partial<ResolvedBackupData>
}

export default function BackFileItem(props: BackFileItemProps) {
    const {item} = props;

    if(!item) return null;

    const pages = item.pages || [];

    return (
        <div className='border p-2 border-gray-400'>
            <div className={'text-sm font-semibold'}>{item.filePath}</div>
            <div className={'text-xs text-gray-500'}>
                <time>{dayjs(item.backup_at).format('YYYY-MM-DD HH:mm:ss')} </time>
                <span className="ml-2">{item.remark}</span>
            </div>
            {
                item.error ? 
                <div className="text-red-400">
                    {item.error}
                    <span className="text-xs">请确保导入文件正确。联系开发者处理</span>
                </div>:
                <div>
                    <h3>网页 Diff</h3>
                    <DiffWebPage pages={pages} />
                </div>
            }
        </div>
    )
}