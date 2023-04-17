import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getWordInfo} from "../service";
import BasicLayout from "../layouts/BasicLayout";
import Loading from "../components/Loading";


export default function Post() {
    const [markdown, setMarkdown] = useState('');
    const {query} = useRouter();
    const id = query.id?.toString()
    useEffect(() => {
        if (!id) {
            return;
        }
        getWordInfo(id).then((res) => {
            if (res) {
                setMarkdown(res.markdown)
            }
        })
    }, [id])

    return (
        <BasicLayout title={'文章详情'} nav={false}>
            <div className={'max-w-4xl m-auto mt-10 p-10'}>
                {
                    markdown ? <mark-down css="/markdown.css">{markdown}</mark-down> :
                        <Loading/>
                }
            </div>
        </BasicLayout>
    )
}
