import { useContextSelector } from 'use-context-selector'
import { context } from '../../../store/ContextProvider'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import React from 'react'
import { FixedSizeList as List, VariableSizeList } from 'react-window'
import AutoSizer, { Size } from 'react-virtualized-auto-sizer'
import PageThumb from '../../webpage/PageThumb'
import usePageList from 'hooks/store/usePageList'
import { WebPage } from '@pagenote/shared/lib/@types/data'

const Row = (props: {
  index: number
  style: object
  rowData: Partial<WebPage>
}) => {
  const { selectedPageKey = [], batchSelected = new Set() } =
    useContextSelector(context, (v) => v[0])
  const setState = useContextSelector(context, (v) => v[1])

  const { style } = props
  const item = props.rowData

  function setPageKey(key: string) {
    setState({
      selectedPageKey: key,
    })
  }

  const hasSelected = batchSelected.has(item.key)

  function batchSelectToggle() {
    if (hasSelected) {
      batchSelected.delete(item.key)
    } else {
      batchSelected.add(item.key)
    }
  }

  return (
    <div
      style={{
        ...style,
      }}
      onClick={() => {
        setPageKey(item.key || item.url || '')
      }}
      className="group"
    >
      <div
        className={`mx-2 border-b border-gray-500 border-opacity-20 h-full select-none
                    ${
                      item.key === selectedPageKey
                        ? 'selected-page-item border-none outline outline-amber-400'
                        : ''
                    }`}
      >
        {useMemo(
          () => (
            <PageThumb webpage={item} />
          ),
          [item]
        )}
        <label
          className={`group-hover:flex hidden absolute right-1 top-0 h-full w-8  items-center ${
            hasSelected ? '!flex' : ''
          }`}
        >
          <input
            type="checkbox"
            checked={batchSelected.has(item.key)}
            onChange={batchSelectToggle}
            className="checkbox mx-1"
          />
        </label>
      </div>
    </div>
  )
}

export function PageList() {
  const { selectedPageKey, webpageFilter } = useContextSelector(
    context,
    (v) => v[0]
  )
  const setState = useContextSelector(context, (v) => v[1])
  const listRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<VariableSizeList>(null)
  const [pageList = []] = usePageList()

  function setPageKey(key: string) {
    setState({
      selectedPageKey: key,
    })
  }

  const setPreOrNext = useCallback(
    (step: number) => {
      const index = pageList.findIndex(
        (item) => (item.key || item.url) === selectedPageKey
      )
      let nextIndex = index + step
      if (nextIndex >= pageList.length) {
        nextIndex = 0
      } else if (nextIndex < 0) {
        nextIndex = pageList.length - 1
      }
      setPageKey(pageList[nextIndex].key || pageList[nextIndex].url || '')
    },
    [selectedPageKey, pageList]
  )

  useEffect(
    function () {
      const index = pageList.findIndex(
        (item) => (item.key || item.url) === selectedPageKey
      )

      const initSelectedIndex = index >= 0 ? index : 0

      scrollRef.current?.scrollToItem(initSelectedIndex)
    },
    [pageList, selectedPageKey]
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
      listRef.current?.addEventListener(EVENT_NAME, listener)
      return function () {
        listRef.current?.removeEventListener(EVENT_NAME, listener)
      }
    },
    [setPreOrNext]
  )

  function scrollToView() {
    const item = document.querySelector('.selected-page-item')
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

  // 保证选中的页面在可视区域
  useEffect(
    function () {
      const timer = setTimeout(function () {
        scrollToView()
      }, 4000)
      return function () {
        clearTimeout(timer)
      }
    },
    [selectedPageKey]
  )

  return (
    <div
      ref={listRef}
      className={'max-h-full h-full w-full overflow-hidden'}
      tabIndex={0}
    >
      {useMemo(
        () => (
          <AutoSizer>
            {(autoProps: Size) => (
              <VariableSizeList
                ref={scrollRef}
                className=""
                height={autoProps.height || 200}
                itemCount={pageList.length}
                width={autoProps.width || 100}
                itemSize={(index) => {
                  return 80
                }}
              >
                {(props) =>
                  Row({
                    ...props,
                    rowData: pageList[props.index],
                  })
                }
              </VariableSizeList>
            )}
          </AutoSizer>
        ),
        [pageList]
      )}
    </div>
  )
}
