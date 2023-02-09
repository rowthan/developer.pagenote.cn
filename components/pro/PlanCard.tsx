import useBooks from "../../hooks/useBooks";
import dayjs from "dayjs";

interface Right {
    label: string,
    disAllowLabel?: string
    allowFor: number[]
    visibleFor: number[]
}

export interface PlanInfo {
    title: string
    description: string
    price: number,
    duration: string

    bg: string

    role: number
}

const RIGHTS: Right[] = [{
    label: "在任意网页标记",
    allowFor: [0,1, 2],
    visibleFor: [0, 1, 2]
}, {
    label: "搜索引擎内可联动搜索",
    allowFor: [0,1, 2],
    visibleFor: [0, 1, 2],
},{
    label: "标记无上限，画笔颜色无限制",
    disAllowLabel: '单个页面标记上限 50 个',
    allowFor: [1, 2],
    visibleFor: [0, 1, 2]
}, {
    label: "对图片进行标记",
    disAllowLabel: '不可标记图片',
    allowFor: [1, 2],
    visibleFor: [0, 1, 2],
}, {
    label: "与 Notion 同步",
    allowFor: [1, 2],
    visibleFor: [0, 1,2],
},{
    label: "网页离线化",
    allowFor: [1, 2],
    visibleFor: [0, 1,2],
}, {
    label: "有赠送福利时，时长加倍",
    allowFor: [1],
    visibleFor: [0, 1],
}]


export default function PlanCard(props: { info: PlanInfo, current: number,onClick:(info: PlanInfo)=>void }) {
    const [books] = useBooks();
    const {current, info,onClick} = props;
    const {title, description, price, duration, bg='indigo', role} = info;
    const disabled = current >= role

    const endAtTime = books[0]?.endTime ? dayjs(books[0].endTime) : ''

    const buttonLabel = current === role ? `当前身份` : (current < role ? '升级' : '已高于此身份');

    return (
        <div className="relative col-span-full md:col-span-4 text-neutral !bg-opacity-0 bg-blue-500 bg-green-500 bg-indigo-500 shadow-md rounded-sm border border-gray-200">
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-${bg}-500`} aria-hidden="true"></div>
            <div className="px-5 pt-5 pb-6 border-b border-gray-200">
                <header className="flex items-center mb-2">
                    <div
                        className={`w-6 h-6 rounded-full flex-shrink-0 bg-${bg}-500 bg-gradient-to-tr from-${bg}-500 to-${bg}-300 mr-3`}>
                        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                            <path
                                d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z"/>
                        </svg>
                    </div>
                    <h3 className="text-lg text-neutral font-semibold">{title}</h3>
                </header>
                <div className="text-sm mb-2 h-10">{description}</div>
                <div className="font-bold mb-4">
                    <span className="text-2xl">￥</span>
                    <span className="text-3xl" x-text="annual ? '14' : '19'">
                        {price}元
                    </span>
                    <span className="text-gray-500 font-medium text-sm">/{duration}</span>
                </div>
                <button className={`font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-gray-200 rounded leading-5 shadow-sm transition duration-150 ease-in-out focus:outline-none  w-full hover:scale-105 duration-300
                    ${disabled ? 'border-gray-200 border-transparent focus-visible:ring-2 focus:outline-none bg-gray-100 text-gray-400 cursor-not-allowed'
                    : `hover:border-gray-300 focus-visible:ring-2 text-white bg-${bg}-500 hover:bg-${bg}-600`}`}
                        onClick={()=>onClick(info)}
                        disabled={disabled}>
                    {
                        disabled &&
                        <svg className="w-3 h-3 flex-shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                            <path
                                d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"/>
                        </svg>
                    }
                    <span>{buttonLabel}</span>
                </button>
            </div>
            <div className="px-5 pt-4 pb-5">
                <div className="text-xs font-semibold uppercase mb-4">
                    权益列表 / What's included
                </div>
                <ul>
                    {
                        RIGHTS.filter((item) => {
                            return item.visibleFor.includes(role)
                        }).map((item, index) => {
                            const allow = item.allowFor.includes(role)
                            return(
                                <li key={index} className="flex items-center py-1">
                                    <aside className={'mr-2'}>
                                        {
                                            allow ?
                                                <svg className="w-3 h-3 flex-shrink-0 fill-current text-green-500 "
                                                     viewBox="0 0 12 12">
                                                    <path
                                                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"/>
                                                </svg> :
                                                <svg viewBox="0 0 1024 1024"
                                                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6455" width="12"
                                                     height="12">
                                                    <path
                                                        d="M910.336 186.368l-72.704-72.704L512 439.808 186.368 113.664 113.664 186.368 439.808 512l-326.144 325.632 72.704 72.704L512 584.192l325.632 326.144 72.704-72.704L584.192 512l326.144-325.632z"
                                                        fill="#d81e06" p-id="6456"></path>
                                                </svg>
                                        }
                                    </aside>

                                    <div className="text-sm">
                                        {
                                          allow ?  item.label : (item.disAllowLabel || item.label)
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
