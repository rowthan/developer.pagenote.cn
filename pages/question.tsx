import {useRef, useState} from "react"
import BasicLayout from "../layouts/BasicLayout";

const FaqsCard = (props: { question: { q: string, a: string } }) => {

    const answerElRef = useRef<HTMLDivElement>(null)
    const [state, setState] = useState(false)
    const [answerH, setAnswerH] = useState('0px')
    const {question} = props

    const handleOpenAnswer = () => {
        //@ts-ignore
        const answerElH = answerElRef.current?.childNodes[0]?.offsetHeight
        setState(!state)
        setAnswerH(`${answerElH + 20}px`)
    }

    return (
        <div
            key={question.q}
            className="space-y-3 mt-5 overflow-hidden border-b"
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-neutral font-medium">
                {question.q}
                {
                    state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef} className="duration-300"
                style={state ? {height: answerH} : {height: '0px'}}
            >
                <div>
                    <p className="text-neutral opacity-90">
                        {question.a}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default () => {

    const faqsList = [
        {
            q: "多设备数据如何同步？",
            a: "当下 PAGENOTE 不存储用户的数据信息，所以无法通过官方服务器同步；目前仅支持手动导出或导入数据。"
        },
        {
            q: "VIP有优惠活动吗？",
            a: "目前暂时还没有规划；不用等，现在就是最优惠的时刻"
        },
    ]

    return (
        <BasicLayout title={'常见问题'} nav={false}>
            <section className="leading-relaxed max-w-screen-xl pt-12 mx-auto px-4 lg:px-8">
                <div className="space-y-3 text-center">
                    <h1 className="text-3xl text-neutral font-semibold">
                        常见问题
                    </h1>
                    <p className="text-neutral max-w-lg mx-auto text-lg">
                        <span>以下为常见问题，如果仍无法解决你的疑问，请联系我</span>
                    </p>
                </div>
                <div className="mt-14 max-w-2xl mx-auto">
                    {
                        faqsList.map((item, idx) => (
                            <FaqsCard question={item}/>
                        ))
                    }
                </div>
                <div className={'flex justify-center mt-10'}>
                    <a
                        href={'/feedback'}
                        className="py-3 px-10 bg-yellow-400 text-gray-800 text-lg rounded-lg border-2 font-semibold border-gray-800 shadow-lg shadow-yellow-500/70">
                        未解决，提交问题
                    </a>
                </div>

            </section>

        </BasicLayout>
    )
}
