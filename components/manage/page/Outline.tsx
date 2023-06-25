import usePageGroup, { PageGroup } from 'hooks/store/usePageGroup'
import { useContextSelector } from 'use-context-selector'
import { context } from 'store/ContextProvider'
import { useCallback, useEffect, useRef } from 'react'
import usePageList from '../../../hooks/store/usePageList'

export default function OutLines() {
  const [groups = []] = usePageGroup()
  const [state, setState] = useContextSelector(context, (v) => v)
  const { groupFilterName } = state
  const outlineRef = useRef<HTMLDivElement>(null)
  const [_pages, refreshPageList] = usePageList()

  function setGroup(group: PageGroup) {
    const { groupName, query } = group
    setState({
      groupFilterName: groupName,
      webpageFilter: query,
      batchSelected: new Set(),
    })
  }

  const setPreOrNext = useCallback(
    (num: number) => {
      const index = groups.findIndex(
        (item) => item.groupName === groupFilterName
      )
      if (index === -1) {
        return
      }
      const nextIndex = index + num
      if (nextIndex >= 0 && nextIndex < groups.length) {
        setGroup(groups[nextIndex])
      }
    },
    [groupFilterName, groups]
  )

  useEffect(
    function () {
      const listener = function (e: KeyboardEvent) {
        if (e.key === 'ArrowDown') {
          setPreOrNext(1)
        }
        if (e.key === 'ArrowUp') {
          setPreOrNext(-1)
        }
      }
      // 监听键盘事件
      const EVENT_NAME = 'keydown'
      const ROOT_ELEMENT = outlineRef.current || document.documentElement
      ROOT_ELEMENT?.addEventListener(EVENT_NAME, listener)
      return function () {
        ROOT_ELEMENT?.removeEventListener(EVENT_NAME, listener)
      }
    },
    [setPreOrNext]
  )

  function scrollToView() {
    const item = document.querySelector('.active-group-item')
    if (item) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    } else {
      console.log('没有选中的页面')
    }
  }

  // 保证选中的item在视图中
  useEffect(
    function () {
      const timer = setTimeout(scrollToView, 2000)
      return function () {
        clearTimeout(timer)
      }
    },
    [groupFilterName]
  )

  useEffect(
    function () {
      refreshPageList()
      console.log('refresh pages', state.webpageFilter)
    },
    [state.webpageFilter]
  )

  // const groupTypes: { label: string, value: keyof WebPage }[] = [
  //     {
  //         label: "标签分组",
  //         value: "categories"
  //     },
  //     {
  //         label: "域名分组",
  //         value: "domain"
  //     },
  //     {
  //         label: "时间分组",
  //         value: "updateAtDay"
  //     }
  // ]

  return (
    <div
      ref={outlineRef}
      tabIndex={0}
      className={'p-2 max-h-full overflow-auto select-none'}
    >
      <ul>
        {groups.map((item, index) => {
          return (
            <li
              onClick={() => {
                setGroup(item)
              }}
              className={`py-1 px-2 text-sm flex justify-between cursor-pointer ${
                groupFilterName === item.groupName
                  ? 'active-group-item bg-amber-400 text-white'
                  : ''
              }`}
              key={index}
            >
              <span>{item.groupName} </span>
              <span> {item.groupCnt}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
