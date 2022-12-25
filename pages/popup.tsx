import BasicLayout from "../layouts/BasicLayout";
import React, {useEffect, useState} from "react";
import Setting from "../components/Setting";
import ClipboardList from "../components/manage/ClipboardList";
import CurrentTab from "../components/popup/CurrentTab";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import CheckVersion from "../components/check/CheckVersion";
import Search from "../components/popup/Search";
import NavTabs from "../components/popup/NavTabs";

export default function PopupPage() {
    const [loaded, setLoaded] = useState(false);
    const [keyword,setKeyword] = useState('');

    useEffect(function () {
        setLoaded(true)
    }, [])


    if (!loaded) {
        return null
    }
    return (
        <BasicLayout nav={false} footer={false} title={'标签页'} full={true}>
            <CheckVersion requireVersion={'0.24.7'}>
                <div className={'m-auto border border-black shadow rounded-2xl overflow-hidden w-fit overflow-y-auto'}
                     style={{width: '30rem',height:'35rem'}}>
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

