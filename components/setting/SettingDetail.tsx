import {NavLink} from "react-router-dom";
import BackSvg from "../../assets/svg/back.svg";
import React, {ReactElement} from "react";

export default function SettingDetail(props: { children: ReactElement, label: string }) {
    const {children, label} = props;
    return (
        <div className={'shadow rounded-lg'}>
            <div className={'flex px-3 items-center py-2 mb-8'}>
                <NavLink to={'/setting'}>
                    <aside className={'flex items-center justify-center w-8 h-8 rounded-full hover:bg-base-300'}>
                        <BackSvg className={'fill-current'}/>
                    </aside>
                </NavLink>
                <h3 className={'text-md ml-4'}>{label}</h3>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
