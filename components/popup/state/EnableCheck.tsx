import {NavLink} from "react-router-dom";
import extApi from "@pagenote/shared/lib/generateApi";
import useCurrentTab from "hooks/useCurrentTab";
import {checkIsBrowserBasicUrl, checkIsLocalFile} from "utils/check";
import {enablePagenote, refreshTab} from "utils/popup";
import WarnSvg from 'assets/svg/warn.svg'
import useTabPagenoteState from "../../../hooks/useTabPagenoteState";
import CaptureSvg from 'assets/svg/jietu.svg'
import UnlockCopySvg from 'assets/svg/wenjianfuzhi.svg'
import Tab = chrome.tabs.Tab;
import IconButton from "../../IconButton";
import {toast} from "../../../utils/toast";


export default function EnableCheck() {
    const [tabState, mutate, isLoading] = useTabPagenoteState()
    const {tab} = useCurrentTab();

    function enableInject() {
        enablePagenote(tab?.id).then(function () {
            setTimeout(function () {
                mutate();
            }, 500)
            toast('已成功开启')
        })
    }

    function capture() {
    }


    function enableCopy() {
        extApi.commonAction.injectCodeToPage({
            scripts: ['/lib/enable_copy.js'],
            tabId: tab?.id,
            css: [],
            allFrames: false
        }).then(function (res) {
            mutate()
        })
    }


    if (isLoading) {
        return null;
    }

    if (!tabState) {
        return <Waring tab={tab}/>
    }

    return (
        <div className={'my-48'}>
            <div className={'relative text-center'}>
                <button disabled={tabState?.active} onClick={enableInject}
                        className={`z-50 relative btn btn-xl transition duration-500 ease-in-out`}>
                    <img src={tab?.favIconUrl} width={24} height={24} alt=""/>
                    <span className={'ml-2'}>
                        {tabState?.active ? '已经启动，开始标记吧' : '点击启动'}
                    </span>
                </button>

                <div
                    className={`transform-gpu -translate-y-full transition duration-500 ease-in-out ${tabState?.active ? '-translate-y-0' : ''}`}>
                    <span className={'tooltip tooltip-left'}
                          data-tip={tabState.enabledCopy ? '已解除复制限制' : '解除网页复制限制'}>
                        <IconButton className={'m-1'} onClick={enableCopy} disabled={tabState?.enabledCopy}>
                            <UnlockCopySvg/>
                        </IconButton>
                    </span>

                    {/*<div className={'tooltip tooltip-right'} data-tip={'截图'}>*/}
                    {/*    <IconButton onClick={capture}>*/}
                    {/*        <CaptureSvg/>*/}
                    {/*    </IconButton>*/}
                    {/*</div>*/}
                </div>
            </div>
            {/*<SettingTip/>*/}
        </div>
    )
}


function Waring(props: { tab?: Tab }) {
    const {tab} = props;
    const isHtmlFile = checkIsLocalFile(tab?.url)
    const isBrowserUrl = checkIsBrowserBasicUrl(tab?.url);
    return (
        <div className="alert alert-warning shadow-lg my-4">
            <div>
                <WarnSvg className="text-warning fill-current flex-shrink-0 h-6 w-6"/>
                <div>
                    <div className={'text-lg'}>
                        无法联通PAGENOTE
                    </div>

                    {
                        isHtmlFile ?
                            <div className={'text-sm'}>
                                请授权
                                <a href="https://page-note.notion.site/ce1300d2471b4391946bd1a7c281758f#1a1a1746bae74d6b8f21f9d8b5a77434"
                                   className={'link'}
                                   target={'_blank'}>
                                    「允许访问文件网址」
                                </a>后刷新重新尝试。
                            </div> :
                            <div className={'text-sm'}>
                                {
                                    isBrowserUrl ?
                                        <div className={'text-red-500'}>
                                            浏览器插件无法在此类页面上使用：
                                            <div>
                                                {tab?.url}
                                            </div>
                                        </div> :
                                        <div>
                                            <a className='link' onClick={() => {
                                                refreshTab(tab)
                                            }}>请刷新页面</a> 后重试
                                        </div>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

function SettingTip() {
    return (
        <div className={'p-2 text-xs text-gray-400 text-center'}>
            已设置
            <span className={'tooltip tooltip-top'}
                  data-tip={'在打开的网页内默认不启动，需要「点击启动」PAGENOTE，才会开始工作'}>
                <NavLink to="/setting"
                         className={'badge badge-primary badge-outline badge-xs'}>
                    根据需要
                </NavLink>
            </span>启用
        </div>
    )
}
