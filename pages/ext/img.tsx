import {useRouter} from "next/router";
import useTableQuery from "hooks/useTableQuery";
import {SnapshotResource} from "@pagenote/shared/lib/@types/data";
import RedirectToExt from "../../components/RedirectToExt";
import Empty from "../../components/Empty";

export default function Img() {
    const router = useRouter();
    const images = useTableQuery<SnapshotResource>('lightpage', 'snapshot', {
        limit: 1,
        query: {
            key: router.query.id?.toString() || '',
        }
    })

    return (
        <RedirectToExt>
            <>
                {
                    images.map((item) => (
                        <img key={item.key} src={item.uri || item.url} alt={item.alt}/>
                    ))
                }
                {
                    images.length === 0 ?
                        <Empty>
                            没有发现图片资源
                        </Empty> : null
                }
            </>
        </RedirectToExt>
    );
}

Img.defaultProps = {}
