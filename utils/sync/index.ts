import SyncStrategy from "@pagenote/shared/lib/library/syncStrategy";
import {getExtBasicMethodByType} from "./ext";
import {getDirBasicMethodByType} from "./dir";
import {DataBasic, TableNameType} from "./const";
import LocalFileSystem from '@pagenote/shared/lib/library/localFileSystem'

export function getSyncByDir<T extends DataBasic>(tableName: TableNameType, fileSystem: LocalFileSystem): SyncStrategy<T> {
    const syncByDir = new SyncStrategy<T>({
        client: {
            cloud: getDirBasicMethodByType<T>(tableName, fileSystem),
            local: getExtBasicMethodByType<T>(tableName),
        },
        lockResolving: 1000 * 60 * 2,
    })

    return syncByDir
}
