var preCacheName = 'pre_cache'
var commonCacheName = 'common_cache'
var preCacheFiles = ['/']

var cacheRules = {
  whiteList: [],
  blockList: ['localhost', '127.0.0.1'],
}
var util = {
  checkIsDocument: function (request) {
    return request.destination === 'document'
  },
  getCacheKey: function (request) {
    if (request.destination) {
      return request.destination
    }
    return commonCacheName
  },
  fetchAndCache: function (request) {
    return fetch(request).then((response) => {
      // 跨域的资源直接return
      if (!response || response.status !== 200) {
        console.log(response, 'not 200', request.url, response.status)
        return response
      }
      util.putCache(request, response.clone())
      return response
    })
  },
  putCache: function (request, resource) {
    caches.open(util.getCacheKey(request)).then((cache) => {
      cache.put(request, resource)
    })
  },
  checkAllowCache: function (request) {
    try {
      if (request.method !== 'GET') {
        return false
      }

      /**黑名单，不实用缓存*/
      var blockList = caches.blockList || []
      for (let i in blockList) {
        try {
          var regex = new RegExp(blockList[i])
          if (regex.test(request.url)) {
            return false
          }
        } catch (e) {}
      }

      /**静态资源，可安全使用缓存*/
      var isStatic = /\.(js|css|png|jpg|svg|woff)/.test(request.url)
      var isDoucment = util.checkIsDocument(request)
      if (isStatic || isDoucment) {
        return true
      }

      /**白名单，可缓存*/
      for (let i in cacheRules.whiteList) {
        try {
          var whiteRegex = new RegExp(cacheRules.whiteList[i])
          if (whiteRegex.test(request.url)) {
            return true
          }
        } catch (e) {}
      }

      return false
    } catch (e) {
      console.error('check error', e)
      return false
    }
  },
}

/**
 * 1. 监听install事件，安装完成后，进行文件缓存
 * **/
self.addEventListener('install', function (e) {
  console.log('Service Worker install')
  // 加载新缓存
  var cacheOpenPromise = caches.open(preCacheName).then(function (cache) {
    return cache.addAll(preCacheFiles)
  })
  e.waitUntil(cacheOpenPromise)

  self.skipWaiting()
})

/**
 * 2. 当前版本sw.js 激活后，通过cache的key来判断是否更新cache中的静态资源
 * */
self.addEventListener('activate', function (e) {
  console.log('Service Worker 状态： activate')
  // 清空上一个版本的旧缓存
  var cachePromise = caches.keys().then(function (keys) {
    var deleteKey = keys.filter(function (key) {
      return ['document'].includes(key)
    })
    return Promise.all(
        deleteKey.map(function (key) {
          console.log('remove cache：', key)
          return caches.delete(key)
        })
    )
  })


  e.waitUntil(cachePromise)
  /**
   * 注意不能忽略这行代码，否则第一次加载会导致fetch事件不触发。
   * 接管上一个 sw.js，正式激活本worker
   * */
  return self.clients.claim()
})

/**
 * 3. 代理网络请求
 * **/
self.addEventListener('fetch', function (e) {
  e.respondWith(
      caches
          .match(e.request)
          .then(function (response) {
            const allowCache = util.checkAllowCache(e.request)
            if (allowCache) {
              // todo 优化，对于 hash 资源，也不需要重新拉取
              var needCache = !response || util.checkIsDocument(e.request);
              if (needCache) {
                util.fetchAndCache(e.request)
              }
              if (response) {
                return response
              }
            }
            return fetch(e.request)
          })
          .catch(function (err) {
            console.error('sw fetch', err)
            return fetch(e.request)
          })
  )
})

/**
 * 与主线程的通信协议
 * */
self.addEventListener('message', function (e) {
  switch (e.data.type) {
    case 'clean_cache':
      self.caches.delete(preCacheName)
      self.caches.delete(commonCacheName)
      break
    case 'add_cache':
      if (e.data.values.length) {
        caches.open(preCacheName).then(function (cache) {
          return cache.addAll(e.data.values)
        })
      }
      break
    default:
      console.warn('not support ', e.data)
  }
})
