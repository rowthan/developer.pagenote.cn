import * as React from "react";
import CheckVersion from "../../components/check/CheckVersion";
import BasicLayout from "../../layouts/BasicLayout";
import ClipboardList from "../../components/manage/ClipboardList";


export default function ClipboardPage() {
    return (
        <CheckVersion requireVersion={'0.23.8'}>
            <BasicLayout title='剪切板管理' description='你的剪切板历史'>
                <ClipboardList />
            </BasicLayout>
        </CheckVersion>
    )
}
