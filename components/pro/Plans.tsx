import React, { type ReactNode, useEffect, useState } from 'react'
import PlanCard from './PlanCard'
import useUserInfo from '../../hooks/useUserInfo'
import { createOrder } from '../../service'
import Tip from './Tip'
import usePrice, { PlanInfo } from '../../hooks/usePrice'

interface Props {
  children?: ReactNode
}


export default function Plans(props: Props) {
  const { children } = props
  const [userInfo] = useUserInfo()
  const [plans] = usePrice()
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
