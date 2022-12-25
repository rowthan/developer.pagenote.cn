// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Snapshot} from "@pagenote/shared/lib/library/syncStrategy";

/**
 * 远程服务器数据的全体数据摘要信息，用于本地计算差异
 * */
interface SnapshotDetail {
    /**
     * 远程服务器存储数据库的唯一ID（本地可以同时和多个远程建立同步关系，如数据库A、数据库B、webdav、notion DB 等）；对应一个数据库
     * */
    cloudId: string,

    /**
     * 表名
     * */
    table: 'page'|'light',
    /**
     * 远程数据库的全量数据摘要信息
     * */
    snapshot: Snapshot,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SnapshotDetail>
) {
    /**
     * 请求参数
     * table: TODO 查询单张表的全量摘要信息
     * */
    const {table} = req.query;

    switch (table) {
        case 'page':
            break;
        case "light":
            break;
        default:
            throw Error('unknown table name')
    }

    res.status(200).json({
        cloudId: 'demo',
        table: table,
        snapshot: {}
    })
}
