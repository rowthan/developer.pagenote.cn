import BasicLayout from "../layouts/BasicLayout";
import {useEffect, useState} from "react";
import Setting from "../components/Setting";
import UserInfo from "../components/UserInfo";
import OutLink from '../assets/svg/outlink.svg'
import ClipboardList from "../components/manage/ClipboardList";
import CurrentTab from "../components/popup/CurrentTab";

interface Tab {
    label: string,
    outlink: string,
}

const tabs: Tab[] = [{
    label: '当前网页',
    outlink: ''
},{
    label: '剪切板',
    outlink: ''
},
    {
        label: '设置',
        outlink: ""
    }, {
        label: '前往管理',
        outlink: '/pagenote.html',
    },
]



const POPUP_CACHE_KEY = 'popup_tab'
export default function PopupPage() {
    const [activeTab, setActive] = useState('');

    useEffect(function () {
        setActive(localStorage.getItem(POPUP_CACHE_KEY)||'当前网页')
    }, [])

    function setTab(item: Tab) {
        if (item.outlink) {
            window.open(item.outlink)
        } else {
            setActive(item.label)
            localStorage.setItem(POPUP_CACHE_KEY,item.label)
        }
    }

    return (
        <BasicLayout nav={false} title={'标签页'} full={true}>
            <div className={'m-auto'} style={{minHeight: "30rem",minWidth:"28rem",maxWidth: '40rem'}}>
                <div className="tabs">
                    {
                        tabs.map((item, index) => (
                            <a key={index}
                               onClick={() => {
                                   setTab(item)
                               }}
                               className={`tab tab-lifted tab-${activeTab === item.label ? 'active' : ''}`}>
                                {item.label}
                                {item.outlink && <OutLink width={14} height={14}/>}
                            </a>
                        ))
                    }
                </div>
                <div className='p-2'>
                    {
                        activeTab === '当前网页' &&
                        <CurrentTab />
                    }
                    {
                        activeTab === '剪切板' &&
                        <ClipboardList />
                    }
                    {
                        activeTab === '设置' &&
                        <div>
                            <UserInfo/>
                            <Setting/>
                        </div>
                    }
                </div>
            </div>
        </BasicLayout>
    )
}

