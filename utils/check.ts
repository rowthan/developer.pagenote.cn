

export function checkIsBrowserBasicUrl(url?: string) {
    if(!url){
        return false
    }
    return /^(edge:|extension:|chrome:|about:|chrome-extension:)/.test(url || '')
}

export function checkIsLocalFile(url?: string) {
    if(!url){
        return false
    }
    return /file:/.test(url)
}


export function checkIsBrowserAppStore(platform: 'chrome'|'', url: string) {
    // https://addons.mozilla.org/zh-CN/developers/addons
    // return /https://chrome.google.com//
}
