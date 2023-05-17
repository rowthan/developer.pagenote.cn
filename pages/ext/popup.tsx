import BasicLayout from 'layouts/BasicLayout'
import React, { useEffect, useState } from 'react'
import CurrentTab from 'components/popup/CurrentTab'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import CheckVersion from 'components/check/CheckVersion'
import NavTabs from 'components/popup/NavTabs'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useWhoAmi from 'hooks/useWhoAmi'
import { Suspense, lazy } from 'react'

const ClipboardList = lazy(() => import('components/manage/ClipboardList'))
const Search = lazy(() => import('components/popup/Search'))
const Setting = lazy(() => import('components/setting/Setting'))

const CACHE_SEARCH_KEY = 'popup_search'

export default function PopupPage() {
  const [keyword, setKeyword] = useState<string>('')
  const [whoAmi, loading] = useWhoAmi()

  useEffect(function () {
    setKeyword(localStorage.getItem(CACHE_SEARCH_KEY) || '')
  }, [])

  useEffect(
    function () {
      if (keyword) {
        localStorage.setItem(CACHE_SEARCH_KEY, keyword)
      }
    },
    [keyword]
  )

  useEffect(
    function () {
      if (whoAmi?.version) {
        extApi.commonAction.setPersistentValue({
          key: 'popup_version',
          value: whoAmi?.version,
        })
      }
    },
    [whoAmi]
  )

  if (loading) {
    return null
  }
  return (
    <BasicLayout nav={false} footer={false} title={'当前标签页'} full={true}>
      <div
        className={
          'w-basic m-auto border border-black shadow rounded-lg overflow-hidden transform translate-x-0'
        }
      >
        <Router>
            <NavTabs keyword={keyword} onChangeKeyword={setKeyword} />
            <div
              className={
                'w-basic h-basic relative overflow-hidden overflow-y-auto '
              }
            >
              <Routes>
                <Route index element={<CurrentTab />} />
                <Route path={'/tab'} element={<CurrentTab />} />
                <Route
                  path="/clipboard"
                  element={
                    <Suspense>
                      {' '}
                      <ClipboardList />
                    </Suspense>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <Suspense>
                      <Search keyword={keyword} />
                    </Suspense>
                  }
                />
                <Route
                  path="/setting/*"
                  element={
                    <Suspense>
                      {' '}
                      <Setting />
                    </Suspense>
                  }
                />
                <Route path="*" element={<CurrentTab />} />
              </Routes>
            </div>
          </Router>
      </div>
    </BasicLayout>
  )
}
