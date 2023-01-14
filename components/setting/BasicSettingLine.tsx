import React, {ReactElement} from "react";
import {NavLink} from "react-router-dom";
import SettingMoreSvg from "../../assets/svg/right-more.svg";

export default function BasicSettingLine(props: { label: string,subLabel?: string, path?: string, right?: ReactElement }) {
    const {label, path, right,subLabel} = props;

    function Content() {
        return (
            <div
                className={'px-5 min-h-12 border-b border-base-200 hover:bg-base-200 bg-base-150 flex items-center justify-between'}>
                <div className={'text-sm'}>
                    <div className={' leading-12 '}>{label}</div>
                    <div className={'text-xs text-gray-500'}>{subLabel}</div>
                </div>
                {
                    right ? right :
                        <span
                            className={'rounded-full hover:border hover:bg-base-300 w-6 h-6 flex items-center justify-center'}>
                            <SettingMoreSvg className={'fill-current '}/>
                        </span>
                }
            </div>
        )
    }

    return (
        path ?
        <NavLink to={path}>
            <Content/>
        </NavLink> :
        <Content/>
    )
}
