

export function checkIsBrowserBasicUrl(url?: string) {
    if(!url){
        return false
    }
    return /(edge:|extension:|chrome:|about:)\/\//.test(url || '')
}

export function checkIsLocalFile(url?: string) {
    if(!url){
        return false
    }
    return /file:/.test(url)
}
