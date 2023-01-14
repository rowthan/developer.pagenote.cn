import useUserInfo from "../hooks/useUserInfo";
import SignForm from "./account/SignForm";
import MoreSvg from 'assets/svg/more.svg'
import extApi from "@pagenote/shared/lib/generateApi";
import UserCard from "./account/UserCard";


export default function () {
    const [user,fetch] = useUserInfo();
    function signout() {
        extApi.user.signout().then(function () {
            fetch()
        })
    }
    return (
        <div className={'w-96 m-auto my-10'}>
            {
                user?.profile?.nickname ?
                    <UserCard />:
                    <div className=''>
                        <SignForm></SignForm>
                    </div>
            }
        </div>
    )
}
