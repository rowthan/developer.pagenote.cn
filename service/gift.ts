import { unionFetch } from '../utils/fetch'
import { keys } from 'lodash'

type ReceiveGiftRequest = { email?: string; giftId: string }
export const receiveGiftItem = function (
  info: ReceiveGiftRequest,
  byExt: boolean
) {
  return unionFetch<{ gotGift: { received: boolean } }>(
    {
      url: '/api/graph/book',
      method: 'POST',
      data: {
        mutation: `mutation{gotGift(giftId:"${info.giftId}",email:"${info.email}"){received}}`,
      },
    },
    byExt
  )
}

const demoGiftDetail = {
  giftId: '',
  giftName: '',
  description: '',
  qualificationDes: '',
  image: '',
  expiredAt: new Date(),
  paidRate: 1,
  limit: 9,
  bookDays: 1,
  received: false,
}
export type GiftDetail = typeof demoGiftDetail

export const fetchGiftItem = function (
  giftId: ReceiveGiftRequest['giftId'],
  byExt: boolean
) {
  return unionFetch<{ gift: GiftDetail }>(
    {
      url: '/api/graph/book',
      method: 'GET',
      data: {
        query: `{gift(giftId:"${giftId}"){${keys(demoGiftDetail).toString()}}}`,
      },
    },
    byExt,
    {
      cacheControl: {
        maxAgeMillisecond: 10 * 1000,
      },
    }
  )
}
