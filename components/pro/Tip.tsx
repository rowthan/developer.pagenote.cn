import useUserInfo from "hooks/useUserInfo";
import {useEffect, useState} from "react";
import CloseSvg from "../../assets/svg/close.svg";
import {bindTransition} from "../../service";

export default function (props: { onClose: () => void; amount: number;  }) {
    const {onClose,amount} = props
    const [paid,setPaid] = useState(false);
    const [userInfo] = useUserInfo();
    const [showButton,setShowButton] = useState(false)

    function confirmPaid(){
        bindTransition('',amount)
        setPaid(true);
    }

    useEffect(function () {
        setTimeout(function () {
            setShowButton(true)
        },5000)
    },[])

    // @ts-ignore
    const {uid,emailMask} = userInfo?.profile || {}

    return(
        <div className="relative flex items-center justify-center via-blue-600 to-sky-600">
            <button onClick={onClose} className={'absolute right-2 top-2 z-50'}>
                <CloseSvg />
            </button>
            <div
                className="relative px-4 md:px-14 py-4 md:py-10 bg-gradient-to-br from-yellow-300 to-yellow-400 border-4 border-gray-900 flex items-center justify-center transform -skew-x-1">
                <div
                    className="inline-block py-8 px-5 md:px-10 bg-base-100 text-neutral  border-4 border-gray-900 text-center transform skew-x-2">
                    {
                        paid ? <div>
                            请稍后，我将尽快确认赞助信息，这可能需要几分钟，请注意查收邮件。
                            <div className={'divider'}></div>
                            <div className={'text-sm'}>超过12小时未绑定请联系我</div>
                            <div className={'text-xs'}>忘记留邮箱/ID了？请在微信公众号留言。</div>
                        </div>:
                            <div>
                                <h1 className="mt-2 font-comic text-2xl md:text-4xl font-extrabold tracking-wider">
                                    赞助
                                    <span className="underline decoration-double decoration-blue-500">
                                      PAGENOTE
                                    </span>
                                </h1>

                                <p className="my-2 font-medium">
                                    请备注你的用户ID {uid && <b>:{uid}</b>} 或邮箱{emailMask && <span>({emailMask})</span>}
                                </p>

                                <div className="carousel w-40 h-40 m-auto">
                                    <div id="ali" className="carousel-item w-full">
                                        <img src="https://pagenote.cn/img/pay/year-40.png" className="w-full" />
                                    </div>
                                    <div id="wechat" className="carousel-item w-full">
                                        <img src="https://pagenote.cn/img/pay/wechat-pay.png" className="w-full" />
                                    </div>
                                </div>
                                <div className="flex justify-center w-full py-2 gap-2">
                                    <a href="#ali" className="btn btn-xs">支付宝</a>
                                    <a href="#wechat" className="btn btn-xs">微信</a>
                                </div>
                                <div className={'text-sm'}>
                                    请按照 <b>5元/月</b>、<b>40元/年</b>、<b>125元/终身</b> 支付
                                </div>

                                <button onClick={confirmPaid} disabled={!showButton} className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-10 border-2 border-gray-900 mt-5 font-bold -skew-x-2">
                                    支付好了点这里
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
