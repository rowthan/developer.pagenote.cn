import { BackupData } from "@pagenote/shared/lib/@types/data";

export type ResolvedBackupData = BackupData & {
    error?: string
    filePath: string
}
