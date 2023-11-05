import {useState} from "react";


export interface PlanInfo {
    title: string
    description: string
    price: number

    unit?: string
    duration: string

    bg: string

    role: number

    deduct: boolean

    final?: boolean
}

export default function usePrice() {
    const [data,setData] = useState<PlanInfo[]>(function () {
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
                description: '按年付费，升级终身VIP时可以用于抵扣。',
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
                final: true,
            },
        ]
        return plans
    });



    return [
        data,
    ]
}
