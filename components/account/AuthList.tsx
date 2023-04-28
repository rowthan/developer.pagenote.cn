import useAuthList from "../../hooks/useAuthList";

export default function AuthList() {
    const [authList,fetch] = useAuthList()
    return(
        <div>
            <div
                className="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
                <div className="w-full px-4 py-5 border-b sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        授权管理
                    </h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
                        通过第三方平台一键登录 PAGENOTE
                    </p>
                </div>
                <ul className="divide-y divide w-full">
                    {
                        authList.map((item,index)=>(
                            <li key={index} className="flex justify-between items-center px-4 ">
                                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                    <img alt="profil" src={item.platformIcon}
                                         className="mx-auto object-cover rounded-full h-6 w-6 bg-white"/>
                                </div>
                                {/*<div className="flex-1 pl-1">*/}
                                {/*    <div className="font-medium dark:text-white">*/}
                                {/*        {item.authType}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="text-xs text-gray-600 dark:text-gray-200">
                                    {item.authName ? item.authName : <a className={'btn btn-outline btn-xs'} href={item.bindUrl}>未绑定</a>}
                                </div>
                                <a href={item.platformUrl} onClick={fetch} target={'_blank'} className="flex justify-end w-24 text-right">
                                    <svg width="20" fill="currentColor" height="20"
                                         className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
                                         viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    )
}
