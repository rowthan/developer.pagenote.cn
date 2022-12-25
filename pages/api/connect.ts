// 数据连接
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {WebPage} from "@pagenote/shared/lib/@types/data";

/**
 * 根据ID查询一条数据详情
 * */
export default function add(
    req: NextApiRequest,
    res: NextApiResponse<{
        data: WebPage | null,
    }>
) {
    const {table,id,data}:{data: WebPage,table: string,id: string} = req.body;
    // TODO 基于表名、ID，添加此条数据的详情
    res.status(200).json({
        data: null
    })
}
