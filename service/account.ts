import { NOTION_AUTH_CALLBACK } from 'site.config'
import { unionFetch } from '../utils/fetch'

/**请求登录*/
export function requestValidate(
  input: { uid?: number; email?: string; publicText?: string, validateType: string },
  byExt: boolean
) {
  const { uid = 0, email = '', publicText = '',validateType } = input
  return unionFetch<{ requestValidate?: { publicText: string } }>(
    {
      url: '/api/graph/auth',
      method: 'POST',
      data: {
        mutation: `mutation{requestValidate(uid:${uid || 0},email:"${email.trim()}",publicText:"${publicText.trim()}",validateType:"${validateType}"){publicText,validateStatus}}`,
      },
    },
    byExt
  )
}

export function confirmValidate(
  input: { publicText: string; validateText: string },
  byExt: boolean
) {
  const { publicText = '', validateText = '' } = input
  return unionFetch<{ confirmValidate?: { validateStatus?: number } }>(
    {
      url: '/api/graph/auth',
      method: 'POST',
      data: {
        mutation: `mutation{confirmValidate(publicText:"${publicText.trim()}",validateText:"${validateText.trim()}"){validateStatus}}`,
      },
    },
    byExt
  )
}

export function doSignInByValid(input: { publicText: string,validateText: string }, byExt: boolean) {
  const { publicText = '',validateText } = input
  return unionFetch<{ doSignInByValid?: { pagenote_t?: string } }>(
      {
          url: '/api/graph/auth',
          method: 'POST',
          data: {
              mutation: `mutation{doSignInByValid(publicText:"${publicText.trim()}",validateText:"${validateText}"){pagenote_t,profile{nickname,email,uid}}}`,
          },
      },
      byExt
  )
}


export function unBindAuth(input: {
    publicText: string,
    validateText: string,
    authType?: string,
    authId?: string,
}, byExt: boolean) {
    return unionFetch<{ unBindAuth?: { success?: boolean } }>(
        {
            url: '/api/graph/auth',
            method: 'POST',
            data: {
                mutation: `mutation make($authRequest: AuthRequest!) {unBindAuth(unbindRequest:$authRequest){success}}`,
                variables: {
                    authRequest: input
                },
            },
        },
        byExt
    )
}

type AuthResponse = {
    pagenote_t: string
    profile: { nickname: string; email: string }
}

export function authCodeToToken(
    code: string,
    authType: string,
    byExt: boolean
) {
  return unionFetch<{ oauth?: AuthResponse }>(
    {
        url: '/api/graph/auth',
        method: 'GET',
        data: {
            query: `{oauth(code:"${code?.trim()}",platform:"${authType}",authType:"${authType}",redirectUri:"${NOTION_AUTH_CALLBACK}"){pagenote_t,profile{nickname,email}}}`,
        },
    },
    byExt
  )
}
