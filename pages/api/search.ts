import { NextApiRequest, NextApiResponse } from 'next'
import { NotionAPI } from 'notion-client'
import { SEO_REVERT_MAP } from 'const/notion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const keyword = req.query.keyword?.toString() || ''
  const api = new NotionAPI()
  const output = await api.search({
    query: keyword,
    ancestorId: SEO_REVERT_MAP['/'],
  })
  return res.status(200).json(output)
}
