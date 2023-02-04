import {PropsWithChildren, ReactComponentElement, useState} from "react";
import Head from "next/head";
// import {useTheme} from "next-themes";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import QuestionSvg from 'assets/svg/question.svg'
import HelpSvg from 'assets/svg/bangzhu.svg'
import RateSvg from 'assets/svg/pingfen.svg'
import SettingSvg from 'assets/svg/setting.svg'
import ShortCutInfo from "../components/ShortCutInfo";
import useWhoAmi from "../hooks/useWhoAmi";
import {useRouter} from "next/router";


// 给普通用户访问的页面，基础layout
export default function BasicLayout(props: PropsWithChildren<{ nav?: boolean, footer?: boolean, title?: string, description?: string, full?: boolean }>) {
    // const { resolvedTheme, setTheme } = useTheme();
    const [whoAmi] = useWhoAmi();
    const {pathname} = useRouter();

    const asideList: {label: string,link: string,icon: ReactComponentElement<any>,target?: "_self"|"_blank"}[] = [
        {
            label: '帮助',
            link: 'https://developer.pagenote.cn/question',
            icon: <HelpSvg className={'fill-current inline'}/>,
        }
    ]
    if(!['/ext/popup'].includes(pathname)){
        asideList.push({
            label: '设置',
            link: '#/setting',
            icon: <SettingSvg className={'fill-current inline'}/>,
            target: '_self'
        },)
    }
    if(!whoAmi?.isTest){
        asideList.push({
            label: '评分',
            link: 'https://pagenote.cn/rate',
            icon: <RateSvg className={'fill-current inline'}/>
        })
    }

    const {children, nav = true, footer = true, full = false, ...customMeta} = props;

    const meta = {
        title: customMeta.title || '小而美的网页标记工具 PAGENOTE',
        description: customMeta.description || `一页一记 pagenote，开发者中心.`,
        type: 'website',
    };

    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index"/>
                <meta content={meta.description} name="description"/>
                <meta property="og:type" content={meta.type}/>
                <meta property="og:site_name" content="PAGENOTE"/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:title" content={meta.title}/>
                <link rel="shortcut icon" href="https://pagenote.cn/favicon.ico" type="image/x-icon"/>
            </Head>
            {
                nav &&
                <nav>
                    <Breadcrumbs/>
                </nav>
            }
            <main className='mx-auto relative min-h-fill'>
                {children}
            </main>

            <aside className={'fixed right-4 bottom-6 pb-2'}>
                <div className="dropdown dropdown-top dropdown-end">
                    <label tabIndex={0}>
                        <button className={'rounded-full bg-neutral text-neutral-content'}>
                            <QuestionSvg className={'fill-current'} width={20} height={20}/>
                        </button>
                    </label>
                    <ul tabIndex={0}
                        className="dropdown-content w-32 rounded right-4 mb-2 py-2 overflow-hidden bottom-full bg-neutral text-base-100 text-sm">
                        {asideList.map((item, index) => (
                            <li key={index} className={'hover:bg-accent py-1 px-4'}>
                                <a className={' flex items-center w-full text-base-100'} href={item.link}
                                   target={item.target||'_blank'}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                        <li className={'hover:bg-accent py-1 px-4'}>
                            <label htmlFor="my-modal-4">
                                <a className={' flex items-center w-full text-base-100'}>
                                    <RateSvg className={'fill-current inline'}/>
                                    <span>快捷键</span>
                                </a>
                            </label>
                        </li>

                    </ul>
                </div>
            </aside>
            {
                footer && <Footer/>
            }


            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <ShortCutInfo/>
                </label>
            </label>
        </div>
    )
}
