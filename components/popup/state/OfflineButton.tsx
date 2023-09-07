import extApi from '@pagenote/shared/lib/pagenote-api'
import OfflineSvg from 'assets/svg/offline_download.svg'
import TipInfoSvg from 'assets/svg/info.svg'
import useTabPagenoteState from 'hooks/useTabPagenoteState'
import { useEffect, useState } from 'react'
import useCurrentTab from 'hooks/useCurrentTab'
import { toast } from 'utils/toast'
import { basePath } from 'const/env'
import { html } from '@pagenote/shared/lib/extApi'
import OfflineHTML = html.OfflineHTML

export default function OfflineButton() {
  const [tabState] = useTabPagenoteState()
  const { tab } = useCurrentTab()
  const [resourceList, setList] = useState<Partial<OfflineHTML>[]>([])

  function offlineHtml() {
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
        fetchResourceList()
        toast(res.error || '离线化成功。')
        setTimeout(function () {
          window.close()
        }, 1000)
      })
  }

  function fetchResourceList() {
    if (!tab?.url) {
      return
    }
    extApi.html
      .query({
        query: {
          relatedPageUrl: tab.url,
        },
        page: 0,
        pageSize: 9999,
        projection: {
          resourceId: 1,
          relatedPageUrl: 1,
        },
      })
      .then(function (res) {
        if (res.success) {
          setList(res.data.list || [])
        }
      })
  }

  function gotoOffline(e: { stopPropagation: () => void }) {
    e.stopPropagation()
    window.open(
      resourceList[0].localUrl ||
        `${basePath}/ext/offline.html?id=${resourceList[0].resourceId}&url=${resourceList[0].relatedPageUrl}`
    )
  }

  useEffect(
    function () {
      fetchResourceList()
    },
    [tab]
  )

  const cnt = resourceList.length
  return (
    <button
      onClick={offlineHtml}
      disabled={!tabState?.connected}
      className={` flex-shrink m-auto btn btn-sm rounded-none ${
        cnt > 0 ? 'btn-primary text-white' : 'btn-outline'
      }`}
    >
      <OfflineSvg className={'fill-current'} />
      离线化
      <span
        className={`tooltip tooltip-bottom tooltip-info align-bottom`}
        data-tip={`将当前访问的网页永久保存为离线网页。已离线${cnt}`}
      >
        <TipInfoSvg className={'fill-current'} />
      </span>
    </button>
  )
}
