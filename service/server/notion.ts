import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'

export function getOfficialNotion() {
  return new Client({
    auth: process.env.NOTION_TOKEN || '',
  })
}

export function getUnOfficialNotion() {
    return new NotionAPI({})
}
