import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import extApi from "@pagenote/shared/lib/generateApi";
import Head from "next/head";
import dayjs from "dayjs";
import TipInfo from "components/TipInfo";
import {localResource} from "@pagenote/shared/lib/extApi";
import LocalResource = localResource.LocalResource;

function runScript(root?: Document | null) {
    if (!root) {
        return
    }
    const scripts = root.querySelectorAll('script')
    console.log(scripts, 'scripts')
    scripts.forEach(function (script) {
        console.log(script.outerHTML)
        const newScript = root.createElement('script');
        newScript.src = script.src;
        newScript.type = script.type || 'application/javascript';
        newScript.innerHTML = script.innerHTML;
        newScript.dataset.run = '1'
        script.replaceWith(newScript)
    })
}

export default function Offline() {
    const {query} = useRouter();
    const [resource, setResource] = useState<Partial<LocalResource> | undefined>();
    const [relatedResource, setResourceList] = useState<Partial<LocalResource>[]>([])

    function fetchResource() {
        const id = query.id as string;
        if (!id) {
            return
        }
        extApi.localResource.query({
            query: {
                resourceId: id
            },
            limit: 1,
        }).then(function (res) {
            const resource = res.data?.list[0] || null;
            setResource(resource)
            if (resource) {
                // 1.iframe 隔离的方式
                const iframe = document.createElement('iframe');
                // TODO 植入 service worker 来控制网络请求的跨域问题
                iframe.srcdoc = '<!DOCTYPE html><html><head></head><body></body></html>';
                iframe.setAttribute('data-pagenote', 'html')
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                const current = document.querySelector('iframe[data-pagenote]');
                if (current) {
                    document.documentElement.removeChild(current)
                }
                document.documentElement.appendChild(iframe)
                iframe?.contentDocument?.write(resource.data || '')

                // const script = document.createElement('script')
                // script.src = 'http://127.0.0.1:3000/init.js'
                // iframe.contentDocument?.documentElement.appendChild(script)

                // 2.最原始的植入方式
                //@ts-ignore
                // document.documentElement.innerHTML = resource.data
            }
        })
    }

    function fetchRelated() {
        if (!resource?.relatedPageUrl) {
            return;
        }
        extApi.localResource.query({
            query: {
                relatedPageUrl: resource?.relatedPageUrl
            },
            limit: 99,
            projection: {
                data: -1
            }
        }).then(function (res) {
            if (res.success) {
                setResourceList(res.data.list || [])
            }
        })
    }

    function onChangeResourceId(id: string) {
        window.location.href = `/ext/offline.html?id=${id}`
    }

    function removeResource() {
        extApi.localResource.remove({
            keys: [resource?.resourceId || '']
        }).then(function () {
            window.location.reload()
        })
    }

    useEffect(function () {
        if (resource?.relatedPageUrl) {
            fetchRelated()
        }
    }, [resource])

    useEffect(function () {
        fetchResource();
    }, [query])

    return <>
        <Head>
            <title>【pagenote离线网页】{resource?.name}</title>
        </Head>
        {
            resource ?
                <div className="alert alert-info shadow-lg">
                    <div>
                        <TipInfo tip={'断网也可以访问，永久保存'}/>
                        <span>你正在访问网页（<a className={'link link-error max-w-lg overflow-hidden overflow-ellipsis inline-block align-bottom whitespace-nowrap'} href={resource?.originUrl}
                                                target={'_blank'}>{resource?.originUrl}</a>）的离线快照版本</span>
                    </div>
                    <div>
                        <select value={resource?.resourceId}
                                onChange={(e) => {
                                    onChangeResourceId(e.target.value)
                                }}
                                className="select select-ghost w-52 max-w-xs">
                            <option value={''} disabled selected>选择版本</option>
                            {
                                relatedResource.map((item, index) => {
                                    const value = dayjs(item.createAt).format('YYYY/MM/DD HH:mm:ss')
                                    return (
                                        <option key={index} className="step step-primary"
                                                value={item.resourceId}
                                                data-content={item.resourceId === resource?.resourceId ? "✓" : index + 1}>
                                            {value}
                                            {/*<span*/}
                                            {/*    data-tip={`记录于${dayjs(item.createAt).format('YYYY/MM/DD HH:mm:ss')}`}*/}
                                            {/*    className={`tooltip tooltip-bottom badge badge-sm  ${item.resourceId === resource?.resourceId ? 'badge-primary' : 'badge-outline'}`}>*/}
                                            {/*    */}
                                            {/*</span>*/}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        {/* The button to open modal */}
                        <label htmlFor="remove-modal" className="btn btn-error btn-sm">
                            删除此版本
                        </label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="remove-modal" className="modal-toggle"/>
                        <label htmlFor="remove-modal" className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                <h3 className="text-lg font-bold">删除后不可恢复!</h3>
                                <p className="py-4">
                                    仅删除当前离线网页。笔记数据不受影响。
                                </p>
                                <div className="modal-action">
                                    <button onClick={removeResource} className="btn btn-error">确认删除!</button>
                                </div>
                            </label>
                        </label>
                    </div>
                </div> :
                <div className="alert alert-error shadow-lg">
                    没有找到离线网页数据，请检查。<a className={'btn btn-primary'}
                                                   href="/ext/local_html.html">重新选择</a>
                </div>
        }

    </>;
}
