import {omit} from "lodash";
import {FilterQuery} from "mongoose";
import {ModelType} from "@typegoose/typegoose/lib/types";

export function basicPreSave(this: any) {
    this.updateAt = new Date();
    if (this.isNew) {
        this.createAt = new Date();
    }
}

export type BasicBulkItem = {
    authUid: string,
    bulkId: string
}

export async function add<T>(model: ModelType<any>, items: T[], bulkInfo: BasicBulkItem): Promise<T[] | null> {
    const insertList = items.map(function (item) {
        return {
            ...item,
            authUid: bulkInfo.authUid,
            bulkId: bulkInfo.bulkId,
        }
    })

    const result = await model.insertMany(insertList);
    const list = result.map(function (temp) {
        const object = temp.toObject();
        return omit(object, ['bulkId', 'authUid'])
    })

    return list
}

export async function query<T>(model: ModelType<any>, filter: FilterQuery<T>, bulkInfo: BasicBulkItem): Promise<T[]> {
    const list = await model.find({
        ...filter,
        ...bulkInfo
    }, {
        authUid: -1,
        bulkId: -1
    })

    return list.map(function (item) {
        return item.toObject()
    })

}

export async function remove<T>(model: ModelType<any>, filter: FilterQuery<T>, bulkInfo: BasicBulkItem) {
    const list = await model.deleteMany({
        ...filter,
        ...bulkInfo,
    })
    return list
}
