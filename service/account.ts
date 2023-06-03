import { NOTION_AUTH_CALLBACK } from 'site.config'
import { unionFetch } from '../utils/fetch'

/**请求登录*/
export function requestSignin(
  input: { uid?: number; email?: string },
  byExt: boolean
) {
  return unionFetch<{ sendSignInEmail?: { publicText: string } }>(
    {
      url: '/api/graph/auth',
      method: 'POST',
      data: {
        mutation: `mutation{sendSignInEmail(uid:${input.uid || 0},email:"${
          input.email || ''
        }"){publicText,validateStatus,}}`,
      },
    },
    byExt
  )
}

export function confirmValidate(
  input: { publicText: string; validateText: string },
  byExt: boolean
) {
  return unionFetch<{ confirmValidate?: { validateStatus?: number } }>(
    {
      url: '/api/graph/auth',
      method: 'POST',
      data: {
        mutation: `mutation{confirmValidate(publicText:"${input.publicText}",email:"${input.validateText}"){validateStatus}}`,
      },
    },
    byExt
  )
}

export function doSignInByValid(input: { publicText: string }, byExt: boolean) {
  return unionFetch<{ confirmValidate?: { validateStatus?: number } }>(
    {
      url: '/api/graph/auth',
      method: 'POST',
      data: {
        mutation: `mutation{doSignInByValid(publicText:"${input.publicText}"){pagenote_t}}`,
      },
    },
    byExt
  )
}

type AuthResponse = {
  pagenote_t: string
  profile: { nickname: string; email: string }
}

export function authCodeToToken(code: string, authType: string) {
  return unionFetch<{ oauth?: AuthResponse }>(
    {
      url: '/api/graph/auth',
      method: 'GET',
      data: {
        query: `{oauth(code:"${code}",platform:"${authType}",redirectUri:"${NOTION_AUTH_CALLBACK}"){pagenote_t,profile{nickname,email}}}`,
      },
    },
    false
  )
}