import fs from "fs";


export function writeCacheFile(filePath: string, content: string) {
    if (process.env.NODE_ENV === 'development') {
        fs.writeFile(
            filePath,
            content,
            {
                encoding: 'utf8',
            },
            function (res) {
                console.log('cached success')
            }
        )
    }
}

export function getCacheContent(cacheFileName: string) {
    if (process.env.ENABLE_CACHE && fs.existsSync(cacheFileName)) {
        const cacheData = fs.readFileSync(cacheFileName, {
            encoding: 'utf-8',
        })
        if (cacheData) {
            console.log('response with cache:', cacheFileName)
            return cacheData
        }
    }
}
