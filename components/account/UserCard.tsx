import useUserInfo from '../../hooks/useUserInfo'
import FreeSvg from 'assets/svg/free.svg'
import VipSvg from 'assets/svg/vip.svg'
import dayjs from 'dayjs'
import useBooks from '../../hooks/useBooks'
import BookDetail from './BookDetail'
import React, { useState } from 'react'
import Modal from '../Modal'
import UserInfoForm from './UserInfoForm'
import Avatar from './Avatar'
import { isExt } from '../../const/env'
import Nickname from './Nickname'
import classNames from 'classnames'
import useWhoAmi from '../../hooks/useWhoAmi'

interface Props {
  editable: boolean
  onClick?: () => void
}

export default function UserCard(props: Props) {
    const { editable, onClick } = props
  const [data, mutate, setToken] = useUserInfo()
  const [bookInfo] = useBooks()
  const [whoAmI] = useWhoAmi()
  const [openProfileModal, setProfileModal] = useState(false)
  const editable = props.editable && data?.profile.uid

  const endAt = bookInfo.expiredAt
  const endDay = endAt ? dayjs(endAt).format('YYYY-MM-DD') : ''
  return (
    <div
      className={classNames(
        ' rounded-lg p-2  min-w-80 w-full border text-card-foreground bg-[#63b3ed]',
        {
          'cursor-pointer': !editable,
        }
      )}
    >
      <div className={'flex justify-between'}>
        <div className={'flex items-center'}>
          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-white ring ring-white ring-offset-base-100 ring-offset">
              {editable ? (
                <Avatar />
              ) : (
                <a target="_blank" href="https://pagenote.cn/account">
                  <img
                    src={
                      data?.profile?.avatar || 'https://pagenote.cn/favicon.ico'
                    }
                    alt={data?.profile?.nickname || '请登录'}
                  />
                </a>
              )}
            </div>
          </div>
          <div className={'ml-4'}>
            {data?.profile?.nickname ? (
              <>
                <Nickname nickname={data?.profile?.nickname} />
              </>
            ) : (
              <div
                className={
                  ' whitespace-nowrap max-w-[240px] overflow-ellipsis overflow-hidden'
                }
              >
                <a
                  target={isExt ? '_blank' : '_self'}
                  href="https://pagenote.cn/signin"
                  className={'btn btn-ghost btn-sm '}
                >
                  {whoAmI?.did}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className={'text-right'}>
          <a
            className={'tooltip tooltip-left'}
            data-tip={data?.profile?.role ? 'VIP' : '尚未解锁所有功能'}
            href="https://pagenote.cn/pro-plan"
            target={'_blank'}
          >
            {data?.profile?.role ? (
              <VipSvg width={24} height={24} />
            ) : (
              <FreeSvg width={24} height={24} />
            )}
          </a>

          {endDay && (
            <BookDetail>
              <a
                className={'text-xs tooltip block tooltip-left link'}
                data-tip={`点击查看详情`}
              >
                {bookInfo.expiredTip}
              </a>
            </BookDetail>
          )}
        </div>
      </div>
      <Modal
        open={openProfileModal}
        toggleOpen={(open) => {
          setProfileModal(open)
          mutate()
        }}
      >
        <UserInfoForm />
      </Modal>
    </div>
  )
}
