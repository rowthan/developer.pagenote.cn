import React from 'react'
import BasicSettingLine from '../setting/BasicSettingLine'
import SettingDetail from '../setting/SettingDetail'
import ExtensionData from './extension/ExtensionData'
import { get } from 'lodash'
import useUserConfig from '../../hooks/useUserConfig'
import SettingMoreSvg from '../../assets/svg/right-more.svg'

export default function DataBackup() {
  const [cloudConfig, setCloudConfig] = useUserConfig('cloud')
  const enabled = !!get(cloudConfig, 'enable')

  return (
    <SettingDetail label={'数据管理'}>
      <div className={' min-w-80'}>
        <ExtensionData />
        <div>
          <BasicSettingLine
            label={<span>图片优化</span>}
            right={
              <div className={'flex items-center text-color-400'}>
                <div className={'text-xs'}>{enabled ? '开' : '关'}</div>
                <SettingMoreSvg className={'fill-current '} />
              </div>
            }
            path={'/setting/data/image-cloud'}
          />
        </div>
        {/*<BasicSettingLine*/}
        {/*  label={*/}
        {/*    <span>*/}
        {/*      云端数据库*/}
        {/*      <TipInfo tip={'将数据存储在云端，多设备可以同步数据。'} />*/}
        {/*    </span>*/}
        {/*  }*/}
        {/*  right={<div className={'text-xs'}>敬请期待...</div>}*/}
        {/*/>*/}

        {/*<BasicSettingLine subLabel={'备份数据至第三方存储平台'} label={*/}
        {/*    <span>*/}
        {/*        时间机器*/}
        {/*    </span>*/}
        {/*} right={*/}
        {/*    <div className={'text-xs'}>*/}
        {/*        敬请期待...*/}
        {/*    </div>*/}
        {/*}/>*/}
      </div>
    </SettingDetail>
  )
}
