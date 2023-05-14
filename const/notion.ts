export const DOC_API_HOST =
  process.env.DOC_API_HOST || 'https://developer.pagenote.cn'
export const NOTION_BASE_ROOT_PAGE = 'cfd9af87-0210-4934-9e04-20bc708c4206'
export const DEFAULT_BASE_DOC_PATH = 'doc'
// notion id 转语义化路径
export const DOC_ID_MAPPING: Record<string, string> = {
  [NOTION_BASE_ROOT_PAGE]: '/',
}
