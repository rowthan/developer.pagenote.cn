import React from 'react'
import BasicSettingLine from './BasicSettingLine'
import useWhoAmi from '../../hooks/useWhoAmi'
import { checkIsInPopup } from '../../utils/check'
import { BrowserType } from '@pagenote/shared/lib/utils/browser'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { basePath } from '../../const/env'

export default function SettingHome() {
  const [whoAmI] = useWhoAmi()

  function openDataCenter() {
    extApi.commonAction.openTab({
      reUse: false,
      tab: {},
      url: `${whoAmI?.origin}/web/ext/popup.html#/setting/data`,
    })
    window.close()
  }

  return (
    <div className={'shadow rounded-lg'}>
      <BasicSettingLine label={'画笔设置'} path={'/setting/light'} />

      <BasicSettingLine label={'存储空间'} path={'/setting/data'} />

      <BasicSettingLine
        label={'插件版本'}
        right={
          <span className={'text-xs'}>
            <a href="https://pagenote.cn/release" target={'_blank'}>
              {whoAmI?.version || '-'}
            </a>
          </span>
        }
      />
    </div>
  )
}
