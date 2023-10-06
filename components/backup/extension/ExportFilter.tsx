import React, { useState } from 'react'
import extApi from '@pagenote/shared/lib/pagenote-api'
import {
  BackupData,
  BackupDataType,
  BackupVersion,
  ContentType,
} from '@pagenote/shared/lib/@types/data'
import dayjs from 'dayjs'
import useWhoAmi from 'hooks/useWhoAmi'
import { Button } from '@/components/ui/button'

function queryAllData(db: string, table: string) {
  return extApi.table
    .query({
      db: db,
      table: table,
      params: {
        limit: 999999,
      },
    })
    .then(function (res) {
      return res.data.list
    })
}

export default function ExportFilter() {
  const [downloading, setDownloading] = useState(false)
  const [whoAmI] = useWhoAmi()

  async function exportData() {
    setDownloading(true)
    const localDownload = true //whoAmI?.browserType===BrowserType.Firefox TODO v3升级时 Firefox不支持，需兼容
    if (localDownload) {
      const [lights, notes, snapshots, pages, htmlList] = await Promise.all([
        queryAllData('lightpage', 'light'),
        queryAllData('lightpage', 'note'),
        queryAllData('lightpage', 'snapshot'),
        queryAllData('lightpage', 'webpage'),
        queryAllData('resource', 'html'),
      ])

      const backup: BackupData = {
        backupId: `${Date.now()}`,
        backup_at: Date.now(),
        box: [],
        dataType: [
          BackupDataType.pages,
          BackupDataType.light,
          BackupDataType.snapshot,
          BackupDataType.html,
          //@ts-ignore
          'note',
        ],
        extension_version: whoAmI?.version,
        lights: lights,
        pages: pages,
        notes: notes,
        snapshots: snapshots,
        htmlList: htmlList,
        size: 0,
        remark: '',
        resources: [],
        version: BackupVersion.version5,
      }
      const blob = new Blob([JSON.stringify(backup)], {
        type: ContentType.json,
      })
      const url = URL.createObjectURL(blob)
      const filename = `${whoAmI?.extensionPlatform}_${
        whoAmI?.version
      }_${dayjs().format('YYYY-MM-DD_HH_mm')}.pagenote.bak`
      extApi.developer
        .chrome({
          namespace: 'downloads',
          type: 'download',
          args: [
            {
              saveAs: true,
              url: url,
              filename: filename,
            },
          ],
        })
        .then(function () {
          URL.revokeObjectURL(url)
          setDownloading(false)
        })
    } else {
    }
  }

  return (
    <div>
      <Button
        disabled={downloading}
        className={'btn btn-sm'}
        onClick={exportData}
      >
        保存至本地
      </Button>
    </div>
  )
}
