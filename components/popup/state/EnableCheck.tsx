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
import UnlockCopySvg from 'assets/svg/wenjianfuzhi.svg'
import CaptureSvg from 'assets/svg/jietu.svg'
import { toast } from 'utils/toast'
import useSettings from 'hooks/useSettings'
import { useEffect } from 'react'
import useTabPagenoteData from 'hooks/useTabPagenoteData'
import Tab = chrome.tabs.Tab
import KeyboardTip from 'components/KeyboardTip'
import TipInfoSvg from 'assets/svg/info.svg'
import WindowTabs from '../WindowTabs'
import OfflineButton from './OfflineButton'
import DisableButton from './DisableButton'

export default function EnableCheck() {
  const [tabState, mutate, isLoading] = useTabPagenoteState()
  const { tab } = useCurrentTab()
  const [webpage, refresh] = useTabPagenoteData()

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
        console.log('更新结果', res)
        refresh()
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

  const snapshotLength = webpage?.plainData?.snapshots?.length || 0
  return (
    <div className={'mt-48 mx-auto'}>
      <div className={'flex justify-center'}>
        <DisableButton />
      </div>
      <div className={'w-full m-auto my-2 align-center'}>
        <div
          className={`transform-gpu transition duration-500 ease-in-out flex justify-center`}
        >
          <div
            className={'tooltip tooltip-bottom'}
            data-tip={`${
              snapshotLength ? `已截图${snapshotLength}` : '启动后可截图'
            }`}
          >
            <KeyboardTip command={'capture'}>
              <button
                disabled={!tabState?.active}
                onClick={capture}
                className={`relative btn btn-sm text-xs w-24 p-0 rounded ${
                  snapshotLength > 0 ? 'btn-primary text-white' : 'btn-outline '
                }`}
              >
                <CaptureSvg className={'inline-block'} />
                截图
              </button>
            </KeyboardTip>
          </div>

          <KeyboardTip command={'enable_copy'}>
            <button
              onClick={enableCopy}
              className={`t btn btn-sm rounded text-xs  ml-1 w-33 ${
                tabState.enabledCopy ? 'btn-primary text-white' : 'btn-outline'
              }`}
            >
              <UnlockCopySvg />{' '}
              {tabState.enabledCopy ? '已经解除限制' : '解除复制限制'}
              <span
                className={'tooltip tooltip-left tooltip-info'}
                data-tip={'个别网站不允许选取、复制。为你破解该限制'}
              >
                <TipInfoSvg className={'fill-current'} />
              </span>
            </button>
          </KeyboardTip>
        </div>
      </div>
      <div className={'flex justify-center w-full'}>
        <OfflineButton />
      </div>

      {/*<div className={'absolute right-1 bottom-1 w-full'}>*/}
      {/*    <DisableButton />*/}
      {/*</div>*/}
      {/*    标签- 智能标签 - 》（智能标签可以设置专属的定时动作-如按时打开、按时清理等）*/}
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
