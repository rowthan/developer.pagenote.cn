import {isLow} from "@pagenote/shared/lib/utils/compare";
import useWhoAmi from "../../hooks/useWhoAmi";
import React, {ReactElement} from "react";


export default function CheckVersion({requireVersion,children}:{requireVersion: string,children:ReactElement}) {
    const [whoAmi,isLoading] = useWhoAmi();
    if(isLoading){
        return null
    }
    if(!whoAmi?.version){
        return (
            <div className="m-auto mt-20 card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src="https://placeimg.com/400/225/arch" alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">当前浏览器未安装 PAGENOTE</h2>
                    <p>未检测到PAGENOTE，或版本过低</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">
                            <a href="https://pagenote.cn/release">前往安装</a>
                        </button>
                    </div>
                    <div className={'text-center'}>
                        <a href="" className={'link link-primary'}>刷新重试</a>
                    </div>
                </div>
            </div>
        )
    }
    return(
        !isLow(whoAmi.version,requireVersion) ?
        children :
        <div className="mx-auto mt-20 card w-96 bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
                <h2 className="card-title">当前PAGENOTE 版本({whoAmi.version})过低</h2>
                <p>你需要升级至{requireVersion}才可继续访问当前功能</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">
                        <a href="https://pagenote.cn/release">前往升级</a>
                    </button>
                </div>
            </div>
        </div>
    )
}
