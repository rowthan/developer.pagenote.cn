import useUserInfo from "../hooks/useUserInfo";
import SignForm from "./SignForm";


export default function () {
    const [user,fetch] = useUserInfo();
    return (
        <div className={'my-2'}>
            {
                user?.profile?.nickname ?
                    <div>
                        <div>
                            <b>{user?.profile?.nickname}({user?.profile?.emailMask})</b>
                        </div>
                    </div> :
                    <div className='my-20 flex justify-center items-center'>
                        <SignForm onSuccess={fetch} onError={fetch}/>
                    </div>
            }
        </div>
    )
}
