import useUserInfo from "../hooks/useUserInfo";
import SignForm from "./SignForm";


export default function () {
    const [user,fetch] = useUserInfo();
    return (
        <div className={'my-2 flex justify-center items-center'}>
            {
                user?.profile?.nickname ?
                    <div>
                        <div>
                            {/*@ts-ignore*/}
                            <b className={'badge badge-outline tooltip'} data-tip={user?.profile?.uid}>
                                {user?.profile?.nickname}
                            </b>
                        </div>
                    </div> :
                    <div className='my-20 '>
                        <SignForm onSuccess={fetch} onError={fetch}/>
                    </div>
            }
        </div>
    )
}
