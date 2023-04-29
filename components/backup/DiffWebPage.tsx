import { WebPage } from "@pagenote/shared/lib/@types/data"
import useAbstract from "../../hooks/useAbstract";
import {AbstractInfo, ChangeFlag, diffSnapshot} from "@pagenote/shared/lib/library/syncStrategy";

interface DiffWebPageProps {
    pages: Partial<WebPage>[]
}
export default function DiffWebPage(props: DiffWebPageProps) {
    const {pages} = props;
    const [pageAbstract] = useAbstract('page');
    const filePageAbstract: Record<string, AbstractInfo>= {}

    pages.forEach(function (p) {
        const key = p.key || p.url;
        if(key){
            filePageAbstract[key] = {
                id: key,
                updateAt: p.updateAt || 0,
                l_id: key,
            }
        }
    })

    const diff = diffSnapshot(filePageAbstract,pageAbstract);
    const same: string[]= [];
    const diffType: Record<ChangeFlag, string[]> = {
        [ChangeFlag.nochange]: [],
        [ChangeFlag.created]: [],
        [ChangeFlag.changed]: [],
        [ChangeFlag.deleted]: [],
    };
    for(let i in diff){
        diffType[diff[i]].push(i);
    }

    const sameCount = diffType[ChangeFlag.nochange].length;
    const changedCount = diffType[ChangeFlag.changed].length;
    const deletedCount = diffType[ChangeFlag.deleted].length;
    const createdCount = diffType[ChangeFlag.created].length;
    return(
        <div>
            <h3>网页Diff</h3>
            <div>
                新增：{createdCount} 个
                <div className="radial-progress bg-primary text-primary-content border-2 border-primary" style={{"--value":100,"--size":"2rem"}}>{createdCount}</div>
            </div>
            修改：{diffType[ChangeFlag.changed].length} 个

            <div>
                <button className={'btn btn-sm btn-outline btn-primary'}>导入</button>
            </div>
        </div>
    )
}
