import useSWR from 'swr'
import { fetchGiftItem, GiftDetail, receiveGiftItem } from '../service/gift'
import useVersionValid from './useVersionValid'

export function fetchData(id: string, byExt: boolean) {
  return fetchGiftItem(id, byExt).then(function (res) {
    return res?.data?.gift || null
  })
}

export default function useGiftDetail(id: string) {
  const { valid } = useVersionValid('0.26.4')
  const data = useSWR<GiftDetail | null>(
    '/gift/' + id,
    () => {
      if (!id) {
        return Promise.resolve(null)
      }
      return fetchData(id, valid)
    },
    {
      fallbackData: null,
    }
  )

  function receiveGift(userInfo: { email?: string }) {
    return receiveGiftItem(
      {
        giftId: id,
        email: userInfo.email || '',
      },
      valid
    ).then(function (res) {
      // @ts-ignore
      data.mutate({
        ...(data.data || {}),
        received: res?.data?.gotGift?.received === true,
      })
      return res
    })
  }

  return {
    ...data,
    receiveGift: receiveGift,
  }
}
