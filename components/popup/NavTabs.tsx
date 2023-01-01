import {NavLink, redirect, useLocation, useNavigate} from "react-router-dom";
import OutLink from "../../assets/svg/outlink.svg";
import HomeSvg from "../../assets/svg/home.svg";
import React from "react";
import extApi from "@pagenote/shared/lib/generateApi";
import useWhoAmi from "../../hooks/useWhoAmi";

interface Tab {
    label: string,
    outlink: string,
    link: string,
}

const tabs: Tab[] = [{
    label: '标签页',
    outlink: '',
    link: '/tab'
}, {
    label: '剪切板',
    outlink: '',
    link: '/clipboard'
},
    {
        label: '设置',
        outlink: "",
        link: '/setting'
    }
]
export default function NavTabs(props:{keyword: string, onChangeKeyword:(keyword: string)=>void}) {
    const [whoAmi] = useWhoAmi();
    const navigate = useNavigate();
    const location = useLocation();

    function gotoSearch() {
        navigate('/search')
    }

    function gotoHome() {
        extApi.commonAction.openTab({
            url: `${whoAmi?.origin}/pagenote.html`
        })
    }

    const isSearchPath = location.pathname === '/search'
    return(
        <div className="tabs">
            {
                tabs.map((item, index) => (
                    <NavLink key={index}
                             to={item.link}
                             className={({ isActive }) =>
                                 `tab tab-lifted tab-${isActive ? 'active' : ''}`
                             }
                    >
                        {item.label}
                        {item.outlink && <OutLink width={14} height={14}/>}
                    </NavLink>
                ))
            }
            <div className={`tab tab-lifted ${isSearchPath ? 'tab-active':''}`} onClick={gotoSearch}>
                <input type="text" placeholder="🔍搜索笔记"
                       autoFocus={true}
                       value={props.keyword}
                       onChange={(e)=>{navigate('/search');props.onChangeKeyword(e.target.value)}}
                       className={`input input-xs input-bordered w-full max-w-md ${isSearchPath?'':''}`} />
            </div>
            <div data-tip={'前往管理页'} className={`tooltip tooltip-left tab tab-lifted flex`} onClick={gotoHome}>
                <HomeSvg className={'fill-current text-secondary hover:text-primary'} width={24} height={24} />
            </div>
        </div>
    )
}
