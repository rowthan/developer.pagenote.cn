import useShortcut from "../hooks/useShortcut";
import useSettings from "../hooks/useSettings";
import extApi from "@pagenote/shared/lib/generateApi";
import useWhoAmi from "../hooks/useWhoAmi";
import {useEffect} from "react";
import {BrowserType} from "@pagenote/shared/lib/utils/browser";


const shortcutTip:Record<string, string> = {
    '_execute_browser_action':"激活扩展/弹窗"
}
export default function ShortCutInfo() {
    const [commands=[]] = useShortcut();
    const [whoAmI] = useWhoAmi();
    const {data} = useSettings();
    const brush = data?.brushes || [];
    const keyupTimeout = data.keyupTimeout || 0;

    const shortcuts = brush.map(function (item) {
        return {
            color: item.bg,
            shortcut: item.shortcut,
        }
    })

    function openShortCutSetting() {
        if(!whoAmI?.extensionShortcutUrl){
            alert('当前浏览器不支持直达插件设置中心')
            return
        }
        extApi.developer.chrome({
            namespace:'tabs',
            type:"create",
            args:[{
                url: whoAmI?.extensionShortcutUrl
            }]
        })
    }

    useEffect(function () {

    },[])

    return(
        <table className="table table-compact w-full max-w-md	">
            <thead>
            <tr>
                <th>功能</th>
                <th>值</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
                {
                    commands?.map((command)=>(
                        <tr key={command.name}>
                            <td>{command.description || shortcutTip[command.name||""] || command.name}</td>
                            <td>
                                {command.shortcut ? <kbd className="kbd kbd-sm text-neutral">{command.shortcut}</kbd> : <span>-</span>}
                            </td>
                            <td>
                                <a className={'text-xs link link-primary'} onClick={openShortCutSetting}>修改</a>
                            </td>
                        </tr>
                    ))
                }
                <tr>
                    <td className={'text-sm'}>
                        <div>标记内容</div>
                        {keyupTimeout>0 && <div className={'text-xs text-gray-400'}>长按 <a className={'link'} href="/ext/popup.html#/setting/light">{(keyupTimeout / 1000).toFixed(1)}s</a></div>}
                    </td>
                    <td className={'whitespace-normal w-40'}>
                        {
                            shortcuts.map((item,index)=>(
                                <kbd key={index} style={{backgroundColor: item.color}} className="kbd kbd-sm text-neutral">{item.shortcut}</kbd>
                            ))
                        }
                    </td>
                    <td>
                        <a className={'text-xs link link-primary'} href={`${whoAmI?.origin}/pagenote.html#setting`} target={'_blank'}>修改</a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
