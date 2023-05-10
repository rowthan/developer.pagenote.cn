export const basePath = process.env.prefix || ''
export const DOC_API_HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.DOC_API_HOST ||
      'https://developer-pagenote-cn-git-featnotiondoc-pagenote.vercel.app'
