import BasicLayout from "../layouts/BasicLayout";
import useVersions from "hooks/useVersions";
import VersionItem from "components/versions/VersionItem";


export default function () {
    const [versions = []] = useVersions();
    return (
        <BasicLayout title={'发布日志'} nav={false}>
            <section className="min-h-screen py-10 px-2 max-w-screen-lg m-auto">
                <div className="m-auto">
                    <nav className="relative">
                        <h2 className="text-xl text-neutral mb-7">近期更新</h2>
                        {/*<div className="absolute right-0 top-0">*/}
                        {/*    <button className="btn btn-primary btn-outline btn-sm">订阅</button>*/}
                        {/*</div>*/}
                    </nav>
                    <ul>
                        {
                            versions.map((item, index) => (
                                <li key={index}>
                                    <VersionItem version={item} initShowAll={index === 0}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        </BasicLayout>

    )
}
