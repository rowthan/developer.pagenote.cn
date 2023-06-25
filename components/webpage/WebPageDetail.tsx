import { WebPage } from '@pagenote/shared/lib/@types/data'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PlainInputArea from '../form/PlainInputArea'
import ImgFallback from '../image/ImgFallback'
import { debounce, throttle } from 'lodash'
import useWebpage from '../../hooks/useWebpage'
import ErrorBoundary from 'components/debug/ErrorBound'
import ErrorTip from 'components/debug/ErrorTip'
import LightsEditor from 'components/editor/LightsEditor'
import PageHead from './PageHead'
import { CgChevronDoubleDown, CgMaximize, CgTrashEmpty } from 'react-icons/cg' //css.gg/icons/svg/chevron-double-down.svg
import { basePath, isExt } from 'const/env'
import Head from 'next/head'
import ActionItem from '../list/ActionItem'
import TagGroup from '../tags/TagGroup'
import { DiMarkdown } from 'react-icons/di'
import { PredefinedSchema } from '@pagenote/shared/lib/pagenote-convert/predefined'
import { writeTextToClipboard } from '../../utils/clipboard'
import { toast } from '../../utils/toast'
import mustache from 'mustache'

interface WebPageDetailProps {
  initWebpage?: Partial<WebPage> | null
  pageKey: string
}

