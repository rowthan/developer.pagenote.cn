// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { get } from 'lodash'
import { getOfficialNotion } from 'service/server/notion'
import { getCacheContent, writeCacheFile } from 'service/server/cache'

async function fetchAllDocs() {
  return await getOfficialNotion()?.search({
    filter: {
      property: 'object',
      value: 'page',
    },
    sort: {
      timestamp: 'last_edited_time',
      direction: 'descending',
    },
  })
}

/**
 * 获取所有文档列表
 * */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**容灾控制，当 notion 服务器不可用时，启用缓存作为数据兜底处理*/
  const cacheData = getCacheContent('docs')
  if (cacheData) {
    return res.status(200).json(cacheData)
  }

  const result = (await fetchAllDocs()) || { results: [] }
  const responseData = result?.results
    .map(function (item) {
      const path = get(item, 'properties.path.url')
      return {
        id: item.id,
        title: get(item, 'properties.title.title.0.plain_text') || null,
        path: path,
        // ...item,
      }
    })
    .sort(function (pre, next) {
      return pre.title ? -1 : 1
    })

  /**只有本地运行才有 fs 的写入能力；线上服务器不具备写文件能力*/
  writeCacheFile('docs', responseData)

  res.status(200).json(responseData)
}
