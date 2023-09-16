import React, { type ReactNode, useEffect, useState } from 'react'
import PlanCard, { PlanInfo } from './PlanCard'
import useUserInfo from '../../hooks/useUserInfo'
import { createOrder } from '../../service'
import Tip from './Tip'

interface Props {
  children?: ReactNode
}

const plans: PlanInfo[] = [
  {
    title: '免费/种子用户',
    description:
      '你现在能免费使用的功能，可以一直免费使用。除非该功能已下线。<key-word>无垃圾广告<key-word>',
    price: 0,
    duration: '月',
    bg: 'green',
    role: 0,
    deduct: false,
  },
  {
    title: '周期VIP',
    description: '可以按年或月支持。赞助金额可用于升级终身VIP。',
    price: 40,
    duration: '年',
    bg: 'blue',
    role: 1,
    deduct: false,
  },
  {
    title: '终身VIP',
    description: '没有时限的VIP用户。',
    price: 125,
    duration: '终身',
    unit: '元(累计)',
    bg: 'indigo',
    role: 2,
    deduct: true,
  },
]
export default function Plans(props: Props) {
  const { children } = props
  const [userInfo] = useUserInfo()
  const [plan, setPlan] = useState<PlanInfo | null>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  let current = 0
  if (userInfo) {
    const pro = userInfo?.profile?.role || 0
    if (pro > 9) {
      current = 2
    } else if (pro > 1) {
      current = 1
    }
  }
  useEffect(
    function () {
      if (plan) {
        createOrder(plan?.price)
      }
    },
    [plan]
  )

  const open = plan !== null
  return (
    <div className="">
      <div className={'block md:hidden'}>
        <div className="tabs m-auto my-2 justify-center">
          {plans.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveIndex(index)
              }}
              className={`tab tab-bordered ${
                activeIndex === index ? 'tab-active' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: item.title }}
            ></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 my-2">
        {plans.map((item, index) => (
          <div
            key={index}
            className={`hidden md:block ${
              activeIndex === index ? '!block' : ''
            }`}
          >
            <PlanCard info={item} current={current} onClick={setPlan} />
          </div>
        ))}
      </div>
      {children}
      {open && (
        <div className={`modal modal-open`}>
          <Tip
            amount={userInfo?.leftPermanent || plans[2].price}
            onClose={() => {
              setPlan(null)
            }}
          />
        </div>
      )}
    </div>
  )
}

Plans.defaultProps = {}
