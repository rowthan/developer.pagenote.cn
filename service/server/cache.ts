import fs from "fs";


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

export function getCacheContent(id: string) {
  const cacheFileName = `.cache/${id}.json`
  if (process.env.ENABLE_CACHE && fs.existsSync(cacheFileName)) {
    const cacheData = fs.readFileSync(cacheFileName, {
      encoding: 'utf-8',
    })
    if (cacheData) {
      console.log('response with cache:', cacheFileName)
      return cacheData ? JSON.parse(cacheData) : null
    }
  }
}
