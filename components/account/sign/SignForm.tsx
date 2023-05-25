import { useForm } from 'react-hook-form'
import { ReactElement, useEffect, useState } from 'react'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { toast } from '../../../utils/toast'
import { useRouter } from 'next/router'
import useUserInfo from '../../../hooks/useUserInfo'
import AuthBottoms from '../AuthBottoms'
import CheckVersion from 'components/check/CheckVersion'


enum SubmitState {
  unset = 0,
  loading = 1,
  success = 2,
  error = 3,
}

interface FormData {
  emailOrUid: string
  password: string
}

export default function SignForm(props: {
  onSuccess?: () => void
  onError?: () => void
  children?: ReactElement
}) {
  const { onError, onSuccess } = props
  const [state, setState] = useState<SubmitState>(SubmitState.unset)
  const [user, mutation] = useUserInfo()
  const [tip, setTip] = useState('')
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  function onSubmit(data: FormData) {
    setTip('')
    setState(SubmitState.loading)
    let email = ''
    let uid = 0
    if (/@/.test(data.emailOrUid)) {
      email = data.emailOrUid
    } else {
      uid = Number(data.emailOrUid)
    }
    extApi.user
      .signin(
        {
          password: data.password,
          token: '',
          uid: uid,
          email: email,
        },
        {
          timeout: 8000,
        }
      )
      .then(function (res) {
        console.log(res, '登录结果')
        if (res?.success && res.data) {
          setState(SubmitState.success)
          onSuccess && onSuccess()
        } else {
          if (res?.status === 100) {
            return onSubmit(data)
          }
          onError && onError()
          setTip(res?.error || '登录失败，请重试')
        }
        setState(SubmitState.unset)
      })
      .finally(function () {
        mutation()
      })
  }

  function signinout() {
    extApi.user.signout().then(function () {
      mutation()
    })
  }

  useEffect(function () {
    const search = new URLSearchParams(window.location.search)
    const uid = search.get('uid')
    if (uid) {
      setValue('emailOrUid', uid)
    }
  }, [])

  return (
    <form
      className="flex flex-col gap-4 items-center"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <input
        type="text"
        className="p-2 m-5 mb-1 rounded-xl border"
        {...register('emailOrUid', { required: true })}
        placeholder="email 或用户ID"
      />
      <div className="relative">
        <input
          type="password"
          className="w-full p-2 rounded-xl border"
          {...register('password', { required: true })}
          placeholder="密码"
        />
      </div>
      <CheckVersion
        requireVersion="0.26.0"
        fallback={
          <button className="btn btn-sm" disabled>
            此功能需要你安装PAGENOTE 0.26.0以上版本后使用
          </button>
        }
      >
        <button
          className={`bg-[#002074] rounded-xl py-2 text-white max-w-full px-10  hover:scale-105 duration-300 btn btn-sm ${
            state === SubmitState.loading ? 'loading' : ''
          }`}
        >
          登录
        </button>
      </CheckVersion>

      <div className={'text-error text-sm'}>{tip}</div>
      <div className=" text-xs border-b">
        <a href="https://pagenote.cn/reset_password">忘记密码？..</a>
      </div>
    </form>
  )
}
