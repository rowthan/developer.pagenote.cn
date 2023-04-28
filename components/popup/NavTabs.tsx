import {NavLink, useLocation, useNavigate} from "react-router-dom";
import OutLink from "assets/svg/outlink.svg";
import HomeSvg from "assets/svg/home.svg";
import CloseSvg from 'assets/svg/close.svg'
import React, {useEffect, useRef} from "react";
import useWhoAmi from "hooks/useWhoAmi";
import useCurrentTab from "../../hooks/useCurrentTab";
import {getSearchKeyFormUrl} from "../../utils/search-engine";
import useConfig from "../../hooks/useConfig";

interface Tab {
    label: string,
    outlink: string,
    link: string,
}

const tabs: Tab[] = [{
    label: '标签页',
    outlink: '',
    link: '/'
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
export default function NavTabs(props: { keyword: string, onChangeKeyword: (keyword: string) => void }) {
    const [whoAmi] = useWhoAmi();
    const navigate = useNavigate();
    const location = useLocation();
    const {tab} = useCurrentTab();
    const config = useConfig();
    const {keyword,onChangeKeyword} =props;
    const ref = useRef<HTMLInputElement>(null)

    function gotoSearch() {
        navigate('/search')
    }

    function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        // POPUP 模式下，无效，页面被关掉
        if (e.key === 'Escape') {
            onChangeKeyword('');
            e.stopPropagation();
            e.preventDefault();
        }
    }

    useEffect(function () {
        if(!tab){
            return
        }
        if(config?.searchEngines?.length){
            const searchKey = getSearchKeyFormUrl(tab?.url,config.searchEngines);
            if(searchKey){
                onChangeKeyword(searchKey)
                navigate('/search')
            }
        }
    },[tab,config])

    const isSearchPath = location.pathname === '/search'
    return (
        <div className="tabs relative w-basic max-w-full">
            {
                tabs.map((item, index) => (
                    <NavLink key={index}
                             to={item.link}
                             className={({isActive}) =>
                                 `tab tab-lifted tab-${isActive ? 'active' : ''}`
                             }
                    >
                        {item.label}
                        {item.outlink && <OutLink width={14} height={14}/>}
                    </NavLink>
                ))
            }
            <div className={`tab tab-lifted ${isSearchPath ? 'tab-active' : ''}`} onClick={gotoSearch}>
                <input type="text" placeholder="🔍搜索笔记"
                       autoFocus={true}
                       value={keyword}
                       ref={ref}
                       onKeyUp={onKeyUp}
                       onChange={(e) => {
                           navigate('/search');
                           onChangeKeyword(e.target.value)
                       }}
                       className={`input input-xs input-bordered w-44  ${isSearchPath ? '' : ''}`}/>
                {
                    keyword &&
                    <span className="absolute right-5 ">
                        <CloseSvg onClick={()=>{onChangeKeyword('');ref.current?.focus()}}
                            className={'fill-current text-neutral'} />
                    </span>

                }
            </div>
            <a href={`${whoAmi?.origin}/pagenote.html`} target={'_blank'}
               data-tip={'前往管理页'} className={`link absolute right-5 top-1 tooltip tooltip-left flex`}>
                <HomeSvg className={'fill-current text-secondary hover:text-primary'} width={24} height={24}/>
            </a>
        </div>
    )
}
