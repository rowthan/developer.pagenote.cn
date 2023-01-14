

const label = {
    'signin': '登录',
    'signup': "注册",
    "bind": "绑定"
}

const AUTH_LIST = [{
    label:"GitHub授权",
    link: 'https://pagenote.cn/signin?auth=github'
},{
    label:"Notion授权",
    link: 'https://pagenote.cn/signin?auth=notion'
}]
export default function AuthBottoms(props: { type: 'signin' | 'signup' | 'bind' }) {
    const {type} = props;
    const actionName = label[type]
    const isSignin = type === 'signin'
    const isSignup = type === 'signup'
    return (
        <div>
            {
                !isSignup &&
                <>
                    {
                        AUTH_LIST.map((value, index, array)=>(
                            <button
                                className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
                                {value.label}
                            </button>
                        ))
                    }
                </>
            }
        </div>
    )
}
