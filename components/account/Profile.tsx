import useUserInfo from "../../hooks/useUserInfo";
import GroupSvg from 'assets/svg/account/group.svg'
import {UploadImage} from "../../utils/upload";
import ImageShape from "../image/ImageShape";
import React, {useRef, useState} from "react";
import UploadTrigger from "../image/UploadTrigger";
import Modal from "../Modal";
import {ContentType} from "@pagenote/shared/lib/@types/data";
export default function Profle(){
    const [user] = useUserInfo();
    const {profile} = user || {};
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const img = profile?.avatar;
    const [newImg,setNewImg] = useState(img);

    function onCropFinished() {
        setNewImg('')
        UploadImage().then(function (client) {
            canvas.current?.toBlob(function (blob) {
                client.put(`${profile?.uid}/test.png`, new Blob([blob], { type: ContentType.jpeg })).then(res =>{
                    console.log(res,'上传结果')
                }).catch(function (reason) {
                    console.log('山川失败')
                })
            },ContentType.jpeg,0.1)
        })
        canvas.current?.toBlob(function (res) {

        })
    }

    return(
        <div>
            <div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2">
                            <div className="bg-white p-3 border-t-4 border-green-400">
                                <div className="image overflow-hidden relative">
                                    <div className={'h-auto w-full mx-auto'}>
                                        <img className="h-auto w-full mx-auto"
                                             src={img}
                                             alt=""/>
                                        <canvas
                                            className={'w-full h-full'}
                                            ref={canvas}
                                            style={{
                                                objectFit: 'contain',
                                                // width: '200px',
                                                // height: "200px",
                                            }}
                                        />
                                    </div>

                                    <Modal open={!!newImg} keepNode={false}>
                                        <ImageShape
                                            preViewCanvas={canvas.current}
                                            originImgSrc={newImg||""}>
                                            <button className={'btn'} onClick={onCropFinished}>确定</button>
                                        </ImageShape>
                                    </Modal>


                                    <UploadTrigger onChange={setNewImg}>
                                        <div className={'w-full bg-gray-300 text-white text-center absolute bottom-0'}>编辑</div>
                                    </UploadTrigger>
                                </div>
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{profile?.nickname}</h1>
                                <h3 className="text-gray-600 font-lg text-semibold leading-6"></h3>
                                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">

                                </p>
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>当前版本</span>
                                        <span className="ml-auto"><span
                                                className="bg-green-500 py-1 px-2 rounded text-white text-sm">最新</span></span>
                                    </li>
                                    <li className="flex items-center py-3">
                                        <span>VIP有效期</span>
                                        <span className="ml-auto">Nov 07, 2016</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="my-4 bg-white p-3 hover:shadow">
                                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                    <span>授权管理</span>
                                </div>
                                <div className="">
                                    <div>
                                        将 PAGENOTE 推荐给其他人
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-3 hover:shadow">
                                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                    <span className="text-green-500">
                                        <GroupSvg className={"h-5 fill-current"} />
                                    </span>
                                    <span>邀请分享</span>
                                </div>
                                <div className="">
                                    <div>
                                        将 PAGENOTE 推荐给其他人
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="w-full md:w-9/12 mx-2 h-64">
                            {/*<div className="bg-white p-3 shadow-sm rounded-sm">*/}
                            {/*    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">*/}
                            {/*        <span className="text-green-500">*/}
                            {/*            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                            {/*                stroke="currentColor">*/}
                            {/*                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />*/}
                            {/*            </svg>*/}
                            {/*        </span>*/}
                            {/*        <span className="tracking-wide">About</span>*/}
                            {/*    </div>*/}
                            {/*    <div className="text-gray-700">*/}
                            {/*        <div className="grid md:grid-cols-2 text-sm">*/}
                            {/*            <div className="grid grid-cols-2">*/}
                            {/*                <div className="px-4 py-2 font-semibold">First Name</div>*/}
                            {/*                <div className="px-4 py-2">Jane</div>*/}
                            {/*            </div>*/}
                            {/*            <div className="grid grid-cols-2">*/}
                            {/*                <div className="px-4 py-2 font-semibold">Last Name</div>*/}
                            {/*                <div className="px-4 py-2">Doe</div>*/}
                            {/*            </div>*/}
                            {/*            <div className="grid grid-cols-2">*/}
                            {/*                <div className="px-4 py-2 font-semibold">Gender</div>*/}
                            {/*                <div className="px-4 py-2">Female</div>*/}
                            {/*            </div>*/}
                            {/*            <div className="grid grid-cols-2">*/}
                            {/*                <div className="px-4 py-2 font-semibold">Contact No.</div>*/}
                            {/*                <div className="px-4 py-2">+11 998001001</div>*/}
                            {/*            </div>*/}
                            {/*            <div className="grid grid-cols-2">*/}
                            {/*                <div className="px-4 py-2 font-semibold">Current Address</div>*/}
                            {/*                <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>*/}
                            {/*            </div>*/}
                            {/*            <div className="grid grid-cols-2">*/}
                            {/*                <div className="px-4 py-2 font-semibold">Permanant Address</div>*/}
                            {/*                <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>*/}
                            {/*            </div>*/}
                            {/*            <div className="grid grid-cols-2">*/}
                            {/*                <div className="px-4 py-2 font-semibold">Email.</div>*/}
                            {/*                <div className="px-4 py-2">*/}
                            {/*                    <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <div className="grid grid-cols-2">*/}
                            {/*                <div className="px-4 py-2 font-semibold">Birthday</div>*/}
                            {/*                <div className="px-4 py-2">Feb 06, 1998</div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <button*/}
                            {/*        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show*/}
                            {/*        Full Information</button>*/}
                            {/*</div>*/}


                            {/*<div className="my-4"></div>*/}


                            {/*<div className="bg-white p-3 shadow-sm rounded-sm">*/}

                            {/*    <div className="grid grid-cols-2">*/}
                            {/*        <div>*/}
                            {/*            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">*/}
                            {/*                <span className="text-green-500">*/}
                            {/*                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                            {/*                        stroke="currentColor">*/}
                            {/*                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />*/}
                            {/*                    </svg>*/}
                            {/*                </span>*/}
                            {/*                <span className="tracking-wide">Experience</span>*/}
                            {/*            </div>*/}
                            {/*            <ul className="list-inside space-y-2">*/}
                            {/*                <li>*/}
                            {/*                    <div className="text-teal-600">Owner at Her Company Inc.</div>*/}
                            {/*                    <div className="text-gray-500 text-xs">March 2020 - Now</div>*/}
                            {/*                </li>*/}
                            {/*                <li>*/}
                            {/*                    <div className="text-teal-600">Owner at Her Company Inc.</div>*/}
                            {/*                    <div className="text-gray-500 text-xs">March 2020 - Now</div>*/}
                            {/*                </li>*/}
                            {/*                <li>*/}
                            {/*                    <div className="text-teal-600">Owner at Her Company Inc.</div>*/}
                            {/*                    <div className="text-gray-500 text-xs">March 2020 - Now</div>*/}
                            {/*                </li>*/}
                            {/*                <li>*/}
                            {/*                    <div className="text-teal-600">Owner at Her Company Inc.</div>*/}
                            {/*                    <div className="text-gray-500 text-xs">March 2020 - Now</div>*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </div>*/}
                            {/*        <div>*/}
                            {/*            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">*/}
                            {/*                <span className="text-green-500">*/}
                            {/*                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                            {/*                        stroke="currentColor">*/}
                            {/*                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />*/}
                            {/*                        <path fill="#fff"*/}
                            {/*                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />*/}
                            {/*                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />*/}
                            {/*                    </svg>*/}
                            {/*                </span>*/}
                            {/*                <span className="tracking-wide">Education</span>*/}
                            {/*            </div>*/}
                            {/*            <ul className="list-inside space-y-2">*/}
                            {/*                <li>*/}
                            {/*                    <div className="text-teal-600">Masters Degree in Oxford</div>*/}
                            {/*                    <div className="text-gray-500 text-xs">March 2020 - Now</div>*/}
                            {/*                </li>*/}
                            {/*                <li>*/}
                            {/*                    <div className="text-teal-600">Bachelors Degreen in LPU</div>*/}
                            {/*                    <div className="text-gray-500 text-xs">March 2020 - Now</div>*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}

                            {/*</div>*/}

                        </div>
                    </div>
            </div>
        </div>
    )
}
