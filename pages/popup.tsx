import BasicLayout from "../layouts/BasicLayout";
import React, {useEffect, useState} from "react";
import Setting from "../components/Setting";
import ClipboardList from "../components/manage/ClipboardList";
import CurrentTab from "../components/popup/CurrentTab";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import CheckVersion from "../components/check/CheckVersion";
import Search from "../components/popup/Search";
import NavTabs from "../components/popup/NavTabs";
import extApi from "@pagenote/shared/lib/generateApi";
import useWhoAmi from "../hooks/useWhoAmi";

const CACHE_SEARCH_KEY = 'popup_search'

export default function PopupPage() {
    const [keyword,setKeyword] = useState<string>('');
    const [whoAmi,loading] = useWhoAmi();

    useEffect(function () {
       setKeyword(localStorage.getItem(CACHE_SEARCH_KEY) || '');
    },[])

    useEffect(function () {
        if(keyword){
            localStorage.setItem(CACHE_SEARCH_KEY, keyword)
        }
    },[keyword])

    useEffect(function () {
        if(whoAmi?.version){
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
            <CheckVersion requireVersion={'0.24.7'}>
                <div style={{height:"36rem",width:'30rem'}}
                     className={'m-auto border border-black shadow rounded-2xl overflow-hidden w-fit overflow-y-auto'}>
                    <Router>
                        <NavTabs keyword={keyword} onChangeKeyword={setKeyword} />
                        <Routes>
                            <Route index element={<CurrentTab/>}/>
                            <Route path={'/tab'} element={<CurrentTab/>}/>
                            <Route path="/clipboard" element={<ClipboardList/>}/>
                            <Route path="/setting" element={<Setting />} />
                            <Route path="/search" element={<Search keyword={keyword}/>}/>
                            <Route path="*" element={<CurrentTab/>}/>
                        </Routes>
                    </Router>
                </div>
            </CheckVersion>
        </BasicLayout>
    )
}

