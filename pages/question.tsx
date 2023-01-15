import {useEffect, useRef, useState} from "react"
import BasicLayout from "../layouts/BasicLayout";
import questions from 'assets/json/question.json'
import { useRouter } from "next/router";

const FaqsCard = (props: { question: { q: string, a: string, id: string }, active: boolean }) => {
    const {question,active} = props
    const answerElRef = useRef<HTMLDivElement>(null)
    const [state, setState] = useState(active)
    const [answerH, setAnswerH] = useState('0px')

    const handleOpenAnswer = () => {
        setState(!state)
    }

    useEffect(function () {
        setState(active)
    },[active])

    useEffect(function () {
        //@ts-ignore
        const answerElH = answerElRef.current?.childNodes[0]?.offsetHeight
        setAnswerH(`${answerElH + 20}px`)
    },[state])

    return (
        <div
            key={question.q}
            className="space-y-3 mt-5 overflow-hidden border-b"
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-neutral font-medium">
                <div dangerouslySetInnerHTML={{__html: question.q}}></div>
                {
                    state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
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
                    <div className="text-neutral opacity-90">
                        <div dangerouslySetInnerHTML={{__html: question.a}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default () => {
    const {query} = useRouter();
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
                        questions.map((item, idx) => (
                            <div key={idx}><FaqsCard question={item} active={query.id === item.id}/></div>
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
