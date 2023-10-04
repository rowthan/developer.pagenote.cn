import {type ReactNode, useEffect, useState} from 'react';
import Tiptap, {EditorChangeContent} from "../editor/TipTap";
import {Note} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/pagenote-api";
import md5 from "md5";

interface Props {
    children?: ReactNode;
    url: string
}
const defaultNotes = [{
    key: md5(Date.now() + window.location.href )
}]

const TABLE = {
    table:'note',
    db: 'lightpage',
}
function getPath(url: string) {
    if(!url){
        return ''
    }
    const urlObject = new URL(url);
    return urlObject.origin + urlObject.pathname
}

export default function PageMemo(props: Props) {
    const {url} = props;
    const [notes,setNotes] = useState<Note[]>([])
    const path = getPath(url||"")
    function fetchMemos() {
        const query = {
            path: path,
        }
        extApi.table.query({
            ...TABLE,
            params:{
                // @ts-ignore
                query: query,
                limit: 1,
                sort:{
                    createAt: -1
                }
            }
        }).then(function (res) {
            const newNotes = res.data.list.length ? res.data.list : defaultNotes
            setNotes((newNotes) as Note[])
        })
    }

    useEffect(function () {
        fetchMemos()
    },[url])

    const onUpdate= function (change:EditorChangeContent,key: string) {
        console.log(change.htmlContent)

        const note: Note = {
            createAt: 0,
            deleted: false,
            hash: "",
            key: key,
            // @ts-ignore
            relatedType: 'path',
            path: path,

            updateAt: Date.now(),
            plainType: "html",
            // @ts-ignore
            tiptap: change.jsonContent,
            html: change.htmlContent || ''
        }
        extApi.table.put({
           ...TABLE,
            params: [note]
        }).then(function (res) {
            fetchMemos();
        })
    }

    return (
        <div className="mt-3 rounded min-h-10 border border-accent text-sm">
            {
                notes.map((item)=>(
                    <div key={item.key} className={'min-h-[40px] max-h-[340px] overflow-auto'}>
                        <Tiptap htmlContent={item.html||''} onUpdate={(data)=>{onUpdate(data,item.key)}}/>
                    </div>
                ))
            }
        </div>
    );
}

PageMemo.defaultProps = {}
