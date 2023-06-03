import { useForm } from 'react-hook-form'
import { ReactElement, useEffect, useState } from 'react'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useUserInfo from '../../../hooks/useUserInfo'
import CheckVersion from 'components/check/CheckVersion'
import { requestSignin } from '../../../service/account'
import useVersionValid from '../../../hooks/useVersionValid'

enum SubmitState {
  unset = 0,
  loading = 1,
  success = 2,
  error = 3,
}

interface FormData {
  emailOrUid: string
  validateText: string
}

export default function SignForm(props: { children?: ReactElement }) {
  const [state, setState] = useState<SubmitState>(SubmitState.unset)
  const [user, mutation] = useUserInfo()
  const [publicText, setPublicText] = useState('')
  const [tip, setTip] = useState('')
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const { valid } = useVersionValid('0.26.4')

  function onSubmit(data: FormData) {
    let email = ''
    let uid = 0
    if (/@/.test(data.emailOrUid)) {
      email = data.emailOrUid
    } else {
      uid = Number(data.emailOrUid)
    }

    if (!publicText) {
      requestSignin(
        {
          uid: uid,
          email: email,
        },
        valid
      ).then(function (res) {
        if (res.success) {
          setPublicText(res.data?.sendSignInEmail?.publicText || '')
        }
      })
      return
    } else {
    }

    setTip('')
    setState(SubmitState.loading)

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
        } else {
          if (res?.status === 100) {
            return onSubmit(data)
          }
          setTip(res?.error || '登录失败，请重试')
        }
        setState(SubmitState.unset)
      })
      .finally(function () {
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
        placeholder="你的 Email 或用户 ID"
      />
      {publicText && (
        <div className="relative">
          <input
            type="password"
            className="w-full p-2 rounded-xl border"
            {...register('validateText', { required: true })}
            placeholder="登录凭证"
          />
        </div>
      )}

      <button
        className={`bg-[#002074] rounded-xl py-2 text-white max-w-full px-10  hover:scale-105 duration-300 btn btn-sm ${
          state === SubmitState.loading ? 'loading' : ''
        }`}
        type={'submit'}
      >
        {publicText ? '请求登录' : '登录验证'}
      </button>

      <div className={'text-error text-sm'}>{tip}</div>
      {/*<div className=" text-xs border-b">*/}
      {/*  <a href="https://pagenote.cn/reset_password">忘记密码？..</a>*/}
      {/*</div>*/}
    </form>
  )
}
