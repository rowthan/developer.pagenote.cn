import extApi from '@pagenote/shared/lib/pagenote-api'
import {network} from '@pagenote/shared/lib/extApi'
import FetchRequest = network.FetchRequest
import {SERVER_API_HOST} from 'site.config.js'
import {BaseMessageHeader, RESPONSE_STATUS_CODE} from '@pagenote/shared/lib/communication/base'

let byExtFlag: boolean | null = null;

async function checkExtAlive() {
  const result = await extApi.user.getWhoAmI();
  byExtFlag = !!result?.data?.version;
}

export async function unionFetch<T>(
    request: FetchRequest,
    header?: Partial<BaseMessageHeader>,
    retry?: boolean
): Promise<{ success?: boolean; data?: T; status?: number; errors?: { message: string }[], error?: string }> {
  request.url = /^http/.test(request.url)
      ? request.url
      : SERVER_API_HOST + request.url

  if (byExtFlag === null) {
    await checkExtAlive()
  }
  if (byExtFlag) {
    return extApi.network.pagenote(request, header).then(function (res) {
      // 代理超时，重新请求
      if (res.status === RESPONSE_STATUS_CODE.TIMEOUT) {
        console.log('timeout retry')
        checkExtAlive()
        if (!retry) {
          return unionFetch(request, header, true)
        }
      }
      return res?.data?.json
    })
  } else {
    if (request.method === 'POST') {
      request.body = JSON.stringify(request.data)
    } else {
      const search = new URLSearchParams(request.data)
      request.url += '?' + search.toString()
    }

    return fetch(request.url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...request,
    }).then(async function (res) {
      checkExtAlive()
      return await res.json()
    })
  }
}
