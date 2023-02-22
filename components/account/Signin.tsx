import SigninPart from "./sign/Signin";
import useUserInfo from "../../hooks/useUserInfo";
import UserCard from "./UserCard";

export default function Signin() {
    const [user, mutation] = useUserInfo();

    const signed = !!user?.profile?.nickname

    return(
        <section className="border-red-500 bg-base-50 min-h-fill flex items-center justify-center">
            <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl items-center">
                {
                    signed ? <div>
                        <h3>已登录</h3>
                        <UserCard />
                    </div>: <SigninPart />
                }
                {/*<div className="md:w-1/2 px-5">*/}
                {/*    */}
                {/*</div>*/}


                {/*<div className="w-1/2 md:block hidden ">*/}
                {/*    <img*/}
                {/*        src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"*/}
                {/*        className="rounded-2xl" alt="page img"/>*/}
                {/*</div>*/}
            </div>
        </section>
    )
}
