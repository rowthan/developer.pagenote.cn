import AuthBottoms from '../AuthBottoms'
import SignForm from './SignForm'

export default function SigninPart() {
  return (
    <div className={'text-gray-500 m-1'}>
      <h2 className="text-2xl font-bold text-color-100">登录/注册 PAGENOTE</h2>
      <SignForm />

      <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
        <hr className="border-gray-500" />
        <p className="text-center text-sm">通过第三方授权登录</p>
        <hr className="border-gray-500" />
      </div>

      <AuthBottoms type={'signin'} />

      <div className="text-sm mt-10">
        <a target="_blank" href="/privacy" className="link link-primary">
          隐私协议
        </a>
      </div>
    </div>
  )
}
