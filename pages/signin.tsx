import CheckVersion from "../components/check/CheckVersion";
import useUserInfo from "../hooks/useUserInfo";
import extApi from "@pagenote/shared/lib/pagenote-api";
import SignForm from "../components/account/sign/SignForm";
import BasicLayout from "../layouts/BasicLayout";
import ExtensionInfos from "../components/ExtensionInfos";
import AuthBottoms from "../components/account/AuthBottoms";
import Signin from "../components/account/Signin";

export default function SigninPage() {
    // const [user, mutation] = useUserInfo();

    // function signout() {
    //     extApi.user.signout().then(function () {
    //         mutation()
    //     })
    // }

    // function afterSign() {
    //     setTimeout(function () {
    //         mutation()
    //     },2000)
    // }

    return (
        <BasicLayout nav={false } title={'登录 PAGENOTE'} description={'登录 PAGENOTE 账号'}>
            <div className={'m-auto'}>
                <Signin />
            </div>
        </BasicLayout>

    )
}
