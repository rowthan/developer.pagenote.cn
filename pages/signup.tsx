import CheckVersion from "../components/check/CheckVersion";
import BasicLayout from "../layouts/BasicLayout";
import SignUpForm from "../components/account/SignUpForm";

export default function () {
    return (
        <BasicLayout nav={false } title={'注册 PAGENOTE'} description={'注册一个 PAGENOTE 账号'}>
            <CheckVersion requireVersion={'0.24.2'}>
                <div className={'m-auto w-80 pt-20 min-h-screen'}>
                    <SignUpForm />
                </div>
            </CheckVersion>
        </BasicLayout>
    )
}
