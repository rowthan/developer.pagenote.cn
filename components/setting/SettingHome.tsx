import React from 'react'
import BasicSettingLine, {SettingSection} from './BasicSettingLine'
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

  return (
    <SettingSection>
      <BasicSettingLine label={'画笔设置'} path={'/setting/light'} />

      <BasicSettingLine label={'存储空间'} path={'/setting/data'} />

      {/*<BasicSettingLine*/}
      {/*  label={'插件版本'}*/}
      {/*  right={*/}
      {/*    <span className={'text-xs'}>*/}
      {/*      <a href="https://pagenote.cn/release" target={'_blank'}>*/}
      {/*        {whoAmI?.version || '-'}*/}
      {/*      </a>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*/>*/}
    </SettingSection>
  )
}
