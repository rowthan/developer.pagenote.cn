import { useForm } from 'react-hook-form'
import { ReactElement, useState } from 'react'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { toast } from '../../utils/toast'
import { useRouter } from 'next/router'
import useUserInfo from '../../hooks/useUserInfo'
import AuthBottoms from './AuthBottoms'
import { basePath } from '../../const/env'
import CheckVersion from 'components/check/CheckVersion'


enum SubmitState {
  unset = 0,
  loading = 1,
  success = 2,
  error = 3,
}

interface FormData {
  email: string
  joinCode: string
}

export default function SignUpForm() {
  const [state, setState] = useState<SubmitState>(SubmitState.unset)
  const [registerResult, setResult] = useState({
    emailServer: '',
    email: '',
  })
  const [user, mutation] = useUserInfo()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  function signout() {
    extApi.user.signout().then(function () {
      mutation()
    })
  }

  function onSubmit(data: FormData) {
    setState(SubmitState.loading)
    extApi.network
      .pagenote(
        {
          url: '/api/register',
          method: 'POST',
          data: data,
        },
        {
          timeout: 8000,
        }
      )
      .then(function (res) {
        if (res?.success && res.data && res.data.json.success) {
          setState(SubmitState.success)
          setResult(res.data.json.data)
        } else {
          if (res.status === 100) {
            return onSubmit(data)
          }
          toast('注册失败，请重试。' + res?.data?.json?.errors)
        }
        setState(SubmitState.unset)
      })
      .finally(function () {
        mutation()
      })
  }

  const signed = !!user?.profile?.nickname

  if (signed) {
    return (
      <div>
        你已经成功登录，请{' '}
        <a className={'link'} onClick={signout}>
          退出后
        </a>{' '}
        注册
      </div>
    )
  }

  const registerSuccess = !!registerResult.emailServer || !!registerResult.email
  if (registerSuccess) {
    return (
      <div className="alert shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">注册成功</h3>
            <div className="text-xs">
              登录密码已发送至你邮箱，请查收后{' '}
              <a className={'link'} href={`${basePath}/signin.html`}>
                登录
              </a>
            </div>
          </div>
        </div>
        <div className="flex-none">
          {registerResult?.emailServer && (
            <a href={registerResult.emailServer} className="btn btn-sm">
              查收邮件
            </a>
          )}
          <a
            className="btn btn-sm btn-primary"
            href={`https://pagenote.cn/signin`}
          >
            去登录
          </a>
        </div>
      </div>
    )
  }

  const loading = state === SubmitState.loading
  return (
    <form
      className="max-w-lg m-auto"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">邮箱</span>
          <span className="label-text-alt text-error">
            {errors.email && <p>请检查邮箱地址</p>}
          </span>
        </label>
        <input
          type="text"
          placeholder="你的email地址，需验证后使用"
          className="input input-bordered w-full"
          {...register('email', { required: true, pattern: /@/ })}
        />
      </div>
      {/*<div className="form-control w-full">*/}
      {/*  <label className="label">*/}
      {/*    <span className="label-text">受邀码</span>*/}
      {/*    <span className="label-text-alt text-error">*/}
      {/*      {errors.joinCode && <p>受邀码不正确，请检查后提交，或删除</p>}*/}
      {/*    </span>*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    placeholder="可选"*/}
      {/*    className="input input-bordered w-full"*/}
      {/*    {...register('joinCode', { maxLength: 8, minLength: 4 })}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className="flex justify-end mt-4 mb-10">
        <CheckVersion requireVersion='0.27.0' fallback={
          <button
            disabled
            className={`btn btn-sm btn-outline btn-info`}
            type="submit"
          >
            请 <a href="https://pagenote.cn/release">安装PAGENOTE</a> 0.25.0 以上版本后使用
          </button>
        }>
          <button
            disabled={loading}
            className={`btn btn-sm btn-outline btn-info ${
              loading ? 'loading' : ''
            }`}
            type="submit"
          >
            注册
          </button>
        </CheckVersion>
        
      </div>
      <AuthBottoms type="signup" />
    </form>
  )
}
