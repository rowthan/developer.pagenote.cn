import SigninPart from './sign/Signin'
import useUserInfo from '../../hooks/useUserInfo'
import {useEffect} from 'react'
import AuthList from "./AuthList";

export default function Signin() {
    const [user] = useUserInfo()

    const signed = !!user?.profile?.nickname

    if (signed) {
        return <div className={'m-auto pt-20 max-w-lg'}>
            <AuthList/>
        </div>
    }

    return (
        <section className="border-red-500  min-h-fill flex items-center justify-center">
            <div className="border p-5 m-2  rounded-2xl shadow-lg min-w-[300px] max-w-3xl items-center">
                <div className=" px-5">
                    <SigninPart/>
                </div>
            </div>
        </section>
    )
}
