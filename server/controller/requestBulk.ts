import {BucketInfo, CloudServer} from "../typing/sync";
import BulkModel, {createBulk, getCurrentValidBulk} from "../models/bulk";
import {add, BasicBulkItem, query, remove} from "../models/BasicModel";
import {WebPage} from "@pagenote/shared/lib/@types/data";
import PageModel from "../models/page";
import {Snapshot} from "@pagenote/shared/lib/library/syncStrategy";
import get from "lodash/get";


function listToMap<T>(list:T[],uniqueKey: string,idList?:string[]):Record<string, T> {
    const result: Record<string, any> = {};
    if(idList){
        idList.forEach(function (id) {
            result[id] = null;
        })
    }
    list.forEach(function (item) {
        const key = get(item,uniqueKey);
        result[key] = item;
    })

    return result;
}


const a: CloudServer<any>  = {
    async requestBucket(params){
        const {authUid,tables} = params;
        const current = await getCurrentValidBulk(authUid)
        if(current){
            return {
                data: current,
                success: true
            }
        }else{
            const newBulk = await createBulk({
                authUid: authUid,
                title: "",
                expiredAt: new Date(Date.now() + 3600 * 100),
                createAt: new Date(),
                updateAt: new Date(),
                tables: tables || ["page","light","snapshot"]
            })
            return {
                data: newBulk,
                success: true
            }
        }
    },
    async add(params){
        const {authUid,table,bucketId,dataList} = params;
        switch (table){
            case "page":
                const list = await add<WebPage>(PageModel,dataList ,{bulkId: bucketId, authUid: authUid})
                const result: Snapshot = {}
                list?.forEach(function (item) {
                    result[item.key] = {
                        id: item.key,
                        updateAt: item.updateAt
                    }
                })
                return{
                    success: true,
                    data: {
                        snapshot: result,
                        table: 'page'
                    }
                }
            default:
                throw Error('un support table')
        }
    },
    update(params: RequestBasicParams<{ data: any; dataList: any[] }>): BasicResponse<BasicActionResponse> {
        return Promise.resolve(undefined);
    },
    async detail(params){
        const {authUid,table,bucketId, idList} = params;
        switch (table) {
            case "page":
                const list = await query<WebPage>(PageModel,{
                    key: {
                        $in: idList
                    },
                },{
                    authUid: authUid,
                    bulkId: bucketId,
                })

                return {
                    success: true,
                    data: {
                        detail: listToMap(list,'key'),
                        table: 'page'
                    }
                }
            default:
                throw Error('un support table')
        }
    },

    async remove(params){
        const {authUid,table,bucketId, idList} = params;
        switch (table){
            case "page":
                const result = await remove(PageModel,{
                    key:{
                        $in: idList
                    }
                },{
                    bulkId: bucketId,
                    authUid: authUid,
                })

                break;
        }
        return Promise.resolve(undefined);
    },
    removeBucket(params: { bulkId: string }): BasicResponse<{ removed: boolean }> {
        return Promise.resolve({removed: false});
    },

    snapshot(params: RequestBasicParams<void>): BasicResponse<BasicActionResponse> {
        return Promise.resolve(undefined);
    },

}

export default a
