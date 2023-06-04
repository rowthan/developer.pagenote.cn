import { useForm } from 'react-hook-form'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useUserInfo from '../../../hooks/useUserInfo'
import CheckVersion from 'components/check/CheckVersion'
import {
  confirmValidate,
  doSignInByValid,
  requestSignin,
} from '../../../service/account'
import useVersionValid from '../../../hooks/useVersionValid'
import dayjs from 'dayjs'
import useWhoAmi from '../../../hooks/useWhoAmi'

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

export default function SignForm(props: { children?: ReactElement }) {
  const [state, setState] = useState<boolean>(false)
  const [user, refresh, update] = useUserInfo()
  const [publicText, setPublicText] = useState('')
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
    setPublicText('')
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
    requestSignin(
      {
        uid: uid,
        email: email,
        publicText: newPublicText,
      },
      false
    )
      .then(function (res) {
        if (res.success) {
          setPublicText(res.data?.sendSignInEmail?.publicText || '')
        } else {
          setTip(res.error || '请求失败，请重试')
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
        publicText: publicText,
        validateText: validateText,
      },
      false
    ).then(function (res) {
      console.log(res, '确认登录凭证')
      if (res?.data?.confirmValidate?.validateStatus) {
        setState(true)
        console.log('获取 身份 token', publicText)
        doSignInByValid(
          {
            publicText: publicText,
          },
          false
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
    console.log(publicText, 'submit', getValues())
    if (!publicText) {
      sendValidateText()
    } else {
      doSignin()
    }
  }, [publicText])

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
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className="p-2 m-5 mb-1 rounded-xl border w-full"
        {...register('emailOrUid', { required: true })}
        placeholder="你的 Email 或用户 ID"
      />
      {publicText && (
        <>
          <div>
            <div>
              <div>
                登录请求
                <span className={'text-xs text-gray-300'}>({publicText})</span>
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
            placeholder={`一次性登录凭证`}
          />
        </>
      )}

      <div>
        <button
          disabled={state}
          className={`bg-[#002074] rounded-xl py-2 text-white max-w-full px-10  hover:scale-105 duration-300 btn btn-sm ${
            state ? 'loading' : ''
          }`}
          type={'submit'}
        >
          {publicText ? '登录验证' : '请求登录'}
        </button>
      </div>

      <div className={'text-error text-sm'}>{tip}</div>
    </form>
  )
}
