import useUserInfo, { fetchUserInfo } from '../../hooks/useUserInfo'
import React, { useState } from 'react'
import UploadTrigger from '../image/UploadTrigger'
import { UpdateProfile, updateProfile } from '../../service'
import AuthList from './AuthList'
import Day from '../Day'
import useBooks from '../../hooks/useBooks'
import BookDetail from './BookDetail'
import DeviceInfo from './DeviceInfo'
import TodayRelated from './TodayRelated'
import UserInfoForm from './UserInfoForm'
import Modal from '../Modal'
import { toast } from '../../utils/toast'
import CheckVersion from '../check/CheckVersion'
import CheckUser from '../check/CheckUser'

export default function Profle() {
  const [user, refresh] = useUserInfo()
  const { profile } = user || {}
  const img = profile?.avatar
  const [newImg, setNewImg] = useState(img)
  const [openProfileModal, setProfileModal] = useState(false)
  const [bookInfo] = useBooks()

  function onChange(updateInfo: UpdateProfile) {
    updateProfile(updateInfo).then(function (res) {
      if (updateInfo.avatar) {
        setNewImg(newImg)
      }
      if (res?.data?.json?.error) {
        toast(res.data.json.error)
      } else {
        setProfileModal(false)

        fetchUserInfo(true).then(function (res) {
          console.log('refresh force', res)
          refresh()
        })
      }
    })
    fetchUserInfo(true)
  }

  return (
    <CheckVersion requireVersion={'0.26.3.10'}>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white text-gray-950 p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden relative group">
                <div
                  className={'h-auto w-full mx-auto aspect-w-16 aspect-h-16'}
                >
                  <CheckUser
                    fallback={
                      <div>
                        请
                        <a href="/signin.html" className={'link'}>
                          登录
                        </a>
                        后查看
                      </div>
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full mx-auto  object-cover"
                      src={newImg || img}
                      alt=""
                    />
                  </CheckUser>
                </div>
                <div
                  className={
                    'absolute w-full -bottom-10 group-hover:bottom-0 duration-150 transition-all'
                  }
                >
                  <UploadTrigger
                    onChange={(url) => {
                      onChange({ avatar: url })
                    }}
                  >
                    <div
                      className={'w-full bg-gray-300 text-white text-center'}
                    >
                      替换
                    </div>
                  </UploadTrigger>
                </div>
              </div>
              <button
                data-tip={'点击修改'}
                onClick={() => {
                  setProfileModal(true)
                }}
                className="text-gray-900 tooltip font-bold text-xl leading-8 my-1"
              >
                {profile?.nickname}
              </button>
              <Modal
                open={openProfileModal}
                toggleOpen={(open) => {
                  setProfileModal(open)
                  refresh()
                }}
              >
                <UserInfoForm onChange={onChange} />
              </Modal>

              <ul className="bg-gray-100 text-gray-700  hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>当前版本</span>
                  <span className="ml-auto">
                    <DeviceInfo />
                  </span>
                </li>
                <li className="flex items-center py-3 justify-between">
                  <span>
                    <key-word>VIP</key-word>有效期
                  </span>
                  <BookDetail>
                    <span className="ml-auto link">{bookInfo.expiredTip}</span>
                  </BookDetail>
                </li>
              </ul>
            </div>
            <div className="my-4 ">
              <AuthList />
            </div>

            {/*<div className="bg-white p-3 hover:shadow">*/}
            {/*    <InviteGroup />*/}
            {/*</div>*/}
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="flex bg-white p-3 shadow-sm rounded-sm min-h-16">
              <Day />
              <div className={'ml-2'}>
                <h2>今日相关</h2>
                <TodayRelated />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckVersion>
  )
}
