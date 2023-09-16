import { NOTION_AUTH_CALLBACK } from 'site.config'
import { unionFetch } from '../utils/fetch'

/**请求登录*/
export function requestSignin(
  input: { uid?: number; email?: string; publicText?: string },
  byExt: boolean
) {
  const { uid = 0, email = '', publicText = '' } = input
  return unionFetch<{ sendSignInEmail?: { publicText: string } }>(
    {
      url: '/api/graph/auth',
      method: 'POST',
      data: {
        mutation: `mutation{sendSignInEmail(uid:${
          uid || 0
        },email:"${email.trim()}",publicText:"${publicText.trim()}"){publicText,validateStatus}}`,
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

export function doSignInByValid(input: { publicText: string }, byExt: boolean) {
  const { publicText = '' } = input
  return unionFetch<{ doSignInByValid?: { pagenote_t?: string } }>(
    {
      url: '/api/graph/auth',
      method: 'POST',
      data: {
        mutation: `mutation{doSignInByValid(publicText:"${publicText.trim()}"){pagenote_t,profile{nickname,email,uid}}}`,
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
