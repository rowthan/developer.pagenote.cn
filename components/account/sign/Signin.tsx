import AuthBottoms from "../AuthBottoms";
import SignForm from "./SignForm";

export default function SigninPart() {
    return(
        <div className={'text-gray-500'}>
            <h2 className="text-2xl font-bold text-[#002D74]">登录/注册</h2>
            <SignForm />

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500"/>
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500"/>
            </div>

            <AuthBottoms type={'signin'} />
            {/*<div className="text-sm flex justify-between items-center mt-3">*/}
            {/*    <p>还没有账户？...</p>*/}
            {/*    <a href={'/signup.html'}*/}
            {/*        className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400 ">注册*/}
            {/*    </a>*/}
            {/*</div>*/}
        </div>
    )
}
