import { isDev } from '../const/env'
import { DEFAULT_BASE_DOC_PATH } from '../const/notion'

// 制定获取 notion 数据源的接口；默认请求自身服务。
const WEB_HOST = process.env.WEB_HOST || 'http://localhost:3000'

export async function getNotionDocDetail(id: string, notFound: boolean = true) {
  const res = await fetch(`${WEB_HOST}/api/doc?id=${id}`)
  try {
    const result = await res.json()
    if (result.recordMap) {
      return {
        props: result,
        revalidate: isDev ? 60 : 2 * 60 * 60, // 单位 秒
      }
    } else {
      return {
        notFound: true,
      }
    }
  } catch (e) {
    console.error('error', e)
    return {
      notFound: notFound,
      // redirect: {
      //   destination: '/500',
      //   permanent: false,
      // },
    }
  }
}

export async function computeStaticPaths() {
  let pages: { path?: string; title?: string; id: string }[] = []
  try {
    const res = await fetch(`${WEB_HOST}/api/docs`)
    pages = (await res.json()).pages
  } catch (e) {
    console.error(e, 'getStaticPaths 请检查 /api/doc')
  }

  console.log(pages.length, '待静态化页面数量')
  return {
    paths: pages
      .sort(function (item) {
        return item.path ? -1 : 1 // 优先静态化定义 path 的页面
      })
      .slice(0, isDev ? 5 : 50) // 最多静态化50个
      .map(function (item) {
        let paths = [DEFAULT_BASE_DOC_PATH, item.id] //[`/${DEFAULT_BASE_DOC_PATH}/${item.id}`]
        // 如果有自定义路径，解析后封装至数组
        if (item.path) {
          item.path = item.path[0] === '/' ? item.path : '/' + item.path
          paths = item.path.split('/').filter(function (item) {
            return !!item
          }) // .replace(/^\/.*?\//, '')
          console.log(paths, item.id, item.path)
        }
        return {
          params: {
            paths: paths,
          },
        }
      }),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-true
    // fallback: true, // 立即返回，并尝试取重新生成
    // fallback: false, // 直接返回404，不会尝试重新刷新，新增的页面，需要重新部署才会生成
    fallback: 'blocking', // 阻塞响应并重新请求数据
  }
}
