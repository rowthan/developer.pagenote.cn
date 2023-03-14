import {useForm} from "react-hook-form";
import {ReactElement, useEffect, useState} from "react";
import CommonForm from "components/CommonForm";
import useUserInfo from "../../hooks/useUserInfo";

enum SubmitState {
    unset = 0,
    loading = 1,
    success = 2,
    error = 3,
}

interface FormData {
    emailOrUid: string,
    password: string
}

const fields = [{
    type: "text",
    name: "nickname",
    options: {
        required: "请输入昵称",
    }
}, {
    type: "text",
    name: "other",
    options: {
        required: "请输入昵称",
    }
}]

export default function (props: { onSuccess?: () => void, onError?: () => void, children?: ReactElement }) {
    const [user] = useUserInfo();

    function onSubmit(data: FormData) {


    }


    return (
        <div>
            <CommonForm
                loading={false}
                value={user}
                fields={fields} onSubmit={onSubmit}/>
        </div>
    )
}
