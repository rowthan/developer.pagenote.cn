// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NotionAPI } from 'notion-client'
import { Client } from '@notionhq/client'
import { get } from 'lodash'

const docNotion = new NotionAPI({})
const NOTION_SECRET_KEY = process.env.NOTION_TOKEN
const notion = new Client({
  auth: NOTION_SECRET_KEY,
})
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const pageId = (req.query.id || '').toString()

  if (pageId) {
    let notionId = pageId
    // 非 page id ，查找对应的 notionid
    if (!/^(\w|\d){8}/.test(pageId)) {
      const result = await notion.search({
        query: pageId,
        filter: {
          property: 'object',
          value: 'page',
        },
        page_size: 1,
      })
      if (result.results[0]) {
        notionId = result.results[0].id
      }
    }

    const recordMap = await docNotion.getPage(notionId)
    const title =
      get(
        recordMap?.block[notionId]?.value?.properties?.title || null,
        '0.0'
      ) || null
    res.status(200).json({
      recordMap: recordMap,
      title: title,
    })
  } else {
    const result = await notion.search({
      filter: {
        property: 'object',
        value: 'page',
      },
    })
    return res.status(200).json({
      pages: result.results.map(function (item) {
        return {
          id: item.id,
        }
      }),
    })
  }
}
