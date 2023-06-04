const isDev = process.env.NODE_ENV === 'development'

const LOCAL_HOST = 'http://localhost:3000'
const PRODUCT_HOST = 'https://developer.pagenote.cn'
const AUTH_PAGE_HOST = isDev ? LOCAL_HOST : PRODUCT_HOST

module.exports = {
  // SERVER_API_HOST: 'http://localhost:3001', //'https://api.pagenote.cn',
  SERVER_API_HOST: 'https://api.pagenote.cn',
  GITHUB_AUTH_CALLBACK: AUTH_PAGE_HOST + '/oauth/callback_github',
  NOTION_AUTH_CALLBACK: AUTH_PAGE_HOST + '/oauth/callback_notion',
}
