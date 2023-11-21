/**当前worker的版本，用于标识区分不通版本的 cache 和 worker*/
var currentKey = '0.28.0';
var preCacheName = 'pre_cache_' + currentKey
var runtimeCacheName = 'runtime_cache_' + currentKey
var preCacheFiles = [
    '/',
    '/signin',
    '/pro-plan',
    '/release',
    '/gift',
    '/account',
]


var cacheRules = {
  whiteList: [
    // '/api/graph/profile'
  ],
  blockList: ['_next/'],
}
var util = {
    fetchAndCache: function (request) {
        return fetch(request).then(response => {
            // 跨域的资源直接return
            if (!response || response.status !== 200) {
                return response;
            }
            util.putCache(request, response.clone());
            return response;
        });
    },
    putCache: function (request, resource) {
        caches.open(runtimeCacheName).then(cache => {
            cache.put(request, resource);
        });
    },
    checkAllowCache: function (request) {
        try {
            if (request.method !== 'GET') {
                return false
            }

            /**黑名单，不实用缓存*/
            for (let i in cacheRules.blockList) {
                try {
                    var regex = new RegExp(cacheRules.blockList[i])
                    if (regex.test(request.url)) {
                        return false
                    }
                } catch (e) {
                }
            }

            /**静态资源，可安全使用缓存*/
            var isStatic = /(js|css|png|jpg|svg)$/.test(request.url)
            var isDoucment = request.destination === 'document'
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
                } catch (e) {
                }
            }

            return false
        } catch (e) {
            console.error('check error', e)
            return false
        }
    }
};

/**
 * 1. 监听install事件，安装完成后，进行文件缓存
 * **/
self.addEventListener('install', function (e) {
    console.log('Service Worker install');
    // 加载新缓存
    var cacheOpenPromise = caches.open(preCacheName).then(function (cache) {
        return cache.addAll(preCacheFiles);
    });
    e.waitUntil(cacheOpenPromise);

    self.skipWaiting();
});

/**
 * 2. 当前版本sw.js 激活后，通过cache的key来判断是否更新cache中的静态资源
 * */
self.addEventListener('activate', function (e) {
    console.log('Service Worker 状态： activate');
    // 清空旧缓存
    var cachePromise = caches.keys().then(function (keys) {
        var deleteKey = keys.filter(function(item){
            return ![preCacheName,runtimeCacheName].includes(item);
        })

        return Promise.all(deleteKey.map(function (key) {
            return caches.delete(key);
        }));
    });
    e.waitUntil(cachePromise);
    /**
     * 注意不能忽略这行代码，否则第一次加载会导致fetch事件不触发。
     * 接管上一个 sw.js，正式激活本worker
     * */
    return self.clients.claim();
});


/**
 * 3. 代理网络请求
 * **/
self.addEventListener('fetch', function (e) {
    e.respondWith(
      caches.match(e.request).then(function (response) {
          const request = e.request.clone();
          const allowCache = util.checkAllowCache(e.request);
          if(!allowCache){
              return fetch(e.request);
          }else{
              if(response){
                  return response;
              }
              return util.fetchAndCache(request);
          }
      }).catch(function (err) {
          console.error('sw fetch',err);
          return fetch(e.request);
      })
    );
});

/**
 * 与主线程的通信协议
 * */
self.addEventListener('message', function (e) {
  switch (e.data.type) {
    case 'clean_cache':
      self.caches.delete(preCacheName)
      self.caches.delete(runtimeCacheName)
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
