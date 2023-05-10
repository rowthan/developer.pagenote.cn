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
    title: '免费/<key-word>种子用户<key-word>',
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

  let current = 0
  if (userInfo) {
    const pro = userInfo?.profile?.pro || 0
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
      <div className="grid grid-cols-12 gap-6">
        {plans.map((item, index) => (
          <PlanCard
            key={index}
            info={item}
            current={current}
            onClick={setPlan}
          />
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
