import UserCard from '../account/UserCard'
import DataBackup from '../backup/DataBackup'
import SettingHome from './SettingHome'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import LightSetting from './LightSetting'
import ImageCloud from '../backup/extension/ImageCloud'
import ImportAndExport from '../backup/extension/ImportAndExport'
import SettingDetail from './SettingDetail'

export default function Setting() {
  return (
    <div className={'max-w-3xl m-auto p-5'}>
      <div className={'mb-4'}>
        <UserCard editable={false} />
      </div>

      <div className="">
        <Routes>
          <Route index element={<SettingHome />} />
          <Route path={'/light'} element={<LightSetting />} />
          <Route path={'/data'} element={<DataBackup />} />
          <Route
            path={'/data/backup'}
            element={
              <SettingDetail label={'导入导出'}>
                <ImportAndExport />
              </SettingDetail>
            }
          />
          <Route path={'/data/image-cloud'} element={<ImageCloud />} />
          <Route path={'*'} element={<SettingHome />} />
        </Routes>
      </div>
    </div>
  )
}
