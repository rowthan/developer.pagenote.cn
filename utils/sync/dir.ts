import {AbstractInfo, SyncMethods, SyncTaskDetail} from "@pagenote/shared/lib/library/syncStrategy";
import LocalFileSystem from '@pagenote/shared/lib/library/localFileSystem'
import md5 from "md5";
import {TableNameType} from "./const";
import DirDatabaseTable from "@pagenote/shared/lib/library/DirDatabaseTable";

/**根据类型，操作本地文件夹数据：增删改查*/
export function getDirBasicMethodByType<T extends {key: string, updateAt: number}>(tableName: TableNameType,fileSystem: LocalFileSystem): SyncMethods<T> {
    function getFilePath(key: string,taskDetail: SyncTaskDetail) {
        const filePath = taskDetail?.cloudAbstract?.c_id || `${tableName}/${md5(key)}.${tableName}.json`
        return filePath
    }

    const fileDb = new DirDatabaseTable<T>(fileSystem,{
        tableName: tableName,
        getAbstractInfo: function (inputData, stat) {
            return{
                id: inputData.key,
                l_id: inputData.key,
                c_id: stat.filePath,
                updateAt: inputData.updateAt,
                mtimeMs: stat.mtimeMs
            }
        }
    });

    return {
        getAbstractInfo:function(data) {
            if (!data) {
                return null
            }

            const abstract: AbstractInfo = {
                id: data.key,
                c_id: '',
                l_id: data.key,
                updateAt: data.updateAt
            }
            return abstract
        },

        getSourceId: function () {
          return Promise.resolve(fileDb.tableTempInfo.tableId || '')
        },

        add: function (id, data,taskDetail) {
            return fileDb.add(getFilePath(id,taskDetail),data).then(function (res) {
                return res || null
            })
        },
        query: function (id,taskDetail) {
            return fileDb.query(getFilePath(id,taskDetail))
        },
        remove: function (id,taskDetail) {
            return fileDb.remove(getFilePath(id,taskDetail)).then(function () {
                return null;
            })
        },
        update: function (id, data, taskDetail) {
            return fileDb.update(getFilePath(id,taskDetail),data)
        },

        getCurrentSnapshot: fileDb.getCurrentSnapshot.bind(fileDb)
    }
}
