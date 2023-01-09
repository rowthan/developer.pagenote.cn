import { Snapshot } from "@pagenote/shared/lib/library/syncStrategy";

type DateType = Date | number;

enum TABLE_NAME {
    PAGE= 'page',
    LIGHT='light',
    SNAPSHOT='snapshot',
}
export interface BucketInfo {
    authUid?: string,
    title?: string

    bucketId?: string
    expiredAt?:DateType

    createAt?: DateType

    updateAt?: DateType

    /**存储空间表列表*/
    tables?: TABLE_NAME[]
}

type BasicResponse<T> = Promise<{
    data?: T,
    success: boolean,
    error?: string
}>

type BasicActionResponse = {snapshot:Snapshot, table: string}

type DataActionBasicParams<T> = ({
    bucketId: string
    table: string,
    authUid: string,
} & T);

type BulkBasicParams<T> = {
    authUid: string,
} & T

export interface CloudServer<TableTypes> {
    /**申请一块存储空间，如已有空间，则直接反馈已有空间信息，不再申请
     * tables: 指定初始化表格
     * */
    requestBucket:(params:BulkBasicParams<{tables?: string[]}>)=>BasicResponse<BucketInfo|null>

    /**
     * 永久清空一块存储空间
     * */
    removeBucket:(params:BulkBasicParams<{bucketId: string}>)=> BasicResponse<{ removed: boolean }>

    /**返回存储空间，某一张表的摘要信息*/
    snapshot: (params:DataActionBasicParams<void>)=> BasicResponse<BasicActionResponse>

    /**增加数据*/
    add:(params: DataActionBasicParams<{dataList: TableTypes[]}>)=>BasicResponse<BasicActionResponse>

    /**删除数据*/
    remove:(params: DataActionBasicParams<{idList: string[]}>)=>BasicResponse<BasicActionResponse>

    /**修改**/
    update:(params: DataActionBasicParams<{dataList: Partial<TableTypes>[]}>)=>BasicResponse<BasicActionResponse>

    /**详情*/
    detail:(params: DataActionBasicParams<{idList: string[]}>)=>BasicResponse<{table: string,detail: Record<string, TableTypes | null | undefined>}>

    // search:/ list
}

