// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {get} from 'lodash'
import {parsePageId} from 'notion-utils'
import {getOfficialNotion, getUnOfficialNotion} from "../../service/server/notion";
import {getCacheContent, writeCacheFile} from "../../service/server/cache";
import {SEO_REVERT_MAP} from "../../const/notion";


/**
 * SEO 优化处理：
 * 根据 path ，搜索对应的文档
 * */
async function fetchDocByPath(path: string): Promise<string | null> {
  const officialNotion = getOfficialNotion()
  if (!officialNotion) {
    return null
  }
  const { results } = await officialNotion.search({
    filter: {
      property: 'object',
      value: 'database',
    },
  })

  for (let i = 0; i < results.length; i++) {
    // @ts-ignore
    const { id, properties } = results[i]
    if (!properties.path) {
      continue
    }
    const queryResult = await officialNotion.databases.query({
      database_id: id,
      filter: {
        or: [
          {
            property: 'path',
            type: 'url',
            url: {
              equals: path,
            },
          },
          {
            property: 'path',
            type: 'url',
            url: {
              equals: '/' + path,
            },
          },
          {
            property: 'path',
            type: 'url',
            url: {
              equals: path.replace(/^\//, ''),
            },
          },
        ],
      },
      page_size: 1,
    })
    if (queryResult.results[0]) {
      return queryResult.results[0].id
    }
  }

  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const notionIdOrUrlPath = (req.query.id || '').toString()
  // 基于文章ID 或 path 查询详情
  let notionId = notionIdOrUrlPath
  // 如果是 URL path，需要查询对应的 notion id
  if (!/^(\w|\d){8}/.test(notionIdOrUrlPath) || notionIdOrUrlPath.length < 20) {
    notionId =
      SEO_REVERT_MAP[notionIdOrUrlPath] ||
      (await fetchDocByPath(notionIdOrUrlPath)) ||
      ''
    if (!notionId) {
      console.error(notionIdOrUrlPath, 'no page')
      // throw Error('找不到 notion 页面')
      return res.status(200).json({
        title: '404 not found',
      })
    }
  }

  // 基于notion 查询用于渲染的结构对象详情（非官方API）
  notionId = parsePageId(notionId)
  const recordMap = await getUnOfficialNotion().getPage(notionId)
  /**
   * 为了通过获取 page 的property属性 title path description keywords
   * 非 page 类不做查询，如 collection-page-view
   * */
  let notionPage = null
  if (recordMap.block[notionId]?.value.type === 'page' && getOfficialNotion()) {
    notionPage = await getOfficialNotion()
      ?.pages.retrieve({
        page_id: notionId,
      })
      .catch(function (e) {
        console.warn(e, '获取文章详情失败')
      })
  }
  const properties = recordMap?.block[notionId]?.value?.properties
  const title = get(properties, 'title.0.0') || null
  // const description = get(properties, 'description.0.0') || null;
  // console.log(notionPage.properties,'notionPage')
  const path = get(notionPage, 'properties.path.url') || null
  const description =
    get(notionPage, 'properties.description.rich_text[0].plain_text') || null
  const keywords = (
    get(notionPage, 'properties.keywords.multi_select') || []
  ).map(function (item) {
    //@ts-ignore
    return item.name || ''
  })

  /**格式化相应对象*/
  const responseData = {
    recordMap: recordMap,
    title: title,
    path: path,
    description: description,
    keywords: keywords,
  }

  /**只有本地运行才有 fs 的写入能力；线上服务器不具备写文件能力*/
  writeCacheFile(notionIdOrUrlPath, responseData)

  res.status(200).json(responseData)
}
