import SettingCom from 'components/setting/Setting'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import CheckVersion from 'components/check/CheckVersion'
import React from 'react'
import BasicLayout from 'layouts/BasicLayout'

export default function Setting() {
  return (
    <BasicLayout nav={false} footer={true} title={'设置'} full={true}>
      <CheckVersion requireVersion={'0.26.0'}>
        <div className={'p-4'}>
          <Router>
            <Routes>
              <Route path="/" element={<SettingCom />} />
              <Route path="*" element={<SettingCom />} />
            </Routes>
          </Router>
        </div>
      </CheckVersion>
    </BasicLayout>
  )
}
