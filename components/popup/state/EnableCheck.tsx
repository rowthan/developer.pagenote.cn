import extApi from '@pagenote/shared/lib/pagenote-api'
import useCurrentTab from 'hooks/useCurrentTab'
import {
  checkIsBrowserAppStore,
  checkIsBrowserBasicUrl,
  checkIsLocalFile,
  checkIsPdf,
  checkIsReadMode,
} from 'utils/check'
import { enablePagenote, refreshTab } from 'utils/popup'
import WarnSvg from 'assets/svg/warn.svg'
import useTabPagenoteState from 'hooks/useTabPagenoteState'
import {toast} from 'utils/toast'
import useSettings from 'hooks/useSettings'
import {useEffect} from 'react'
import useTabPagenoteData from 'hooks/useTabPagenoteData'
import Tab = chrome.tabs.Tab
import WindowTabs from '../WindowTabs'
import OfflineButton from './OfflineButton'
import DisableButton from './DisableButton'
import {TbCapture} from 'react-icons/tb'
import ActionButton from "../../button/ActionButton";
import {LuCopyCheck} from 'react-icons/lu'
import useTableQuery from "../../../hooks/useTableQuery";
import {SnapshotResource} from "@pagenote/shared/lib/@types/data";
import {basePath} from "../../../const/env";
import {Bookmark} from '@/components/bookmark'
import Tiptap from 'components/editor/TipTap'

export default function EnableCheck() {
    const [tabState, mutate, isLoading] = useTabPagenoteState()
    const {tab} = useCurrentTab()
    const [snapshots = [], refresh] = useTableQuery<SnapshotResource>('lightpage', 'snapshot', {
        limit: 100,
        query: {
            $or: [
                {
                    pageKey: tab?.url
        },
        {
          pageUrl: tab?.url
        }
      ]
    },
    sort: {
      createAt: -1
    }
  })

  function enableInject() {
    if (tabState?.active) {
      return
    }
    enablePagenote(tab?.id).then(function () {
      setTimeout(function () {
        mutate()
      }, 500)
      toast('已成功开启')
    })
  }

  function enableCopy() {
    if (tabState?.enabledCopy) {
      return
    }
    extApi.commonAction
      .injectCodeToPage({
        scripts: ['/lib/enable_copy.js'],
        tabId: tab?.id,
        css: [],
        allFrames: false,
      })
      .then(function (res) {
        mutate()
      })
  }

  function capture() {
    if (!tabState?.active) {
      toast('请在当前标签页启动后再截图')
      return
    }
    if (snapshots.length > 4) {
      alert('请删除历史截图，再创建新截图')
      return;
    }

    extApi.developer
        .requestFront({
          header: {
            targetTabId: tab?.id,
          },
          params: {
            fullPage: false,
          },
          type: 'runCaptureTab',
      })
      .then(function (res) {
        refresh()
        console.log('更新结果', res)
      })
  }

  useEffect(function () {
    setTimeout(function () {
      mutate()
    }, 200)
  }, [])

  if (isLoading && !tabState) {
    return null
  }

  if (!tabState || checkIsPdf(tab?.url || '')) {
    return <Waring tab={tab} />
  }

  const snapshotLength = snapshots?.length || 0


    return (
        <div className={'mx-auto p-4'}>
            <Bookmark/>
            <Tiptap/>
            <div className={'flex justify-center items-center'}>
                <DisableButton/>
            </div>


            <div className={'mt-36'}>
                <div className={'flex my-2'}>
                    <ActionButton
                        tip={'截图'}
                        disabled={!tabState?.connected}
                onClick={capture}
                active={snapshotLength > 0}
                keyboard={'capture'}
            >
              <TbCapture/>
            </ActionButton>
            <div className={'ml-2 flex flex-wrap'}>
              {
                snapshots.map((item, index) => (
                    <a href={`${basePath}/ext/img.html?id=${item.key}`} target={'_blank'} key={index}>
                      <img className={'h-8 border-gray-100 border mx-1 mb-1'} src={item.uri || item.url} alt=""/>
                    </a>
                ))
              }
                {
                    snapshots.length === 0 &&
                    <span className={'text-sm text-color-200'}>保存当前网页为图片</span>
                }
            </div>
          </div>
            <div className={'my-2'}>
                <OfflineButton/>
            </div>
            <div className={'flex my-2'}>
                <ActionButton
                    active={tabState.enabledCopy}
                    onClick={enableCopy}
                    tip={'允许复制'}
                    keyboard={'enable_copy'}
                    className={''}
                >
                    <LuCopyCheck/>
                </ActionButton>
                <div className={'ml-2 text-sm text-color-200'}>
                    一键破解禁止右键、选择、复制
                </div>
            </div>
        </div>

      </div>
  )
}

function Waring(props: { tab?: Tab }) {
  const { tab } = props
  const isHtmlFile = checkIsLocalFile(tab?.url)
  const isBrowserUrl = checkIsBrowserBasicUrl(tab?.url)
  const isAppstoreUrl = checkIsBrowserAppStore(tab?.url)
  const isPdfUrl = checkIsPdf(tab?.url || '')

  const unSupportUrl = isBrowserUrl || isAppstoreUrl || isPdfUrl
  if (unSupportUrl) {
    return (
      <div>
        <h3>点击切换标签页</h3>
        <WindowTabs />
        <div className={'text-gray-400'}>
          <key-word>无法在此网页上使用</key-word>
          运行 PAGENOTE，请切换至其他标签页使用标记功能。
        </div>
      </div>
    )
  }

  const isReadMode = checkIsReadMode(tab?.url)
  if (isReadMode) {
    return (
      <div>
        <WindowTabs />
        <div className={'text-gray-400'}>
          不可在阅读模式下工作。
          <div className={'text-sm'}>
            请切换至其他标签页，或退出阅读模式后使用 PAGENOTE。
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="alert alert-warning shadow-lg my-4">
      <div>
        <WarnSvg className="text-warning fill-current flex-shrink-0 h-6 w-6" />
        <div>
          <div className={'text-lg'}>此标签页无法与PAGENOTE联通</div>

          {isHtmlFile ? (
            <div className={'text-sm'}>
              请授权
              <a
                href="https://page-note.notion.site/ce1300d2471b4391946bd1a7c281758f#1a1a1746bae74d6b8f21f9d8b5a77434"
                className={'link'}
                target={'_blank'}
                rel="noreferrer"
              >
                「允许访问文件网址」
              </a>
              后刷新重新尝试。
            </div>
          ) : (
            <div className={'text-sm'}>
              {isBrowserUrl ? (
                <div className={'text-red-500'}>
                  浏览器插件无法在此类页面上使用：
                  <div className={'text-xs break-all'}>{tab?.url}</div>
                </div>
              ) : (
                <div>
                  <a
                    className="link"
                    onClick={() => {
                      refreshTab(tab)
                    }}
                  >
                    请刷新页面
                  </a>{' '}
                  后重试
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
