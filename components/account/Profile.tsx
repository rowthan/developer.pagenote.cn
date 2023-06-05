import React from 'react'
import AuthList from './AuthList'
import Day from '../Day'
import TodayRelated from './TodayRelated'
import CheckUser from '../check/CheckUser'
import UserCard from './UserCard'

export default function Profile() {
  return (
    <div className="container mx-auto p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <UserCard editable={true} />

          <div className="my-4 ">
            <CheckUser fallback={<div></div>}>
              <AuthList />
            </CheckUser>
          </div>

          {/*<div className="bg-white p-3 hover:shadow">*/}
          {/*    <InviteGroup />*/}
          {/*</div>*/}
        </div>

        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="flex bg-white text-gray-900 p-3 shadow-sm rounded-sm min-h-16">
            <Day />
            <div className={'ml-2'}>
              <h2>今日相关</h2>
              <TodayRelated />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
