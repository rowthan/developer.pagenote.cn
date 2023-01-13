import {NavLink, useLocation, useNavigate} from "react-router-dom";
import OutLink from "assets/svg/outlink.svg";
import HomeSvg from "assets/svg/home.svg";
import CloseSvg from 'assets/svg/close.svg'
import React, {useRef} from "react";
import useWhoAmi from "hooks/useWhoAmi";

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
    const {keyword,onChangeKeyword} =props;
    const ref = useRef<HTMLInputElement>(null)

    function gotoSearch() {
        navigate('/search')
    }

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
                       onChange={(e) => {
                           navigate('/search');
                           props.onChangeKeyword(e.target.value)
                       }}
                       className={`input input-xs input-bordered w-44  ${isSearchPath ? '' : ''}`}/>
                {
                    keyword && <CloseSvg onClick={()=>{onChangeKeyword('');ref.current?.focus()}} className={'absolute right-5 fill-current text-neutral'} />
                }
            </div>
            <a href={`${whoAmi?.origin}/pagenote.html`} target={'_blank'}
               data-tip={'前往管理页'} className={`link absolute right-5 top-1 tooltip tooltip-left flex`}>
                <HomeSvg className={'fill-current text-secondary hover:text-primary'} width={24} height={24}/>
            </a>
        </div>
    )
}
