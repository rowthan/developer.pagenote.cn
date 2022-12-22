import useSettings from "../hooks/useSettings";
import OutLink from "../assets/svg/outlink.svg";


export default function Setting() {
    const [setting, updateSetting] = useSettings();

    const {enableType,maxRecord,controlC} = setting;
    return (
        <div>
            <table className="table table-compact w-full">
                <thead>
                <tr>
                    <th>设置类型</th>
                    <th>配置</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        启用模式
                    </td>
                    <td>
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-6" className="radio radio-success"
                                   onChange={(e) => {
                                       updateSetting({enableType: e.target.checked ? 'always' : 'when-needed'})
                                   }}
                                   checked={enableType === 'always'}/>
                            <div className="ml-2 label-text tooltip tooltip-bottom" data-tip="所有网页加载完毕后,自动启用">
                                默认启用
                            </div>
                        </label>
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10"
                                   className="radio radio-success"
                                   onChange={(e) => {
                                       updateSetting({enableType: !e.target.checked ? 'always' : 'when-needed'})
                                   }}
                                   checked={enableType === 'when-needed'}/>
                            <div className="ml-2 label-text tooltip " data-tip="1.手动点击时启用；2.网页有标记时，自动启用">根据需要</div>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>解放 Control C</td>
                    <td>
                        <input type="checkbox" className="toggle toggle-info" checked={controlC} onChange={(e)=>{updateSetting({controlC: e.target.checked})}} />
                    </td>
                </tr>
                <tr>
                    <td>网页标记数上限</td>
                    <td className={''}>{maxRecord > 99 ? '-' : maxRecord}</td>
                </tr>
                </tbody>
            </table>
            <div className={'flex justify-end'}>
                <a href="/pagenote.html#setting" className={'link flex items-center'} target='_blank'>
                    <span>更多设置</span>
                    <OutLink width={14} height={14}/>
                </a>
            </div>
        </div>
    )
}
