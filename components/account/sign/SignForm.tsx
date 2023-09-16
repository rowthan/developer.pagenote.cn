import { useForm } from 'react-hook-form'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import useUserInfo from '../../../hooks/useUserInfo'
import {
  confirmValidate,
  doSignInByValid,
  requestSignin,
} from '../../../service/account'
import useVersionValid from '../../../hooks/useVersionValid'
import dayjs from 'dayjs'
import useWhoAmi from '../../../hooks/useWhoAmi'
import { AwesomeButton } from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'
import CheckVersion from '../../check/CheckVersion'

enum SubmitState {
  unset = 0,
  loading = 1,
  success = 2,
  error = 3,
}

interface FormData {
  emailOrUid: string
  validateText: string
  publicText: string
}

const LAST_CACHE_EMAIL_KEY = 'last_signin_email'
const TOKEN_DURATION = 60 * 1000 * 10
export default function SignForm(props: { children?: ReactElement }) {
  const [state, setState] = useState<boolean>(false)
  const [user, refresh, update] = useUserInfo()
  const [tokenInfo, setTokenInfo] = useState({
    publicText: '',
    expiredAt: Date.now() + TOKEN_DURATION,
  })
  const [tip, setTip] = useState('')
  const [whoAmI] = useWhoAmi()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>()
  const { valid } = useVersionValid('0.26.4')

  function sendValidateText() {
    setTokenInfo({
      publicText: '',
      expiredAt: Date.now() + TOKEN_DURATION,
    })
    setTip('')
    setValue('validateText', '')
    let email = ''
    let uid = 0
    const data = getValues()
    if (/@/.test(data.emailOrUid)) {
      email = data.emailOrUid
    } else {
      uid = Number(data.emailOrUid)
    }
    setState(true)
    const newPublicText = `signin_request_${dayjs(new Date()).format(
      'YYYY-MM-DD-HH'
    )}_${whoAmI?.did}`
    localStorage.setItem(LAST_CACHE_EMAIL_KEY, `${email || uid || ''}`)
    requestSignin(
      {
        uid: uid,
        email: email,
        publicText: newPublicText,
      },
      valid
    )
      .then(function (res) {
        if (res?.success) {
          setTokenInfo({
            publicText: res.data?.sendSignInEmail?.publicText || '',
            expiredAt: Date.now() + TOKEN_DURATION,
          })
        } else {
          setTip(res?.error || '请求失败，请重试')
        }
      })
      .finally(function () {
        setState(false)
      })
  }

  function doSignin() {
    const { validateText } = getValues()
    setTip('')
    setState(true)
    confirmValidate(
      {
        publicText: tokenInfo.publicText,
        validateText: validateText,
      },
      valid
    ).then(function (res) {
      console.log(res, '确认登录凭证')
      if (res?.data?.confirmValidate?.validateStatus) {
        setState(true)
        console.log('获取 身份 token', tokenInfo)
        doSignInByValid(
          {
            publicText: tokenInfo.publicText,
          },
          valid
        )
          .then(function (signRes) {
            const token = signRes?.data?.doSignInByValid?.pagenote_t
            console.log('登录结果', token, signRes)
            if (token) {
              update(token)
            }
            if (signRes.error) {
              setTip(signRes.error)
            }
          })
          .finally(() => {
            setState(false)
          })
      } else {
        setTip(res?.error || '登录凭证错误❌')
        setState(false)
      }
    })
  }

  const onSubmit = useCallback(() => {
    console.log(tokenInfo, 'submit', getValues())
    if (!tokenInfo.publicText || tokenInfo.expiredAt < Date.now()) {
      sendValidateText()
    } else {
      doSignin()
    }
  }, [tokenInfo])

  useEffect(function () {
    const search = new URLSearchParams(window.location.search)
    const uid = search.get('uid')
    const lastEmail = localStorage.getItem(LAST_CACHE_EMAIL_KEY)
    setValue('emailOrUid', uid || lastEmail || '')
  }, [])

  const publicTextValid = !!(
    tokenInfo.publicText && tokenInfo.expiredAt > Date.now()
  )
  return (
    <form
      className="flex flex-col gap-4 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className="p-2 m-5 mb-1 rounded-xl border w-full"
        {...register('emailOrUid', { required: true })}
        placeholder="你的 Email 或用户 ID"
      />
      {publicTextValid && (
        <>
          <div>
            <div>
              <div>
                登录请求
                <span className={'text-xs text-gray-300'}>
                  ({tokenInfo.publicText})
                </span>
              </div>
              <div>
                <span>凭证已发送至你的邮箱，请查收</span>
                <button
                  type={'button'}
                  className={'btn btn-ghost btn-xs btn-outline ml-2'}
                  onClick={sendValidateText}
                >
                  重新发送
                </button>
              </div>
            </div>
          </div>
          <input
            autoFocus={true}
            type="text"
            className="w-full p-2 rounded-xl border"
            {...register('validateText', { required: true })}
            placeholder={`从邮箱中获取 一次性登录凭证`}
          />
        </>
      )}

      <div>
        <AwesomeButton disabled={state} type="primary" size="medium">
          {publicTextValid ? '验证' : '请求登录/注册'}
        </AwesomeButton>
      </div>

      <div className={'text-error text-sm'}>{tip}</div>
    </form>
  )
}
