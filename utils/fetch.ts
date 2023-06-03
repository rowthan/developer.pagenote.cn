import extApi from '@pagenote/shared/lib/pagenote-api'
import { network } from '@pagenote/shared/lib/extApi'
import FetchRequest = network.FetchRequest
import { SERVER_API_HOST } from 'site.config.js'
import { BaseMessageHeader } from '@pagenote/shared/lib/communication/base'

export function unionFetch<T>(
  request: FetchRequest,
  passExtension: boolean,
  header?: Partial<BaseMessageHeader>
): Promise<{ success?: boolean; data?: T; status?: number; errors?: {message: string}[],error?: string }> {
  request.url = /^http/.test(request.url)
    ? request.url
    : SERVER_API_HOST + request.url

  if (passExtension) {
    return extApi.network.pagenote(request, header).then(function (res) {
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
      return await res.json()
    })
  }
}
