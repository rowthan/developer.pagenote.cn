import TipInfo from '../../TipInfo'
import BasicSettingLine from '../../setting/BasicSettingLine'
import React, { ChangeEvent, useState } from 'react'
import { BackupData } from '@pagenote/shared/lib/@types/data'
import { toast } from '../../../utils/toast'
import { resolveImportString } from '@pagenote/shared/lib/utils/data'
import CloseSvg from '../../../assets/svg/close.svg'
import ExportFilter from './ExportFilter'
import ImportFilter from './ImportFilter'

export default function ExtensionData() {
  const [backupData, setBackupData] = useState<BackupData | null>(null)
  const [importState, setImportState] = useState(false)

  function onImportBackup(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target?.files || []
    if (!selectedFile[0]) {
      return toast('未选择备份文件', 'error')
    }

    const reader = new FileReader()
    reader.onload = function () {
      if (typeof this.result === 'string') {
        const backupData = resolveImportString(this.result)
        if (backupData) {
          setBackupData(backupData)
          setImportState(true)
        } else {
          toast('解析备份文件失败', 'error')
        }
      } else {
        toast('解析失败')
      }
    }
    reader.readAsText(selectedFile[0])
  }

  return (
    <>
      <BasicSettingLine
        label={
          <div>
            插件本地数据
            <TipInfo
              tip={
                '产生的数据存储在浏览器中。当插件被卸载时，数据也一并清空。如要卸载，请注意备份备份。'
              }
            />
          </div>
        }
        subLabel={'插件卸载时清空'}
        right={
          <div>
            <label htmlFor="my-modal-3" className="mr-2 btn btn-outline btn-xs">
              备份
            </label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <label htmlFor="my-modal-3" className="modal">
              <label htmlFor="" className="modal-box relative">
                <label
                  htmlFor="my-modal-3"
                  className="z-50 btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <ExportFilter />
              </label>
            </label>

            <label
              htmlFor={'backup-input'}
              className={'btn btn-outline btn-xs mr-2'}
            >
              <input
                id={'backup-input'}
                type="file"
                style={{ width: '0px' }}
                onChange={onImportBackup}
              />
              导入
            </label>
          </div>
        }
      />
      {importState && backupData && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button
              className={'absolute right-4'}
              onClick={() => {
                setImportState(false)
              }}
            >
              <CloseSvg />
            </button>
            <ImportFilter
              backupData={backupData}
              onSuccess={() => {
                setImportState(false)
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
