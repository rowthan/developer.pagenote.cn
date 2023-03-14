import useUserInfo, {fetchInfo} from "../../hooks/useUserInfo";
import React, {useRef, useState} from "react";
import UploadTrigger from "../image/UploadTrigger";
import {updateProfile} from "../../service";
import extApi from "@pagenote/shared/lib/pagenote-api";
import AuthList from "./AuthList";
import Day from "../Day";
import useBooks from "../../hooks/useBooks";
import BookDetail from "./BookDetail";
import DeviceInfo from "./DeviceInfo";
import InviteGroup from "./InviteGroup";


export default function Profle(){
    const [user,refresh] = useUserInfo();
    const {profile} = user || {};
    const img = profile?.avatar;
    const [newImg,setNewImg] = useState(img);
    const [bookInfo] = useBooks();

    function onChange(url:string) {
        updateProfile(url).then(function () {
            setNewImg(newImg)
            fetchInfo(true).then(function (res) {
                setTimeout(function () {
                    refresh();
                },2000)
            })
        })
        extApi.user.getUser({forceRefresh: true},{runAt: Date.now() + 10000})
    }
    return(
        <div>
            <div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2">
                            <div className="bg-white p-3 border-t-4 border-green-400">
                                <div className="image overflow-hidden relative group">
                                    <div className={'h-auto w-full mx-auto'}>
                                        <img className="h-auto w-full mx-auto"
                                             src={newImg||img}
                                             alt=""/>
                                    </div>
                                    <div className={'absolute w-full -bottom-10 group-hover:bottom-0 duration-150 transition-all'}>
                                        <UploadTrigger onChange={onChange}>
                                            <div className={'w-full bg-gray-300 text-white text-center'}>替换</div>
                                        </UploadTrigger>
                                    </div>
                                </div>
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 flex items-center justify-between group">
                                    {profile?.nickname}
                                    {/*<button className={'btn btn-xs btn-outline hidden group-hover:block'}>编辑资料</button>*/}
                                    {/*<UserInfoForm />*/}
                                </h1>
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>当前版本</span>
                                        <span className="ml-auto">
                                            <DeviceInfo />
                                        </span>
                                    </li>
                                    <li className="flex items-center py-3 justify-between">
                                        <span><key-word>VIP</key-word>有效期</span>
                                        <BookDetail>
                                            <span className="ml-auto link">{bookInfo.expiredTip}</span>
                                        </BookDetail>
                                    </li>
                                </ul>
                            </div>
                            <div className="my-4 ">
                                <AuthList />
                            </div>

                            <div className="bg-white p-3 hover:shadow">
                                <InviteGroup />
                            </div>
                        </div>

                        <div className="w-full md:w-9/12 mx-2 h-64">
                            <div className="bg-white p-3 shadow-sm rounded-sm min-h-16">

                                <Day />
                            </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}
