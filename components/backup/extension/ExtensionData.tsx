import React, { ChangeEvent, useState } from 'react'
import StorageInfo from './StorageInfo'
import BasicSettingLine from '../../setting/BasicSettingLine'
import ImportAndExport from './ImportAndExport'

export default function ExtensionData() {
  return (
    <>
      <div className={'mb-4'}>
        <StorageInfo />
        <BasicSettingLine label={'管理插件数据'} right={<ImportAndExport />} />
      </div>
    </>
  )
}