function AsideActionBars(props: { pageKey?: string; refresh?: () => void }) {
  const { pageKey } = props
  const { updateServer, data } = useWebpage(pageKey)
  const ACTIONS = [
    {
      icon: <CgMaximize />,
      onclick: function () {
        const url = isExt ? `${basePath}/ext/page.html` : '/ext/page'
        window.open(url + '?id=' + pageKey)

        // extApi.commonAction
        //   .openTab({
        //     tab: {},
        //     url: url,
        //     reUse: true,
        //   })
        //   .then(function (res) {
        //     if (!res.success) {
        //       window.open(url + '?id=' + pageKey)
        //     }
        //   })
      },
      name: '新标签打开',
      shortcut: '', //'cmd+t',
    },
    {
      icon: <DiMarkdown />,
      onclick: function () {
        if (data) {
          // todo 将元信息通过表格的形势存储，并以 toggle 或注视的的方式存储；图片的转换有丢失。
          const schema = `## [{{title}}]({{{url}}})
{{#plainData.steps}}> * {{text}}

{{#tip}}{{{tip}}}

{{/tip}}{{/plainData.steps}} 
          `
          const text = mustache.render(schema, data)
          writeTextToClipboard(text).then(function () {
            toast('已复制')
          })
        }
      },
      name: '导出为 markdown',
    },
    {
      icon: <CgTrashEmpty />,
      onclick: function () {
        updateServer({
          deleted: true,
        })
      },
      name: '删除',
    },
  ]
  if (!pageKey) {
    return null
  }
  return (
    <div
      className={
        'flex items-center border-l-[eeeeee] border-l border-1 text-sm text-color-150 select-none'
      }
    >
      <div className="dropdown dropdown-bottom dropdown-end ">
        <label
          tabIndex={0}
          className={'block cursor-pointer rounded text-[24px]'}
        >
          <CgChevronDoubleDown />
        </label>
        <div
          tabIndex={0}
          className="dropdown-content menu shadow w-[220px] bg-color-0 rounded mt-1 p-1"
        >
          {ACTIONS.map((item, index) => (
            <ActionItem
              key={index}
              name={item.name}
              icon={item.icon}
              onClick={item.onclick}
            >
              {item.shortcut && (
                <span className="text-xs text-color-500">{item.shortcut}</span>
              )}
            </ActionItem>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WebPageDetail(props: WebPageDetailProps) {
  const { initWebpage, pageKey = '' } = props
  const {
    data: webpage = initWebpage,
    isLoading: loading,
    updateServer,
  } = useWebpage(pageKey)
  const [showContext, setShowContext] = useState(false)
  const { plainData } = webpage || {}
  const { snapshots = [] } = plainData || {}

  const savePage = useCallback(
    debounce(function (data: Partial<WebPage>) {
      if (!webpage?.key && !webpage?.url) {
        return
      }
      updateServer(data)
    }, 400),
    [webpage]
  )

  function onChangeDescription(value: string) {
    // 对输入内容清空换行符
    savePage({
      description: value,
    })
  }

  function onTitleChange(value: string) {
    savePage({
      title: value,
    })
  }

  function fetchAbstract(e: React.FocusEvent<HTMLButtonElement>) {
    console.log('fetchAbstract')
    e.stopPropagation()
    e.preventDefault()
  }

  function onSaveCategories(result: string[]) {
    console.log(result, '编辑结果')
    savePage({
      categories: result,
      updateAt: Date.now(),
    })
  }

  function toggleDelete(deleted: boolean) {
    savePage({
      deleted: deleted,
      updateAt: Date.now(),
    })
  }

  const { cover, icon, url, title } = webpage || {}
  const pageCover = []
  if (cover) {
    pageCover.push(cover)
  }
  if (snapshots.length) {
    pageCover.push(...snapshots)
  }
  if (pageCover.length === 0) {
    pageCover.push(
      'https://pagenote-public.oss-cn-beijing.aliyuncs.com/_static/page-header.jpeg?x-oss-process=style/q75'
    )
  }

  const thumbs = pageCover.map((img) => {
    return {
      img: img,
    }
  })

  const loadingClass = loading ? 'loading-block' : ''

  const deleted = webpage?.deleted
  return (
    <ErrorBoundary fallback={ErrorTip}>
      <Head>{title && <title>{title}</title>}</Head>
      <div
        className={`font-sans h-full flex flex-col relative ${
          deleted ? 'overflow-hidden' : 'overflow-auto'
        }`}
      >
        <div className="shrink-0">
          <PageHead thumbs={thumbs}>
            <div className="absolute bottom-0 right-6 mb-2 flex bg-color-150 text-color-100 rounded">
              <label className="flex items-center  text-xs p-1 select-none">
                <span>显示上下文</span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm toggle-success"
                  checked={showContext}
                  onChange={(e) => setShowContext(e.target.checked)}
                />
              </label>
              <AsideActionBars pageKey={pageKey} />
            </div>
          </PageHead>
        </div>

        <main className="relative m-auto flex-grow w-full max-w-7xl px-6">
          <div className={'relative flex justify-end w-full pt-2'}>
            <div className="absolute -top-8 left-0 z-10">
              <a href={url} target={'_blank'}>
                <ImgFallback
                  key={icon}
                  title={'点击前往：' + url}
                  className="w-16 h-16"
                  src={icon}
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="h-full m-auto py-12 ">
            <article className="relative h-full m-auto flex flex-col">
              <h1 className={`shrink-0 font-bold text-3xl ${loadingClass}`}>
                <PlainInputArea
                  maxLength={80}
                  innerState={true}
                  singleLine={true}
                  readonly={true}
                  tabIndex={0}
                  placeholder={'设置一个标题'}
                  value={webpage?.title || ''}
                  onInputChange={onTitleChange}
                >
                  <div
                    className={
                      'max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis'
                    }
                  >
                    {webpage?.title || webpage?.url || '无标题'}
                  </div>
                </PlainInputArea>
              </h1>
              {/*href={`/ext/page?id=${webpage?.key}`}*/}
              <div
                className={`shrink-0 text-color-600 text-sm my-2 ${loadingClass}`}
              >
                <PlainInputArea
                  maxLength={240}
                  tabIndex={0}
                  placeholder={'输入一段摘要'}
                  readonly={true}
                  value={webpage?.description || ''}
                  innerState={true}
                  onInputChange={onChangeDescription}
                >
                  {webpage?.description || (
                    <span>{webpage?.url || '无摘要'}</span>
                  )}
                  {/*TODO 基于内容自动生成摘要*/}
                  {/*<button onFocus={fetchAbstract} className={'btn btn-outline btn-xs'}>抓取摘要</button>*/}
                </PlainInputArea>
              </div>
              <nav
                className={`shrink-0  flex mt-1 items-center text-color-500 dark:text-color-400 ${loadingClass}`}
              >
                <time className="mr-2 text-xs md:ml-0">
                  {webpage?.updateAt &&
                    dayjs(webpage?.updateAt).format('YYYY-MM-DD HH:mm')}
                </time>
                <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags gap-2 min-w-[80px]">
                  <TagGroup
                    tags={webpage?.categories || []}
                    onSave={onSaveCategories}
                  />
                </div>
              </nav>

              <div className="h-full mt-4 p-0 leading-7 my-1 editor-container">
                <LightsEditor
                  pageKey={webpage?.key || ''}
                  showContext={showContext}
                />
                {/* <SlateEditor key={webpage?.key} steps={webpage?.plainData?.steps || []}/> */}
              </div>
            </article>
          </div>
        </main>

        {deleted && (
          <div
            className={
              'deleted-mask w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 bottom-0 right-0 z-50 flex items-center'
            }
          >
            <div className={'m-auto'}>
              <div className="w-full mx-auto">
                <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                  <div className="flex flex-col items-center text-center">
                    <div className="inline-block p-4 bg-yellow-50 rounded-full">
                      <svg
                        className="w-12 h-12 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                      </svg>
                    </div>
                    <h2 className="mt-2 font-semibold text-gray-800 whitespace-nowrap">
                      当前页面已删除，无法继续操作
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      删除后，将保留30天，在此期间，你可以恢复此数据。
                    </p>
                  </div>

                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => {
                        toggleDelete(false)
                      }}
                      className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                    >
                      恢复
                    </button>

                    {/*<button className="flex-1 px-4 py-2 ml-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md">*/}
                    {/*  彻底删除*/}
                    {/*</button>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
