import TadaSvg from 'assets/svg/tada.svg'
import ToggleSvg from 'assets/svg/toggle.svg'
import CloseSvg from 'assets/svg/close.svg'
import MinSvg from 'assets/svg/min.svg'

import {useState} from "react";
export default function () {
    const [visible,setVisible] = useState(false)

    return(
        <div className={'absolute bottom-1 right-2'}>
            <div className={'border rounded-md bg-base-100 w-48 absolute bottom-10 shadow right-0'}>
                <div className={'border-b p-4 flex justify-bettwen'}>
                    <h3 className={'text-sm text-bold'}>学习更多玩法</h3>
                    <div className="">
                        <button className="">
                            <CloseSvg />
                        </button>
                    </div>
                </div>
            </div>
            <div className={'btn btn-sm bg-gray-900 text-sm items-center rounded flex w-fit'}>
                <TadaSvg fill={'#000'} width={32} height={32} />
                <span>
                    发现新玩法
                </span>
                <ToggleSvg width={32} height={32} />
            </div>
        </div>
    )
}
