import Tab = chrome.tabs.Tab;
import extApi from "@pagenote/shared/lib/generateApi";

export function refreshTab(tab?:Tab) {
    if (tab?.id) {
        if(chrome?.tabs){
            chrome?.tabs?.reload(tab?.id, {}, function () {
                window.location.reload();
            })
        }else{
            extApi.developer.chrome({
                namespace: 'tabs',
                type: 'reload',
                params: tab?.id,
            }).then(function () {
                window.location.reload();
            })
        }
    }
}

export function focus(tab: Tab) {
    if(chrome && chrome.tabs && tab.id){
        chrome.tabs.update({

        })

        chrome.windows.update(tab.windowId,{
            focused: true
        })

        chrome.tabs.highlight({
            tabs: [tab.index],
            windowId: tab.windowId
        })
    }else{
        extApi.developer.chrome({
            namespace:'windows',
            type: 'update',
            params:[
                tab.windowId,
                {
                    focused: true
                }
            ]
        })

        extApi.developer.chrome({
            namespace: "tabs",
            params: {
                tabs: [tab.index],
                windowId: tab.windowId
            },
            type: "highlight"
        }).then(function (res) {
            console.log(res,'higlight')
        })
    }
}

export function fetchStatus(tabId?: number) {
    // @ts-ignore
    return extApi.developer.requestFront({
        type: 'fetchStatus',
        params: undefined,
        // @ts-ignore
        header:{
            targetTabId: tabId,
            timeout: 2000,
        }
    }).then(function (res) {
        return res.data
    })
}

export function enablePagenote(tabId?: number) {
    return extApi.developer.requestFront({
        type: 'togglePagenote',
        params: undefined,
        // @ts-ignore
        header:{
            targetTabId: tabId
        }
    })
}
