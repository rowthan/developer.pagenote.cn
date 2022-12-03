import {useEffect} from "react";
import * as React from "react";
import CheckVersion from "../components/check/CheckVersion";
import {useRouter} from "next/router";
import NextLink from "next/link";


export default function Trash() {
    const router = useRouter();
    useEffect(function () {
        // 这个页面已经对外披露过了，但路由不能删，重定向至新的地址去
        router.replace('/manage/trash')
    }, [])


    return(
        <CheckVersion requireVersion={'0.23.8'}>
            <NextLink href={'/manage/trash'} />
        </CheckVersion>
    )
}
