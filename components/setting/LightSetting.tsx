import TipInfo from "../TipInfo";
import OutLink from "../../assets/svg/outlink.svg";
import React from "react";
import useSettings from "../../hooks/useSettings";
import BasicSettingLine from "./BasicSettingLine";
import SettingDetail from "./SettingDetail";


export default function LightSetting() {
    const {data: setting, update: updateSetting, loading} = useSettings();

    const {maxRecord, controlC, keyupTimeout, showBarTimeout} = setting;

    function resetSetting() {
        // @ts-ignore
        updateSetting(null)
    }

    return (
        <SettingDetail label={'画笔设置'}>
            <div>
                <BasicSettingLine label={'标记快捷键灵敏度'} right={
                    <select value={keyupTimeout}
                            onChange={(e) => {
                                updateSetting({keyupTimeout: Number(e.target.value)})
                            }}
                            className="select select-ghost w-20 -mr-4 select-sm max-w-xs">
                        <option value={0}>灵敏</option>
                        <option value={500}>适中</option>
                        <option value={2000}>迟缓</option>
                    </select>}></BasicSettingLine>
                <BasicSettingLine label={'画笔面板出现时机'} right={
                    <select value={showBarTimeout}
                            onChange={(e) => {
                                updateSetting({showBarTimeout: Number(e.target.value)})
                            }}
                            className="select select-ghost w-20 -mr-4 select-sm max-w-xs">
                        <option value={0}>立刻</option>
                        <option value={1000}>迟缓</option>
                    </select>}></BasicSettingLine>
                <BasicSettingLine label={'单页面标记上限'} right={
                    <div className={'text-xs'}>
                        {(maxRecord || 0) > 9999 ? <span>无限制</span> : <span>最多标记{maxRecord}个  <a className={'link'} target={'_blank'}
                                                                                                         href="https://pagenote.cn/pro-plan">解锁无限（VIP）</a></span>}
                    </div>
                }></BasicSettingLine>

                <a href="/pagenote.html#setting" target={'_blank'}>
                    <BasicSettingLine label={'画笔设置'} subLabel={'添加画笔、修改颜色'} right={<OutLink className={'fill-current'} />}></BasicSettingLine>
                </a>
            </div>
        </SettingDetail>
    )
}
