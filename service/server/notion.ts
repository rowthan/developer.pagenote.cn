import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'

export function getOfficialNotion() {
  const token = process.env.NOTION_TOKEN || ''
  if (!token) {
    console.warn(
      'notion token unset. SEO might be disabled. config it in .env file, like: => NOTION_TOKEN=fill_you_code'
    )
    return null
  }
  return new Client({
    auth: token,
  })
}

export function getUnOfficialNotion() {
  return new NotionAPI({})
}
