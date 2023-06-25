import extApi from '@pagenote/shared/lib/pagenote-api'
import { useContextSelector } from 'use-context-selector'
import { context } from '../../store/ContextProvider'
import { Query } from '@pagenote/shared/lib/@types/database'
import { WebPage } from '@pagenote/shared/lib/@types/data'
import useSWR from 'swr'
import localforage from 'localforage'

export type PageGroup = {
  groupId: string
  groupName: string
  groupCnt?: number
  query: object
}

const REQUEST_PATH = '/use-page-group/'
const CACHE_GROUP = 'cache_group'
export default function usePageGroup(): [PageGroup[], () => void] {
  const [state] = useContextSelector(context, (v) => v)
  const groupType = state.groupType || 'categories'
  const { data = [], mutate } = useSWR<PageGroup[]>(
    [REQUEST_PATH, groupType],
    fetchGroup
  )

  async function fetchGroup() {
    const groupRes = await extApi.page.group({
      groupBy: groupType,
      query: {
        deleted: {
          $ne: true,
        },
      },
    })

    const data = groupRes.data
    const group: PageGroup[] = []

    switch (groupType) {
      case 'categories':
        for (let i in data) {
          group.push({
            groupId: 'categories/' + i,
            groupName: i,
            query: {
              // 直接保存筛选条件，更通用，方便加入智能分组
              [groupType]: {
                $in: [i],
              },
              deleted: {
                $ne: true,
              },
            },
            groupCnt: data[i].length,
          })
        }
        const allQuery: Query<WebPage> = {
          categories: {
            $exists: true,
          },
          deleted: {
            $ne: true,
          },
        }
        const result = await extApi.page.count(allQuery)

        group.unshift({
          groupId: 'all',
          groupName: '所有',
          query: allQuery,
          groupCnt: result.data,
        })

        break
      default:
        for (let i in data) {
          group.push({
            groupId: 'default/' + i,
            groupName: i,
            query: {
              [groupType]: i,
              deleted: {
                $ne: true,
              },
            },
            groupCnt: data[i].length,
          })
        }
        break
    }

    const removed = await extApi.page.count({
      deleted: true,
    })

    group.push({
      groupId: 'auto/recent-deleted',
      groupName: '最近删除',
      query: {
        deleted: true,
      },
      groupCnt: removed.data,
    })

    return group
  }

  function refresh() {
    mutate()
  }

  return [data, refresh]
}
