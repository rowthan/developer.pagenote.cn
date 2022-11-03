import {isLow} from "@pagenote/shared/lib/utils/compare";
import useWhoAmi from "../hooks/useWhoAmi";
import InstallBar from "./InstallBar";
import React, {ReactElement} from "react";


export default function CheckNewVersion({requireVersion,children}:{requireVersion: string,children:ReactElement}) {
    const [whoAmi] = useWhoAmi();
    if(!whoAmi){
        return (
            <div>
                <p>当前浏览器还尚未安装 PAGENOTE 插件</p>
                <InstallBar>
                    <span>点击上方，请在此浏览器安装 {requireVersion} 以上版本的 PAGENOTE 后再使用本功能</span>
                </InstallBar>
            </div>
        )
    }
    return(
        !isLow(whoAmi.version,requireVersion) ?
        children :
        <InstallBar>
            <>
                <div>当前版本过低（{whoAmi.version})</div>
                <div>请安装 {requireVersion} 以上版本的 PAGENOTE 后再访问本页面</div>
            </>
        </InstallBar>
    )
}
