import useUserInfo, { fetchUserInfo } from '../../hooks/useUserInfo'
import MoreSvg from '../../assets/svg/more.svg'
import FreeSvg from 'assets/svg/free.svg'
import extApi from '@pagenote/shared/lib/pagenote-api'
import VipSvg from 'assets/svg/vip.svg'
import dayjs from 'dayjs'
import useBooks from '../../hooks/useBooks'
import BookDetail from './BookDetail'
import React, { useState } from 'react'
import Modal from '../Modal'
import UserInfoForm from './UserInfoForm'
import Avatar from './Avatar'

interface Props {
  editable: boolean
}

export default function UserCard(props: Props) {
  const { editable } = props
  const [data, mutate, setToken] = useUserInfo()
  const [bookInfo] = useBooks()
  const [openProfileModal, setProfileModal] = useState(false)

  function signout() {
    setToken(null)
  }

  const endAt = bookInfo.expiredAt
  const endDay = endAt ? dayjs(endAt).format('YYYY-MM-DD') : ''
  return (
    <div className={'shadow rounded-lg p-2 min-w-80 w-full bg-secondary'}>
      <div className={'flex justify-between'}>
        <div className={'flex items-center mb-4'}>
          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-white ring ring-white ring-offset-base-100 ring-offset">
              {editable ? (
                <Avatar />
              ) : (
                <a target="_blank" href="https://developer.pagenote.cn/account">
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
                <div className="dropdown dropdown-bottom dropdown-right	text-white">
                  <label tabIndex={0} className="my-1 link">
                    <span className={'font-bold'}>
                      {data?.profile?.nickname}
                    </span>
                    <MoreSvg
                      className={'inline fill-current dark:text-primary'}
                      width={20}
                      height={20}
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content py-2 shadow bg-neutral text-sm rounded w-20"
                  >
                    <li className={'hover:bg-accent px-1'}>
                      <button
                        className={'block w-full text-base-100'}
                        onClick={signout}
                      >
                        退出
                      </button>
                    </li>
                    <li className={'hover:bg-accent px-1'}>
                      <button
                        className={'block w-full text-base-100'}
                        onClick={() => {
                          setProfileModal(true)
                        }}
                      >
                        编辑资料
                      </button>
                    </li>
                  </ul>
                </div>
                <div className={'text-xs text-gray-100'}>
                  {data?.profile?.emailMask}
                </div>
              </>
            ) : (
              <div>
                <a
                  target={'_blank'}
                  href="https://pagenote.cn/signin"
                  className={'btn btn-ghost btn-sm'}
                >
                  登录
                </a>
              </div>
            )}
          </div>
        </div>
        <div className={'text-right'}>
          <a
            className={'tooltip tooltip-left'}
            data-tip={
              data?.profile?.pro ? '已解锁所有功能' : '尚未解锁所有功能'
            }
            href="https://pagenote.cn/pro-plan"
            target={'_blank'}
          >
            {data?.profile?.pro ? (
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
      {/*<div>*/}
      {/*    <div className="avatar-group -space-x-2">*/}
      {/*        <a className="avatar">*/}
      {/*            <div className="w-6">*/}
      {/*                <GitHubSvg width={24} height={24} />*/}
      {/*            </div>*/}
      {/*        </a>*/}
      {/*        <a className="avatar">*/}
      {/*            <div className="w-6">*/}
      {/*                <NotionSvg width={24} height={24} />*/}
      {/*            </div>*/}
      {/*        </a>*/}
      {/*        <a className="avatar placeholder">*/}
      {/*            <div className="w-6 bg-neutral-focus text-neutral-content">*/}
      {/*                <span>+</span>*/}
      {/*            </div>*/}
      {/*        </a>*/}
      {/*    </div>*/}
      {/*</div>*/}
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
