import {useForm} from "react-hook-form";
import {ReactElement, useState} from "react";
import extApi from "@pagenote/shared/lib/generateApi";
import {toast} from "../../utils/toast";
import { useRouter } from "next/router";
import useUserInfo from "../../hooks/useUserInfo";
import AuthBottoms from "./AuthBottoms";

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


export default function (props:{onSuccess?:()=>void, onError?:()=>void,children?: ReactElement}) {
    const {onError,onSuccess} = props;
    const [state, setState] = useState<SubmitState>(SubmitState.unset);
    const [user, mutation] = useUserInfo();
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
                onSuccess && onSuccess();
            }else{
                if(res.status === 100){
                    return onSubmit(data)
                }
                onError && onError();
                toast('登录失败，请重试')
            }
            setState(SubmitState.unset)
        }).finally(function () {
            mutation()
        })
    }

    function signinout() {
        extApi.user.signout().then(function () {
            mutation()
        })
    }

    const signed = !!user?.profile?.nickname;

    return (
        signed? <div>
                {props.children ? props.children :
                    <div>
                        <div className="alert shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <div>
                                    <h3 className="font-bold">你已成功登录</h3>
                                    <div className="text-xs">{user?.profile?.nickname}</div>
                                </div>
                            </div>
                            <div className="flex-none">
                                <button className="btn btn-sm" onClick={signinout}>退出登录</button>
                            </div>
                        </div>
                    </div>
                }
            </div> :
        <form className='max-w-lg m-auto' onSubmit={handleSubmit((data) => onSubmit(data))}>
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
            <div className='flex justify-end mt-4 mb-10'>
                <button className={`btn btn-sm btn-outline btn-info ${state === SubmitState.loading ? 'loading' : ''}`}
                        type="submit">
                    登录
                </button>
            </div>
            <AuthBottoms type='signin' />
        </form>
    )
}
