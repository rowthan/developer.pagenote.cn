import { GITHUB_AUTH_CALLBACK, NOTION_AUTH_CALLBACK } from 'site.config'

const label = {
  signin: '登录',
  signup: '注册',
  bind: '绑定',
}

export const AUTH_LIST = [
  {
    label: 'GitHub授权',
    link: `https://github.com/login/oauth/authorize?scope=user%20repo&client_id=Iv1.fbdc49e54f75d9af&allow_signup=true&redirect_uri=${GITHUB_AUTH_CALLBACK}`,
  },
  {
    label: 'Notion授权',
    link: `https://api.notion.com/v1/oauth/authorize?client_id=3f5182ae-a3a4-46b1-8e17-b1e9f2c7e37a&response_type=code&owner=user&redirect_uri=${NOTION_AUTH_CALLBACK}`,
  },
]
export default function AuthBottoms(props: {
  type: 'signin' | 'signup' | 'bind'
}) {
  const { type } = props
  const actionName = label[type]
  const isSignin = type === 'signin'
  const isSignup = type === 'signup'
  return (
    <div>
      <>
        {AUTH_LIST.map((value, index) => (
          <button
            key={index}
            onClick={() => {
              window.location.href = value.link
            }}
            className="bg-color-50 text-color-100 border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300"
          >
            {value.label}
          </button>
        ))}
      </>
    </div>
  )
}
