import { createContext } from 'use-context-selector'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { WebPage } from '@pagenote/shared/lib/@types/data'
import { Query } from '@pagenote/shared/lib/@types/database'
import localforage from 'localforage'

type State = {
  // 分组方式
  groupType?: keyof WebPage
  // 过滤器名称（用户可见）
  groupFilterName?: string
  // 过滤器（API请求）
  webpageFilter?: Query<WebPage>
  // 当前选中页面
  selectedPageKey?: string

  // 批量选中页面
  batchSelected?: Set<string>
}

const initState: Required<State> = {
  groupType: 'categories',
  webpageFilter: {},
  groupFilterName: '所有',
  selectedPageKey: '', //https://pagneote.cn/release',
  batchSelected: new Set(),
}

export const context = createContext<[State, Dispatch<SetStateAction<State>>]>(
  null as any
)

const STORE_KEY = 'pagenote_manage_state'
const ContextProvider = (props: { children: React.ReactElement }) => {
  const [innerState, setInnerState] = useState<State>(initState)

  useEffect(function () {
    // 从历史缓存中恢复现场
    localforage.getItem(STORE_KEY, function (error, res) {
      if (res) {
        const result = {
          ...innerState,
          ...res,
        }
        setInnerState(result)
      }
    })
  }, [])

  // @ts-ignore
  const updateState: Dispatch<SetStateAction<State>> = useCallback(
    function (state: State) {
      const data = {
        ...innerState,
        ...state,
      }
      console.log(data.selectedPageKey, innerState.selectedPageKey)
      setInnerState(data)
      // 保存现场
      localforage.setItem(STORE_KEY, data)
    },
    [innerState]
  )

  return (
    <context.Provider value={[innerState, updateState]}>
      {props.children}
    </context.Provider>
  )
}
export default ContextProvider
