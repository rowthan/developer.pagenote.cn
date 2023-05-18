import { NextApiRequest, NextApiResponse } from 'next'
import { NotionAPI } from 'notion-client'
import { NOTION_BASE_ROOT_PAGE } from 'notion.config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const keyword = req.query.keyword?.toString() || ''
  const api = new NotionAPI()
  const output = await api.search({
    query: keyword,
    ancestorId: NOTION_BASE_ROOT_PAGE,
  })
  return res.status(200).json(output)
}
