import { DOC_API_HOST } from 'const/env'
import { SearchParams } from 'notion-types'

export async function getNotionDocDetail(id: string) {
  const res = await fetch(`${DOC_API_HOST}/api/doc?id=${id}`)
  const result = await res.json()
  return {
    props: result,
    revalidate: 60 * 5,
  }
}

export async function searchInNotion(filter: SearchParams) {
  const res = await fetch(`${DOC_API_HOST}/api/search?keyword=${filter.query}`)
  return await res.json()
}
