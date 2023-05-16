import { SearchParams } from 'notion-types'
import { DEFAULT_BASE_DOC_PATH, DOC_API_HOST } from 'const/notion'

export async function getNotionDocDetail(id: string) {
  const res = await fetch(`${DOC_API_HOST}/api/doc?id=${id}`)
  try {
    const result = await res.json()
    if (result.recordMap) {
      return {
        props: result,
        revalidate: process.env.NODE_ENV === 'development' ? 60 : 60 * 60,
      }
    } else {
      return {
        notFound: true,
      }
    }
  } catch (e) {
    console.error('error', e)
    return {
      notFound: true,
      // redirect: {
      //   destination: '/500',
      //   permanent: false,
      // },
    }
  }
}

export async function searchInNotion(filter: SearchParams) {
  const res = await fetch(`${DOC_API_HOST}/api/search?keyword=${filter.query}`)
  return await res.json()
}

export default async function computeStaticPaths() {
  let pages: { path?: string; title?: string; id: string }[] = []
  try {
    const res = await fetch(`${DOC_API_HOST}/api/doc`)
    pages = (await res.json()).pages
  } catch (e) {
    console.error(e, 'getStaticPaths 请检查 /api/doc')
  }

  return {
    // todo 没有指定的页面不预先加载，修改 fallback 为 blocking
    paths: pages
      .sort(function (item) {
        return item.path ? -1 : 1 // 优先静态化定义 path 的页面
      })
      .slice(0, 50) // 最多静态化50个
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
    fallback: true, // 立即返回，并尝试取重新生成
    // fallback: false, // 直接返回404，不会尝试重新刷新，新增的页面，需要重新部署才会生成
    // fallback: 'blocking', // 阻塞并重新请求数据
  }
}
