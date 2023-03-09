import {DataTypes, TableNameType} from "./const";
import {AbstractInfo, CacheMethod, Snapshot, SyncMethods,scheduleWrap} from  'lib/SyncStrategy'// "@pagenote/shared/lib/library/syncStrategy";
import {Find, FindResponse} from "@pagenote/shared/lib/@types/database";
import {BaseMessageHeader, BaseMessageResponse} from "@pagenote/shared/lib/communication/base";
import extApi from "@pagenote/shared/lib/pagenote-api";

/**
 * 获取插件当前快照
 * */
async function getExtensionCurrentDataSnapshot(tableName: TableNameType): Promise<Snapshot> {
    let method = extApi.lightpage.queryPages;
    switch (tableName) {
        case "snapshot":
            method = extApi.lightpage.querySnapshots;
            break;
        case "light":
            method = extApi.lightpage.queryLights;
            break;
        case "page":
            method = extApi.lightpage.queryPages;
            break;
        default:
            method = extApi.lightpage.queryPages;
    }

    const snapshot: Snapshot = {}
    function queryList(page:number=0) {
        const pageSize = 99999999999;
        return method({
            query: {},
            limit: pageSize,
            page: page,
            pageSize: pageSize,
            projection: { // 精简数据体积
                updateAt: 1,
                key: 1,
                url: 1,
            }
        }).then(async function (res) {
            res.data.list.forEach(function (item) {
                snapshot[item.key || ''] = {
                    id: item.key || '',
                    updateAt: item.updateAt || 0,
                    self_id: item.key || '',
                }
            })
            if(res.data.has_more){
                await queryList(page+1)
            }
        })
    }
    await queryList(0)
    return snapshot
}

/**
 * 根据类型，操作插件数据：增删改查、快照
 * */
export function getExtBasicMethodByType<T extends { key: string, updateAt: number }>(tableName: TableNameType): SyncMethods<T>  {
    let addMethod: (list: any[], header?: Partial<BaseMessageHeader>) => Promise<any>;
    let removeMethod: (query: { keys: string[] }, header?: Partial<BaseMessageHeader>) => Promise<any>;
    let queryMethod: (find: Find<T>, header?: Partial<BaseMessageHeader>) => Promise<BaseMessageResponse<FindResponse<Partial<DataTypes>>>>
    switch (tableName) {
        case "snapshot":
            addMethod = extApi.lightpage.addSnapshots;
            removeMethod = extApi.lightpage.removeSnapshots;
            queryMethod = extApi.lightpage.querySnapshots;
            break;
        case "light":
            addMethod = extApi.lightpage.addLights;
            removeMethod = extApi.lightpage.removeLights;
            queryMethod = extApi.lightpage.queryLights;
            break;
        case "page":
            addMethod = extApi.lightpage.addPages
            removeMethod = extApi.lightpage.removePages;
            queryMethod = extApi.lightpage.queryPages;
            break;
    }
    addMethod = scheduleWrap(addMethod.bind(addMethod),50,2)
    queryMethod = scheduleWrap(queryMethod.bind(queryMethod),100,10)
    removeMethod = scheduleWrap(removeMethod.bind(removeMethod),100,20)
    const header = {
        timeout: 20 * 1000
    }
    return {
        computeAbstractByData(data: T | null) {
            if (!data) {
                return null
            }

            const abstract: AbstractInfo = {
                id: data.key,
                self_id: data.key,
                updateAt: data.updateAt
            }
            return abstract
        },
        getSourceId(): Promise<string> {
            return extApi.user.getWhoAmI(undefined).then(function (res) {
                return `${tableName}_${res.data.did}`
            })
        },

        add: function (id: string, data: T) {
            return addMethod([data],header).then(async function () {
                const res = await queryMethod({
                    query: {
                        key: id
                    },
                    limit: 1
                },header)
                return res.data.list[0] as T
            })
        },
        update: function (id: string, data: T) {
            return addMethod([data],header).then(async function () {
                const res = await queryMethod({
                    query: {
                        key: id
                    },
                    limit: 1
                },header)
                return res.data.list[0] as T
            })
        },
        remove: function (id: string) {
            return removeMethod({
                keys: [id]
            },header).then(function () {
                return null;
            })
        },
        query: function (id: string) {
            return queryMethod({
                query: {
                    key: id
                },
                limit: 1,
            },header).then(function (res) {
                return res.data?.list[0] as T
            })
        },
        /**全量数据的当前快照信息*/
        getCurrentSnapshot: function () {
            return getExtensionCurrentDataSnapshot(tableName)
        }
    }
}
