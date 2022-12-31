import CheckVersion from "../components/check/CheckVersion";
import useUserInfo from "../hooks/useUserInfo";
import extApi from "@pagenote/shared/lib/generateApi";
import SignForm from "../components/account/SignForm";
import BasicLayout from "../layouts/BasicLayout";
import ExtensionInfos from "../components/ExtensionInfos";
import AuthBottoms from "../components/account/AuthBottoms";

export default function () {
    const [user, mutation] = useUserInfo();

    function signout() {
        extApi.user.signout().then(function () {
            mutation()
        })
    }

    function afterSign() {
        setTimeout(function () {
            mutation()
        },2000)
    }

    return (
        <BasicLayout nav={false } title={'登录 PAGENOTE'} description={'登录 PAGENOTE 账号'}>
            <CheckVersion requireVersion={'0.24.2'}>
                <div className={'m-auto w-80 mt-20 min-h-screen'}>
                    <SignForm onSuccess={afterSign} onError={afterSign}>
                        <div>
                            <div className='flex justify-center'>
                                <span>已登录 <a href="https://pagenote.cn/account">{user?.profile?.nickname}</a></span>
                                <button onClick={signout} className="btn btn-sm btn-outline btn-info">退出</button>
                            </div>
                        </div>
                    </SignForm>
                </div>
            </CheckVersion>
        </BasicLayout>

    )
}
