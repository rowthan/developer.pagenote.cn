import extApi from '@pagenote/shared/lib/pagenote-api'
import { ReactNode } from 'react'
import useCurrentTab from 'hooks/useCurrentTab'
import { toast } from 'utils/toast'
import { basePath } from 'const/env'
import { html } from '@pagenote/shared/lib/extApi'
import { RiDownloadCloudLine } from 'react-icons/ri'

import OfflineHTML = html.OfflineHTML
import useTableQuery from 'hooks/useTableQuery'
import { SnapshotResource, Step } from '@pagenote/shared/lib/@types/data'
import { TbCapture } from 'react-icons/tb'
import DisableButton from './DisableButton'
import KeyboardTip from '../../KeyboardTip'

function Item(props: {
  left: ReactNode
  leftClick?: () => void
  rightClick?: () => void
  right: ReactNode
}) {
  return (
    <div className={'inline-flex items-center gap-1 text-muted-foreground'}>
      <div
        onClick={props.leftClick}
        className={
          'cursor-pointer hover:bg-muted hover:text-accent-foreground rounded-md'
        }
      >
        {props.left}
      </div>
      <div
        onClick={props.rightClick}
        className={
          'px-1 text-xs cursor-pointer hover:bg-muted hover:text-accent-foreground'
        }
      >
        {props.right}
      </div>
    </div>
  )
}

export function OfflineButton() {
  const { tab } = useCurrentTab()
  const [resourceList] = useTableQuery<OfflineHTML>('resource', 'html', {
    limit: 9,
    query: {
      relatedPageUrl: tab?.url,
    },
    projection: {
      resourceId: 1,
      relatedPageUrl: 1,
    },
  })

  function offlineHtml() {
    if (resourceList.length > 4) {
      alert('请删除历史离线版本后，再创建新版本')
      return
    }
    extApi.developer
      .requestFront({
        params: {
          cssToInline: true,
          imageToLocal: true,
          removeScript: true,
        },
        type: 'offlineHTML',
      })
      .then(function (res) {
        toast(res?.error || '离线化成功。')
        setTimeout(function () {
          window.close()
        }, 1000)
      })
  }

  function gotoOffline(resourceList: Partial<OfflineHTML>) {
    window.open(
      resourceList.localUrl ||
        `${basePath}/ext/offline.html?id=${resourceList.resourceId}&url=${resourceList.relatedPageUrl}`
    )
  }

  const cnt = resourceList.length
  return (
    <Item
      leftClick={offlineHtml}
      left={
        <KeyboardTip tip={'存档网页'}>
          <span>
            <RiDownloadCloudLine />
          </span>
        </KeyboardTip>
      }
      rightClick={() => {
        gotoOffline(resourceList[0])
      }}
      right={<span>{cnt}</span>}
    />
  )
}

export function LightInfo() {
  const { tab } = useCurrentTab()
  const [lights] = useTableQuery<Step>('lightpage', 'light', {
    limit: 999,
    query: {
      pageKey: tab?.url,
    },
    projection: {
      lightId: 1,
    },
  })

  const cnt = lights.length
  return <Item left={<DisableButton />} right={<span>{cnt}</span>} />
}

interface Props {
  children?: ReactNode
  pageKey?: string
}

export function CaptureButton(props: Props) {
  const { children, pageKey } = props
  const { tab } = useCurrentTab()
  const key = pageKey || tab?.url
  const [snapshots = [], refresh] = useTableQuery<SnapshotResource>(
    'lightpage',
    'snapshot',
    {
      limit: 100,
      query: {
        $or: [
          {
            pageKey: key,
          },
          {
            pageUrl: key,
          },
        ],
      },
      sort: {
        createAt: -1,
      },
    }
  )

  function capture() {
    // if (!tabState?.active) {
    //   toast('请在当前标签页启动后再截图')
    //   return
    // }
    if (snapshots.length > 4) {
      alert('请删除历史截图，再创建新截图')
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
        refresh()
        console.log('更新结果', res)
      })
  }

  function gotoImg() {
    window.open(
      `${basePath}/ext/gallery.html?pageKey=${encodeURIComponent(key || '')}`
    )
  }

  return (
    <Item
      leftClick={capture}
      left={
        <KeyboardTip command={'capture'} tip={'截图网页'}>
          <span>
            <TbCapture />
          </span>
        </KeyboardTip>
      }
      rightClick={gotoImg}
      right={
        <KeyboardTip tip={'查看截图'}>
          <span>{snapshots.length}</span>
        </KeyboardTip>
      }
    />
  )
}

CaptureButton.defaultProps = {}
