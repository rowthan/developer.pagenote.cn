import Tab = chrome.tabs.Tab
import extApi from '@pagenote/shared/lib/pagenote-api'

export function refreshTab(tab?: Tab) {
  function callback() {
    setTimeout(function () {
      window.location.reload()
    }, 1000)
  }
  if (tab?.id) {
    if (chrome?.tabs) {
      chrome?.tabs?.reload(tab?.id, {}, callback)
    } else {
      extApi.developer
        .chrome({
          namespace: 'tabs',
          type: 'reload',
          args: [tab?.id],
        })
        .then(function () {
          callback()
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
            args:[
                tab.windowId,
                {
                    focused: true
                }
            ]
        })

        extApi.developer.chrome({
            namespace: "tabs",
            args: [
                {
                    tabs: [tab.index],
                    windowId: tab.windowId
                }
            ],
            type: "highlight"
        }).then(function (res) {
            console.log(res,'higlight')
        })
    }
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

export function captureVisibleAsImage() {
    chrome.tabs.captureVisibleTab({format:'jpeg',quality:40}, function(screenshotUrl) {
        extApi.developer.requestFront({
            // @ts-ignore
            header: {

            },
            params: {
                imageStr: screenshotUrl,
                isAuto: false,
            },
            type: 'onCaptureView'
        })
    });
}
