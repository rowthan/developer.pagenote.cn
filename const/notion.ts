export const DOC_API_HOST =
  process.env.DOC_API_HOST || 'https://developer.pagenote.cn'
export const NOTION_BASE_ROOT_PAGE = 'cfd9af87-0210-4934-9e04-20bc708c4206'
export const PRO_PLAN_PAGE = 'b29f947e-1df6-4468-982e-e36e8ad1009c'
export const RELEASE_PAGE = 'c5865cde-2ef5-4f36-9c0f-e2dce97f6a1c'

export const DEFAULT_BASE_DOC_PATH = 'doc'
// notion id 转语义化路径
export const DOC_ID_MAPPING: Record<string, string> = {
  [NOTION_BASE_ROOT_PAGE]: '/',
  [PRO_PLAN_PAGE]: '/pro-plan',
  [RELEASE_PAGE]: '/release',
}
