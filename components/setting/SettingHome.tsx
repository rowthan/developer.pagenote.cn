import React from "react";
import useSettings from "../../hooks/useSettings";
import BasicSettingLine from "./BasicSettingLine";
import useWhoAmi from "../../hooks/useWhoAmi";
import {user} from "@pagenote/shared/lib/extApi";
import ExtensionPlatform = user.ExtensionPlatform;
import {checkIsInPopup} from "../../utils/check";


export default function SettingHome() {
    const {data: setting, update: updateSetting} = useSettings();
    const [whoAmI] = useWhoAmi();
    const {controlC, enableType} = setting;

    const isFirefox = whoAmI?.extensionPlatform === ExtensionPlatform.Firefox && checkIsInPopup()
    return (
        <div className={'shadow rounded-lg'}>
            <BasicSettingLine label={'自动启动'}
                              subLabel={enableType === 'when-needed' ? '需要你手动启动，才可以开始标记内容' : "网页打开就可以立即开始标记"}
                              right={
                                  <input type="checkbox" className="toggle toggle-info"
                                         checked={enableType !== 'when-needed'} onChange={(e) => {
                                      updateSetting({enableType: e.target.checked ? 'always' : 'when-needed'})
                                  }}/>}></BasicSettingLine>
            <BasicSettingLine label={'自动 Control C'} right={
                <input type="checkbox" className="toggle toggle-info" checked={controlC} onChange={(e) => {
                    updateSetting({controlC: e.target.checked})
                }}/>}/>
            {
                isFirefox ?
                    <a target={'_blank'} href={`${whoAmI?.origin}/web/popup.html#/setting/data`}>
                        <BasicSettingLine label={'🖌画笔'}/>
                    </a> :
                    <BasicSettingLine label={'🖌画笔'} path={'/setting/light'}/>
            }
            <BasicSettingLine label={'📚数据中心'} path={'/setting/data'}/>
        </div>
    )
}
