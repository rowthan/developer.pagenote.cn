import React from 'react'
import BasicLayout from '../layouts/BasicLayout'
import Plans from '../components/pro/Plans'

// 根据选择，提交 支付类型 金额
export default function ProPlan() {
  return (
    <BasicLayout title={'会员计划'} nav={false}>
      <section className="flex flex-col justify-center antialiased  text-gray-600 min-h-screen">
        <div className="h-full">
          <div className="max-w-screen-lg	 mx-auto p-2">
            <h2 className="text-3xl text-neutral font-bold text-center mb-4">
              会员计划
            </h2>

            <Plans></Plans>

            <div className="py-2">
              <ul>
                <li>
                  VIP可优先使用部分功能，普通用户会滞后一段时间，限制会逐步放开。
                </li>
                <li>
                  如果你是学生或老师，使用
                  <key-word>教育邮箱</key-word>
                  注册后，也可解锁功能 1个月。关注
                  <key-word preview="1">微信公众号</key-word>
                  ，也可领取VIP。
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  )
}
