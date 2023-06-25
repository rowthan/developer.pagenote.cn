import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import { useContextSelector } from 'use-context-selector'
import { context } from '../../store/ContextProvider'
import { WebPage } from '@pagenote/shared/lib/@types/data'

const REQUEST_PATH = '/use-page-list/'
export default function usePageList(): [Partial<WebPage>[], () => void] {
  const state = useContextSelector(context, (v) => v[0])

  /**
   * 先请求一遍，允许缓存，最快渲染结果，响应后立即第二次，不允许缓存，更新视图
   * */
  function fetchPageList() {
    // const useCache = false // 默认不使用缓存 待发现有瓶颈再启用
    // const cacheTime = useCache ? 60 * 60 * 1000 : 0
    // // cacheControl 和 schedule 一般搭配使用 使用缓存的基础上，后台静默刷新数据，供下一次使用;没有性能瓶颈的场景下，不建议使用 cache。
    // const header = {
    //   cacheControl: {
    //     maxAgeMillisecond: cacheTime,
    //   },
    //   scheduleControl: {
    //     runAfterMillisecond: [0, 10000, 3600 * 1000, 3600 * 24 * 1000],
    //   },
    // }
    return extApi.page
      .query(
        {
          query: state.webpageFilter,
          page: 0,
          pageSize: 999999,
          sort: {
            updateAt: -1,
          },
          projection: {
            did: -1,
            mtimeMs: -1,
            lastmod: -1,
            etag: -1,
            lastSyncTime: -1,
            hash: -1,
            visitedAt: -1,
            filename: -1,
            plainData: -1,
            extVersion: -1,
            thumb: -1,
            cover: -1,
            urls: -1,
            version: -1,
            sdkSetting: -1,
            sessionId: -1,
            achieved: -1,
          },
        }
        // header
      )
      .then(function (res8) {
        return res8?.data?.list || []
      })
  }

  /**
   * 请求依赖于 state.webpageFilter, 以此字段生成 SWR 的key值。
   * 不能使用 useEffect(()=>{},[state.webpageFilter]) 的方式，此方式会导致 hook 被多次引用时，相互独立，多次请求数据，无法发挥 swr 的效果
   * */
  const { data = [], mutate } = useSWR<Partial<WebPage>[]>(
    [REQUEST_PATH],
    fetchPageList
  )

  function refresh() {
    mutate()
  }

  return [data, refresh]
}
