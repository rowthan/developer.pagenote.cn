import useSettings from "../hooks/useSettings";
import OutLink from "../assets/svg/outlink.svg";
import UserInfo from "./UserInfo";


export default function Setting() {
    const [setting, updateSetting, loading] = useSettings();

    const {enableType, maxRecord, controlC, keyupTimeout, showBarTimeout} = setting;

    function resetSetting() {
        // @ts-ignore
        updateSetting(null)
    }

    return (
        <div>
            <UserInfo />
            <table className="table table-compact w-3/4 m-auto">
                <style jsx>{`
                  table th:first-child {
                    text-align: right;
                  }

                  table td:first-child {
                    text-align: right;
                  }
                `}
                </style>
                <thead>
                </thead>
                <tbody>
                <tr>
                    <td>
                        启用模式
                    </td>
                    <td>
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-6" className="radio radio-info"
                                   onChange={(e) => {
                                       updateSetting({enableType: e.target.checked ? 'always' : 'when-needed'})
                                   }}
                                   checked={enableType === 'always'}/>
                            <div className="ml-2 label-text tooltip tooltip-bottom"
                                 data-tip="所有网页加载完毕后,自动启用">
                                默认启用
                            </div>
                        </label>
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10"
                                   className="radio radio-info"
                                   onChange={(e) => {
                                       updateSetting({enableType: !e.target.checked ? 'always' : 'when-needed'})
                                   }}
                                   checked={enableType === 'when-needed'}/>
                            <div className="ml-2 label-text tooltip "
                                 data-tip="1.手动点击时启用；2.网页有标记时，自动启用">根据需要
                            </div>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>解放 Control C</td>
                    <td>
                        <input type="checkbox" className="toggle toggle-info" checked={controlC} onChange={(e) => {
                            updateSetting({controlC: e.target.checked})
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td><span>网页内标记上限</span></td>
                    <td className={''}>
                        <div className={'w-40'}>
                            <input type="range" min="0" max="1000"
                                   value={maxRecord}
                                   onChange={(e) => {
                                       updateSetting({maxRecord: Number(e.target.value)})
                                   }}
                                   className="range range-xs range-info"
                                   step="25"/>
                            <div className="w-full flex justify-between text-xs px-2">
                                <span>50个</span>
                                <span>100</span>
                                <span></span>
                                <span>
                                <a className={'link'} target={'_blank'} href="https://pagenote.cn/pro-plan">无限</a>
                            </span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>标记快捷键灵敏度</td>
                    <td>
                        <div className={'w-40'}>
                            <input type="range" min="0" max="2000"
                                   value={keyupTimeout}
                                   onChange={(e) => {
                                       updateSetting({keyupTimeout: Number(e.target.value)})
                                   }}
                                   className="range range-xs range-info"
                                   step="500"/>
                            <div className="w-full flex justify-between text-xs px-2">
                                <span>立刻</span>
                                {/*<span>适中</span>*/}
                                <span>迟缓</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>画笔面板出现时机</td>
                    <td>
                        <div className={'w-40'}>
                            <input type="range" min="0" max="1000"
                                   value={showBarTimeout}
                                   onChange={(e) => {
                                       updateSetting({showBarTimeout: Number(e.target.value)})
                                   }}
                                   className="range range-xs range-info"
                                   step="200"/>
                            <div className="w-full flex justify-between text-xs px-2">
                                <span>立刻</span>
                                {/*<span>适中</span>*/}
                                <span>迟缓</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className={'!text-center'}>
                        <button className={'btn btn-success btn-sm'} onClick={resetSetting}
                                disabled={loading}>使用推荐设置
                        </button>
                        <div className={'text-center'}>
                            <a href="/pagenote.html#setting" className={'link inline'} target='_blank'>
                                <span>更多设置 <OutLink className={'inline'} width={14} height={14}/></span>
                            </a>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
