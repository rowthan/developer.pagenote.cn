import fs from 'fs'

export function writeCacheFile(id: string, content: Object) {
  const filePath = `.cache/${id}.json`
  if (process.env.NODE_ENV === 'development') {
    fs.writeFile(
      filePath,
      JSON.stringify(content),
      {
        encoding: 'utf8',
      },
      function (res) {
        console.log('cached success')
      }
    )
  }
}

/**
 * isFallback： 不启用缓存的情况下，notion 相应失败的兜底处理
 * */
export function getCacheContent(id: string, isFallback = false) {
  if (isFallback) {
    console.warn('notion 服务异常')
  }

  const cacheFileName = `.cache/${id}.json`
  if (
      (process.env.ENABLE_CACHE || isFallback) &&
      fs.existsSync(cacheFileName)
  ) {
    const cacheData = fs.readFileSync(cacheFileName, {
      encoding: 'utf-8',
    })
    if (cacheData) {
      console.log('response with cache:', cacheFileName)
      return cacheData ? JSON.parse(cacheData) : null
    }
  }
}
