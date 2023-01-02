import {basePath} from "../../const/env";

const GITHUB_SIGN_URL = 'https://pagenote.cn/signin?auth=github'
const NOTION_SIGN_URL = 'https://pagenote.cn/signin?auth=notion'

const label = {
    'signin': '登录',
    'signup': "注册",
    "bind": "绑定"
}
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
                    <a className={'btn btn-sm block flex my-2'} href={GITHUB_SIGN_URL} target='_blank'>
                        <div>
                            GitHub授权{actionName}
                        </div>
                    </a>
                    <a className={'btn btn-sm btn-primary block flex my-2'} href={NOTION_SIGN_URL}
                       target='_blank'>Notion授权{actionName}</a>
                </>
            }

            <div className={'mt-10'}>
                {
                    isSignin &&
                        <a className={'btn btn-sm btn-secondary block flex my-2'}
                           href={`${basePath}/signup.html`}>还没账号，前往注册</a>
                }
                {
                    isSignup &&
                    <a className={'btn btn-sm btn-secondary block flex my-2'}
                       href={`${basePath}/signin.html`}>已有账号，前往登录</a>
                }
            </div>
        </div>
    )
}
