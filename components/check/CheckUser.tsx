import {isLow} from "@pagenote/shared/lib/utils/compare";
import useWhoAmi from "../../hooks/useWhoAmi";
import React, {ReactElement} from "react";
import useUserInfo from "../../hooks/useUserInfo";


export default function CheckUser({children}:{children:ReactElement}) {
    const [user] = useUserInfo();
    if(!user?.profile?.nickname){
        return (
            <div className="m-auto mt-20 card w-96 bg-base-200 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src="https://placeimg.com/400/225/arch" alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">此模块需要登录后访问</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary">
                            <a href="https://pagenote.cn/signin">前往登录</a>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <>{children}</>
    )
}
