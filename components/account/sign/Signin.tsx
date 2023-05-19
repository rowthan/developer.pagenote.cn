import Link from 'next/link'
import AuthBottoms from '../AuthBottoms'
import SignForm from './SignForm'

export default function SigninPart() {
  return (
    <div className={'text-gray-500'}>
      <h2 className="text-2xl font-bold text-color-100">登录</h2>
      <p className="text-sm mt-4 text-color-100">已有账户啦，请登录</p>
      <SignForm />

      <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
        <hr className="border-gray-500" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-500" />
      </div>

      <AuthBottoms type={'signin'} />

      <div className="text-sm flex items-center mt-3">
        <p>还没有账户？...</p>
        <Link
          href={'/signup'}
          className="ml-3 link link-primary rounded-xl hover:scale-110 duration-300 "
        >
          注册
        </Link>
      </div>
    </div>
  )
}
