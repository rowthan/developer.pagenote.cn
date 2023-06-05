import UserCard from '../account/UserCard'
import DataBackup from '../backup/DataBackup'
import SettingHome from './SettingHome'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import LightSetting from './LightSetting'

export default function Setting() {
  return (
    <div className={'max-w-3xl m-auto'}>
      <div className={'mb-4'}>
        <UserCard editable={false} />
      </div>

      <div className="">
        <Routes>
          <Route index element={<SettingHome />} />
          <Route path={'/light'} element={<LightSetting />} />
          <Route path={'/data'} element={<DataBackup />} />
          <Route path={'*'} element={<SettingHome />} />
        </Routes>
      </div>
    </div>
  )
}
