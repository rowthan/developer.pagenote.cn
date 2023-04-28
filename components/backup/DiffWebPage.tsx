import { WebPage } from "@pagenote/shared/lib/@types/data"

interface DiffWebPageProps {
    pages: Partial<WebPage>[]
}
export default function DiffWebPage(props: DiffWebPageProps) {
    const {pages} = props;

    return(
        <div>
            <h3>网页Diff</h3>
        </div>
    )
}