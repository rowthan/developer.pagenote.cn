import BasicLayout from "layouts/BasicLayout";
import React, {useEffect, useState} from "react";
import Setting from "components/Setting";
import ClipboardList from "components/manage/ClipboardList";
import CurrentTab from "components/popup/CurrentTab";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import CheckVersion from "components/check/CheckVersion";
import Search from "components/popup/Search";
import NavTabs from "components/popup/NavTabs";
import extApi from "@pagenote/shared/lib/pagenote-api";
import useWhoAmi from "hooks/useWhoAmi";

const CACHE_SEARCH_KEY = 'popup_search'

export default function PopupPage() {
    const [keyword, setKeyword] = useState<string>('');
    const [whoAmi, loading] = useWhoAmi();

    useEffect(function () {
        setKeyword(localStorage.getItem(CACHE_SEARCH_KEY) || '');
    }, [])

    useEffect(function () {
        if (keyword) {
            localStorage.setItem(CACHE_SEARCH_KEY, keyword)
        }
    }, [keyword])

    useEffect(function () {
        if (whoAmi?.version) {
            extApi.commonAction.setPersistentValue({
                key: 'popup_version',
                value: whoAmi?.version,
            })
        }
    }, [whoAmi])


    if (loading) {
        return null
    }
    return (
        <BasicLayout nav={false} footer={false} title={'当前标签页'} full={true}>
            <div className={'w-basic m-auto border border-black shadow rounded-lg overflow-hidden'}>
                <CheckVersion requireVersion={'0.24.7'}>
                    <Router>
                        <NavTabs keyword={keyword} onChangeKeyword={setKeyword}/>
                        <div className={'w-basic h-basic relative overflow-hidden overflow-y-auto '}>
                            <Routes>
                                <Route index element={<CurrentTab/>}/>
                                <Route path={'/tab'} element={<CurrentTab/>}/>
                                <Route path="/clipboard" element={<ClipboardList/>}/>
                                <Route path="/search" element={<Search keyword={keyword}/>}/>
                                <Route path="/setting/*" element={<Setting/>}/>
                                <Route path="*" element={<CurrentTab/>}/>
                            </Routes>
                        </div>
                    </Router>
                </CheckVersion>
            </div>
        </BasicLayout>
    )
}

