import {useEffect, useState} from "react";
import extApi, {defaultWrapper} from "@pagenote/shared/lib/generateApi";
import useSettings from "../../hooks/useSettings";
import {Step, WebPage} from "@pagenote/shared/lib/@types/data";


interface TabInfo {
    connected: boolean,
    active: boolean

}

enum ButtonState {
    unset = 1,
    loading = 2,
    fail = 3,
    success = 4
}

export default function CurrentTab() {
    const [setting] = useSettings();
    const [loading, setLoading] = useState(false);
    const [lights,setLights] = useState<Partial<Step>[]>([])
    const [buttonState, setButtonState] = useState<Record<string, ButtonState>>({
        enableCopy: ButtonState.unset,
    })
    const [tabState, setTabState] = useState<TabInfo>({
        connected: false,
        active: false,
    });

    const [tab, setTab] = useState<chrome.tabs.Tab | null>(null)

    function fetchStatus() {
        extApi.commonAction.getCurrentTab().then(function (res) {
            if (res.success) {
                setTab(res.data)
            }
        })

        extApi.developer.requestFront({
            api: 'fetchStatus',
            data: undefined
        }).then(function (res) {
            console.log(res, 'fetchStatus')
            if (res.success) {
                setTabState(res.data)
            }
        })
    }

    function refreshTab() {
        if (tab?.id) {
            chrome?.tabs?.reload(tab?.id, {}, function () {
                window.location.reload();
            })
        }
    }

    function fetchWebpage() {
        if(!tab?.url){
            return
        }
        extApi.lightpage.queryLights({
            query:{
                url: tab?.url
            }
        }).then(function (res) {
            if(res.success){
                setLights(res.data.list)
            }
        })
    }

    function enableInject() {
        setLoading(true)

        extApi.developer.requestFront({
            api: 'togglePagenote',
            data: undefined
        }).then(function (res) {
            console.log(res, 'togglePagenote')
            setLoading(false)
            fetchStatus();
        })

        setTimeout(function () {
            fetchStatus();
        }, 1000)
    }

    function enableCopy() {
        setButtonState({
            ...buttonState,
            enableCopy: ButtonState.loading
        })
        extApi.commonAction.injectCodeToPage({
            scripts: ['/lib/enable_copy.js'],
            tabId: tab?.id,
            css: [],
            allFrames: false
        }).then(function (res) {
            setButtonState({
                ...buttonState,
                enableCopy: res.success ? ButtonState.success : ButtonState.fail
            })
        })
    }

    useEffect(function () {
        fetchWebpage()
    },[tab])

    useEffect(function () {
        fetchStatus();
        setTimeout(function () {
            fetchStatus()
        }, 2000)
    }, [])

    const isExtensionUrl = /(extension:|chrome:)\/\//.test(tab?.url || '');
    return (
        <div>
            {tabState.active ?
                <div>
                    <div className="badge badge-xs badge-success mr-1"></div>
                    <span>此标签页已启用。</span>
                    {
                        lights.length > 0 ? <span>已在此页面标记 <b> {lights.length}</b> 处;此网页将自动启用。</span> : <span>你可以开始标记了。</span>
                    }
                    <div className='text-xs text-gray-500'>
                    </div>
                    <div className="divider"></div>

                    <div>
                        <button onClick={enableCopy} disabled={buttonState.enableCopy === ButtonState.success}
                                className={`btn btn-sm rounded-full ${buttonState.enableCopy === ButtonState.loading ? 'loading' : ''}`}>
                            <span className={'tooltip tooltip-right'}
                                  data-tip={'若网页无法选区复制内容，点击后可解除限制'}>
                                {buttonState.enableCopy === ButtonState.success ? '已' : ""}解除网页复制限制
                            </span>
                        </button>
                    </div>
                </div> :
                <div>
                    {
                        tabState.connected ?
                            <div className={'my-40'}>
                                <div className='flex justify-center items-center'>
                                    <button disabled={tabState.active} onClick={enableInject}
                                            className={`btn btn-lg rounded-full ${loading ? 'loading' : ''}`}>
                                        {/*<div className="badge badge-xs badge-info mr-1"></div>*/}
                                        <img src={tab?.favIconUrl} width={24} height={24} alt=""/>
                                        <span className='ml-2'>
                                            点击启动
                                        </span>
                                    </button>
                                </div>
                                {
                                    setting.enableType === 'when-needed' &&
                                    <div className={'p-1 text-sm text-gray-400 text-center'}>
                                        你已设置「根据需要」启用，所以需要手动启用 PAGENOTE。
                                    </div>
                                }
                            </div> :
                            <div>
                                <div>
                                    {
                                        isExtensionUrl ?
                                            <div className={'text-red-500'}>
                                                * 浏览器插件无法在此类页面上使用：
                                                <div>
                                                    {tab?.url}
                                                </div>
                                            </div> :
                                            <div>
                                                * 无法联通PAGENOTE，请
                                                <a className='link' onClick={refreshTab}>刷新页面</a> 后重试。
                                            </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
            }
        </div>
    )
}
