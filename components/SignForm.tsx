import {useForm} from "react-hook-form";
import {useState} from "react";
import extApi from "@pagenote/shared/lib/generateApi";
import {toast} from "../utils/toast";

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

export default function (props:{onSuccess:()=>void, onError:()=>void}) {
    const [state, setState] = useState<SubmitState>(SubmitState.unset);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();


    function onSubmit(data: FormData) {
        setState(SubmitState.loading)
        let email = '';
        let uid = 0;
        if(/@/.test(data.emailOrUid)){
            email = data.emailOrUid
        }else{
            uid = Number(data.emailOrUid)
        }
        extApi.user.signin({
            password: data.password,
            token: "",
            uid: uid,
            email: email
        },{
            timeout: 8000
        }).then(function (res) {
            console.log(res,'登录结果')
            if(res?.success && res.data){
                setState(SubmitState.success);
                props.onSuccess();
            }else{
                if(res.status === 100){
                    return onSubmit(data)
                }
                props.onError();
                toast('登录失败，请重试')
            }
            setState(SubmitState.unset)
        })
    }


    return (
        <form className='max-w-xs m-auto' onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">邮箱地址或ID</span>
                    <span className="label-text-alt text-error">
                        {errors.emailOrUid && <p>请检查账号</p>}
                    </span>
                </label>
                <input type="text"
                       placeholder="账号"
                       className="input input-bordered w-full"
                       {...register('emailOrUid', {required: true})}
                />
            </div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">密码</span>
                    <span className="label-text-alt text-error">
                       {errors.password && <p>请输入密码</p>}
                    </span>
                </label>
                <input type="password"
                       placeholder="密码"
                       className="input input-bordered w-full"
                       {...register('password', {required: true})}
                />
            </div>
            <div className='flex justify-end mt-10'>
                <button className={`btn btn-sm btn-outline btn-info ${state === SubmitState.loading ? 'loading' : ''}`}
                        type="submit">
                    登录
                </button>
            </div>
        </form>
    )
}
