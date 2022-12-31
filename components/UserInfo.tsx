import useUserInfo from "../hooks/useUserInfo";
import SignForm from "./account/SignForm";
import MoreSvg from 'assets/svg/more.svg'
import extApi from "@pagenote/shared/lib/generateApi";


export default function () {
    const [user,fetch] = useUserInfo();
    function signout() {
        extApi.user.signout().then(function () {
            fetch()
        })
    }
    return (
        <div className={' w-80 m-auto'}>
            {
                user?.profile?.nickname ?
                    <div className={'flex justify-around py-2'}>
                        <div>
                            <div className={'text-sm'}>
                                Hi,
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <label tabIndex={0} className="m-1 link">
                                        <b className={'tooltip'} data-tip={user?.profile?.emailMask}>
                                            {user?.profile?.nickname}
                                        </b>
                                        <MoreSvg className={'inline fill-current dark:text-primary'} width={20} height={20} />
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content p-2 shadow  rounded-box">
                                        <li><button onClick={signout} className={'block '}>退出</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <img className={'rounded-full bg-white w-10 h-10'}  src="https://pagenote.cn/favicon.ico" alt=""/>
                    </div> :
                    <div className='my-20 '>
                        <SignForm></SignForm>
                    </div>
            }
        </div>
    )
}
