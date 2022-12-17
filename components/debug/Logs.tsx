import {useEffect, useState} from "react";
import {developer} from "@pagenote/shared/lib/extApi";
import LogInfo = developer.LogInfo;
import extApi from "@pagenote/shared/lib/generateApi";
import {onVisibilityChange} from "@pagenote/shared/lib/utils/document";
import dayjs from "dayjs";
import CheckVersion from "../check/CheckVersion";

export default function Logs() {
    const [logs, setLogs] = useState<Partial<LogInfo>[]>([]);

    useEffect(function () {
        loadLogs();
        return onVisibilityChange(function () {
            loadLogs()
        })
    }, [])

    function loadLogs() {
        extApi.developer.logs({
            query: {
                level: 'error'
            },
            limit: 10,
            sort: {
                createAt: -1
            }
        }).then(function (res) {
            if (res.success) {
                setLogs(res.data.list)
            }
        })
    }

    return (
        <div className='my-4 max-w-full'>
            <CheckVersion requireVersion={'0.24.0'}>
                <div className="mockup-code	overflow-auto	 ">
                    {
                        logs.length ?
                            <div>
                                {
                                    logs.map(function (item) {
                                        return (
                                            <pre key={item.id} data-prefix=">" className={`${item.level} text-error max-w-full overflow-auto`}>
                                            <time>{dayjs(item.createAt).format('YYYY-MM-DD HH:mm:ss')}</time>
                                            <code className='ml-4 break-words '>{item.message || item.stack?.substring(0,40)}</code>
                                        </pre>
                                        )
                                    })
                                }
                                <pre data-prefix=">" className="text-success">
                                <code>
                                    <a href="/developer/log">查看更多</a>
                                </code>
                            </pre>
                            </div>
                            :
                            <pre data-prefix="$" className="text-warning"><code>当前无错误日志, <a href="/developer/log">点击查看完整日志</a></code></pre>
                    }
                    {/*<pre data-prefix=">" className="text-warning"><code>installing...</code></pre>*/}
                    {/*<pre data-prefix=">" className="text-success"><code>Done!</code></pre>*/}
                </div>
            </CheckVersion>
        </div>
    )
}
