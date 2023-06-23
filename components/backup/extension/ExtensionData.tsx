import React from 'react'
import StorageInfo from './StorageInfo'
import BasicSettingLine from '../../setting/BasicSettingLine'
import ImportAndExport from './ImportAndExport'
import { BrowserType } from '@pagenote/shared/lib/utils/browser'
import { checkIsInPopup } from 'utils/check'
import useWhoAmi from 'hooks/useWhoAmi'
import { basePath } from 'const/env'

export default function ExtensionData() {
  const [whoAmI] = useWhoAmi()

  console.log(whoAmI?.browserType, 'browser')
  // Firefox 失去焦点后，弹窗将自动关闭，会话中断
  const isFirefox = whoAmI?.browserType === BrowserType.Firefox

  function onClick() {
    if (isFirefox) {
      const url = `${basePath}/ext/setting.html#/setting/data/backup`
      if (checkIsInPopup()) {
        window.open(url, 'setting')
        window.close()
      } else {
        window.location.href = url
      }
    }
  }

  return (
    <div className={'mb-4'}>
      <StorageInfo />
      <BasicSettingLine
        className={isFirefox ? 'cursor-pointer' : ''}
        label={'管理插件数据'}
        onClick={onClick}
        right={isFirefox ? undefined : <ImportAndExport />}
      />
    </div>
  )
}
