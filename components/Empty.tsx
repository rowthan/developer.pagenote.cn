import {ReactElement} from "react";

export default function Empty(props: { children: ReactElement | string }) {
    return (
        <div>

            <div className="mt-20 mx-auto p-8">
                <img src="https://pagenote.cn/favicon.ico" className="w-10 h-10 m-auto mb-8"/>
                <p className="text-gray-600 dark:text-white w-full md:w-2/3 m-auto text-center text-lg md:text-3xl">
                    <span className="font-bold text-indigo-500">
                        “
                    </span>
                    {props.children}
                    <span className="font-bold text-indigo-500">
                        ”
                    </span>
                </p>
            </div>

        </div>
    )
}
