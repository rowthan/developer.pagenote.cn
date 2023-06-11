import { useState, type ReactNode, FormEvent } from 'react'
import { useRouter } from 'next/router'
import useGiftDetail from '../hooks/useGiftDetail'
import CardSvg from 'assets/svg/card.svg'
import useUserInfo from '../hooks/useUserInfo'
import { toast } from '../utils/toast'
import { getFormData } from 'utils/form'
import dayjs from 'dayjs'

interface Props {
  children?: ReactNode
}

enum ReceiveStatus {
  ing = 1,
  unset = 0,
}

type UserForm = { uid?: number; email?: string }
export default function Gift(props: Props) {
  const router = useRouter()
  const giftId = router.query.giftId?.toString()
  const {
    data: gift,
    isLoading,
    receiveGift,
    mutate,
  } = useGiftDetail(giftId || '')
  const [user] = useUserInfo()
  const [status, setStatus] = useState<ReceiveStatus>(ReceiveStatus.unset)
  const uid = user?.profile?.uid

  function submit(e: FormEvent<HTMLFormElement>) {
    e.stopPropagation()
    e.preventDefault()
    const value = getFormData<UserForm>(e.target as HTMLFormElement)
    setStatus(ReceiveStatus.ing)
    receiveGift(value)
      .then(function (res) {
        if (res?.success && res?.data?.gotGift?.received) {
          toast('领取成功🏅️')
        } else {
          toast(res?.error || '领取失败')
        }
      })
      .finally(function () {
        setStatus(ReceiveStatus.unset)
      })
  }

  const title = isLoading
    ? '正在拉取福利信息'
    : (gift ? gift.giftName : '') || '没有找到福利信息'
  const available = !isLoading && !!gift?.giftName && !gift.received
  const bg =
    gift?.image ||
    'https://pagenote-public.oss-cn-beijing.aliyuncs.com/_static/abstract-gift-card-1.png'
  let label = '领取'
  if (gift?.expiredAt) {
    if (dayjs(new Date(gift.expiredAt)).isBefore(new Date())) {
      label = '福利已过期，下次早点来'
    }
  }
  if (gift?.received) {
    label = '已领取'
  }
  console.log(gift, 'gift')
  return (
    <div>
      <div className={'mt-10'}>
        <div className="mx-auto max-w-lg p-10" style={{ minWidth: '300px' }}>
          <div className="w-full overflow-hidden rounded-xl relative transform transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item">
            <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
            <div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6">
              <div className="poster__info align-self-end w-full">
                <div className="h-32"></div>
                <div className="space-y-6 detail_info">
                  <div className="flex flex-col space-y-2 inner">
                    <a className="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white  rounded-full">
                      <CardSvg />
                      <div className="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2">
                        <div className={'whitespace-nowrap'}>福利卡片</div>
                      </div>
                    </a>
                    <h3
                      className="text-2xl font-bold text-white"
                      data-unsp-sanitized="clean"
                    >
                      {title}
                    </h3>
                    <div
                      className="mb-0 text-lg text-gray-400"
                      dangerouslySetInnerHTML={{
                        __html: gift?.description || '-',
                      }}
                    ></div>
                  </div>
                  <div className={`flex flex-row justify-between relative`}>
                    <div className="flex flex-col datos_col">
                      <div className="popularity">{gift?.bookDays}日VIP</div>
                      <div className="text-sm text-gray-400">赞助者加倍</div>
                    </div>
                    {/*<div className="flex flex-col datos_col">*/}
                    {/*  <div className="release">*/}
                    {/*    {(gift?.bookDays || 0) * (gift?.paidRate || 1)}日VIP*/}
                    {/*  </div>*/}
                    {/*  <div className="text-sm text-gray-400">*/}
                    {/*    <key-word>赞助者</key-word>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    {/*<div className="flex flex-col datos_col">*/}
                    {/*  <div className="release">{gift?.bookDays}积分</div>*/}
                    {/*  <div className="text-sm text-gray-400">*/}
                    {/*    <key-word>终身用户</key-word>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                  </div>
                  <div className="flex flex-col overview">
                    <div className="flex flex-col"></div>
                    <div className="text-xs text-gray-400 mb-2">领取要求:</div>
                    <p className="text-xs text-gray-100 mb-6">
                      {gift?.qualificationDes || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="absolute inset-0 transform w-full"
              src={bg}
              alt={gift?.giftName}
            />
            <form
              onSubmit={submit}
              className="flex flex-col justify-center m-auto relative pb-10 space-x-4 z-10 lg:flex-row w-4/5"
            >
              <div className={'contents'}>
                <input
                  type="text"
                  readOnly
                  className="hidden"
                  name="giftId"
                  defaultValue={giftId}
                />
                <input
                  type="text"
                  readOnly
                  className="hidden"
                  name="uid"
                  defaultValue={uid}
                />
              </div>

              {!uid && (
                <input
                  type="email"
                  autoFocus
                  required
                  name="email"
                  className="p-2 mb-1 rounded-xl border m-auto"
                  placeholder="福利接收邮箱地址"
                />
              )}
              <button
                disabled={!available}
                type={'submit'}
                className={`flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 btn ${
                  status === ReceiveStatus.ing ? 'loading' : ''
                }`}
              >
                <div className="text-sm text-white ml-2 ">{label}</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
