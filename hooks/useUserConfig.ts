import { config } from '@pagenote/shared/lib/extApi'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import {
  configArrayToObject,
  objectToConfigArray,
} from '@pagenote/shared/lib/pagenote-config/utils'
import ConfigItem = config.ConfigItem
import { get } from 'lodash'

export default function useUserConfig<T extends ConfigItem>(
  rootKey: string = 'global'
): [T | null, (input: any) => void] {
  const { data = null, mutate } = useSWR<T | null>(
    '/user-config/' + rootKey,
    fetchUserConfig,
    {
      fallback: {},
    }
  )

  function fetchUserConfig() {
    return extApi.config
      .query({
        query: {
          rootKey: rootKey,
        },
      })
      .then(function (res) {
        if (res.success) {
          //@ts-ignore
          const object = configArrayToObject(res?.data?.list || [])
          console.log('object', object)
          return get(object, rootKey) as unknown as T
        }
        return null
      })
      .catch(function () {
        return null
      })
  }

  function update(input: Record<string, any>) {
    const data = {
      [rootKey]: input,
    }
    // @ts-ignore
    const objectArray = objectToConfigArray(data)
    // mutate({
    //   ...(data || {}),
    //   ...input,
    // })
    extApi.config.put(objectArray).then(function (res) {
      mutate()
    })
  }

  return [data, update]
}
