

export function checkIsBrowserBasicUrl(url?: string) {
    if(!url){
        return false
    }
    return /^(edge:|extension:|chrome:|about:|chrome-extension:|moz-extension:|edge-extension:)/.test(url || '')
}

export function checkIsLocalFile(url?: string) {
    if(!url){
        return false
    }
    return /file:/.test(url)
}

export function checkIsInPopup() {
    return window.innerWidth < 800 || window.innerHeight < 600
}

export function checkIsBrowserAppStore(platform: 'chrome'|'', url: string) {
    // https://addons.mozilla.org/zh-CN/developers/addons
    // return /https://chrome.google.com//
}
