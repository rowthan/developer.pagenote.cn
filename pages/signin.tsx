import CheckVersion from "../components/check/CheckVersion";
import Head from "next/head";
import useUserInfo from "../hooks/useUserInfo";
import extApi from "@pagenote/shared/lib/generateApi";
import SignForm from "../components/SignForm";
import BasicLayout from "../layouts/BasicLayout";
import ExtensionInfos from "../components/ExtensionInfos";

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
        <BasicLayout nav={false } title={'登录'} description={'登录 PAGENOTE 账号'}>
            <CheckVersion requireVersion={'0.24.2'}>
                <div className={'m-auto max-w-md mt-20'}>
                    <Head>
                        <title>登录 PAGENOTE</title>
                    </Head>
                    {

                        user?.profile?.nickname ?
                            <div>
                                <div className='flex justify-center'>
                                    <span>已登录 <a href="https://pagenote.cn/account">{user.profile.nickname}</a></span>
                                    <button onClick={signout} className="btn btn-sm btn-outline btn-info">退出</button>
                                </div>
                                <ExtensionInfos />
                            </div> :
                            <SignForm onSuccess={afterSign} onError={afterSign}/>
                    }
                </div>
            </CheckVersion>
        </BasicLayout>

    )
}
