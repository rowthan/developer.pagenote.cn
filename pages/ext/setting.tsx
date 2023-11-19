import SettingCom from 'components/setting/Setting'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import BasicLayout from 'layouts/BasicLayout'
import RedirectToExt from '../../components/RedirectToExt'
import { useMountedState } from 'react-use'

export default function Setting() {
  const mounted = useMountedState()

  return (
    <BasicLayout nav={false} footer={true} title={'设置'} full={true}>
      <RedirectToExt>
        <div className={'p-4 min-h-fill'}>
          {mounted() && (
            <Router>
              <Routes>
                <Route path="/" element={<SettingCom />} />
                <Route path="/setting/*" element={<SettingCom />} />
              </Routes>
            </Router>
          )}
        </div>
      </RedirectToExt>
    </BasicLayout>
  )
}
