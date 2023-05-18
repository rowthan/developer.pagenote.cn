import useVersionValid from '../../hooks/useVersionValid'
import CheckVersion from '../check/CheckVersion'

const label = {
  signin: '登录',
  signup: '注册',
  bind: '绑定',
}

const AUTH_LIST = [
  {
    label: 'GitHub授权',
    link: 'https://pagenote.cn/signin?auth=github',
  },
  {
    label: 'Notion授权',
    link: 'https://pagenote.cn/signin?auth=notion',
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
          <CheckVersion
            key={index}
            requireVersion={'0.24.0'}
            fallback={<div></div>}
          >
            <button
              onClick={() => {
                window.location.href = value.link
              }}
              className="bg-color-50 text-color-100 border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300"
            >
              {value.label}
            </button>
          </CheckVersion>
        ))}
      </>
    </div>
  )
}
