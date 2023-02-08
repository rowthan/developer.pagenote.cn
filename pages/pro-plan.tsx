import PlanCard, {PlanInfo} from "../components/pro/PlanCard";
import Tip from "../components/pro/Tip";
import {useState} from "react";
import useUserInfo from "../hooks/useUserInfo";
import CloseSvg from 'assets/svg/close.svg'

const plans: PlanInfo[] = [{
    title: '免费/ Hobby',
    description:"你现在能免费使用的功能，可以一直免费使用。除非该功能已下线。",
    price: 0,
    duration: '月',
    bg: 'green',
    role: 0,
},{
    title: '订阅VIP',
    description:"可以按年或月支持。赞助金额可用于升级终身版 ",
    price: 5,
    duration: '月',
    bg: 'blue',
    role: 1,
},{
    title: '终身VIP',
    description:"没有时限的VIP用户。",
    price: 120,
    duration: '终身',
    bg: 'indigo',
    role: 2,
}]

// 根据选择，提交 支付类型 金额
export default function ProPlan() {
    const [userInfo] = useUserInfo();
    const [plan,setPlan] = useState<PlanInfo|null>(null)

    let current = 0;
    if(userInfo){
        // const pro = userInfo?.profile?.pro || 0
        const pro = 1.5
        if(pro >= 5){
            current = 2
        }else if(pro > 1){
            current = 1
        }
    }

    const open = plan !== null;
    return(
        <div>
            <section className="flex flex-col justify-center antialiased  text-gray-600 min-h-screen p-4">
                <div className="h-full">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl text-neutral font-bold text-center mb-4">会员计划</h2>

                        <div className="grid grid-cols-12 gap-6">
                            {
                                plans.map((item,index)=>(
                                    <PlanCard key={index} info={item} current={current}  onClick={setPlan} />
                                ))
                            }
                        </div>

                        <div className="py-2">
                            <ul>
                                <li>VIP可优先使用部分功能，普通用户会滞后一段时间，限制会逐步放开。</li>
                                <li>如果你是学生或老师，使用 <b className={'border-b-2'}>教育邮箱</b>注册后，也可解锁功能 1个月。</li>
                                <li><a className={'link link-primary'} href="https://pagenote.cn/img/wechat.jpg" target={'_blank'}>关注微信公众号</a>，也可领取VIP。</li>
                            </ul>
                        </div>
                    </div>

                </div>
                {
                    open &&
                    <div className={`modal modal-open`}>
                        <Tip onClose={()=>{setPlan(null)}}  />
                    </div>
                }
            </section>
        </div>
    )
}
