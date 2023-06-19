import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import { OssCloudConfig } from '../utils/upload'

interface OssConfig {
  key: OssCloudConfig
  cloud_space: string
}

export function fetchUploadToken() {
  return extApi.network
    .pagenote(
      {
        url: '/api/graph/profile',
        method: 'GET',
        data: {
          query: `query{ossKey(spaceType:"public"){AccessKeyId,AccessKeySecret,SecurityToken,CloudSpace,bucket,region}}`,
        },
      },
      {
        cacheControl: {
          maxAgeMillisecond: 60 * 1000 * 10,
        },
      }
    )
    .then(function (res) {
      const data = res?.data?.json?.data?.ossKey
      if (!data) {
        return null
      }

      return {
        key: {
          region: data.region,
          accessKeyId: data.AccessKeyId,
          accessKeySecret: data.AccessKeySecret,
          stsToken: data.SecurityToken,
          bucket: data.bucket,
        },
        cloud_space: data.CloudSpace,
      }
    })
}

export default function useOssKey(): [OssConfig | undefined | null, boolean] {
  const { data, isLoading, mutate } = useSWR<OssConfig | null | undefined>(
    '/oss-key',
    fetchUploadToken
  )

  return [data, isLoading]
}
