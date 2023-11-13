import React from 'react'
import BasicSettingLine, { SettingSection } from './BasicSettingLine'
import useWhoAmi from '../../hooks/useWhoAmi'
import extApi from '@pagenote/shared/lib/pagenote-api'

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

  function openShortCutSetting() {
    if (!whoAmI?.extensionShortcutUrl) {
      alert('当前浏览器不支持直达插件设置中心')
      return
    }
    extApi.developer.chrome({
      namespace: 'tabs',
      type: 'create',
      args: [
        {
          url: whoAmI?.extensionShortcutUrl,
        },
      ],
    })
  }

  return (
    <>
      <SettingSection>
        <BasicSettingLine label={'存储空间'} path={'/setting/data'} />

        <BasicSettingLine label={'画笔设置'} path={'/setting/light'} />

        <BasicSettingLine label={'快捷键'} path={'/setting/shortcut'} />
      </SettingSection>

      <SettingSection className={'mt-6'}>
        <BasicSettingLine
          label={'插件版本'}
          subLabel={<span>{whoAmI?.extensionPlatform}</span>}
          right={
            <span className={'text-xs'}>
              <a href="https://pagenote.cn/release" target={'_blank'}>
                {whoAmI?.version || '-'}
              </a>
            </span>
          }
        />
      </SettingSection>
    </>
  )
}
