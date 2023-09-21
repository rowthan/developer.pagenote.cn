import useSWR from 'swr'
import extApi from '@pagenote/shared/lib/pagenote-api'

export default function useOfflineHtml() {
    // TODO key 发生变化后， 缓存仍然存在，没有被销毁，有内存泄漏的问题
    // 没有共享的场景，不需要 swr
    const {data, isLoading, mutate} = useSWR(
        '/offline/',
        fetchInfo,
    )

    function fetchInfo() {
        return extApi.html.group({
            groupBy: 'relatedPageUrl',
            projection: {
                data: -1
            },
        }, {
            cacheControl: {
                maxAgeMillisecond: 10 * 1000
            }
        }).then(function (res) {
            return res.data;
        })
    }

    return [data]
}
