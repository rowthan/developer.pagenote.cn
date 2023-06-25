import { type ReactNode } from 'react'
import MoreSvg from '../../assets/svg/more.svg'
import useUserInfo from '../../hooks/useUserInfo'
import extApi from '@pagenote/shared/lib/pagenote-api'

interface Props {
  children?: ReactNode
}

export default function UserName(props: Props) {
  const { children } = props
  const [userInfo, mutate] = useUserInfo()

  function signout() {
    extApi.user.signout(undefined).then(function () {
      mutate()
    })
  }

  function toSignin() {
    window.open('https://pagenote.cn/signin')
    extApi.user.getUser(
      { refresh: true },
      {
        scheduleControl: {
          runAfterMillisecond: [20 * 1000],
        },
      }
    )
  }

  return (
    <div className={'flex items-center'}>
      <a
        target="_blank"
        className="mr-2"
        href="https://developer.pagenote.cn/account"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`rounded-full overflow-hidden`}
          width={24}
          height={24}
          src={userInfo?.profile?.avatar || 'https://pagenote.cn/favicon.ico'}
          alt={userInfo?.profile?.nickname || '请登录'}
        />
      </a>
      {userInfo?.profile?.nickname ? (
        <>
          <div className="dropdown dropdown-right text-sm">
            <label tabIndex={0} className="my-1 link">
              <span className={''}>{userInfo?.profile?.nickname}</span>
              <MoreSvg
                className={'inline fill-current dark:text-primary'}
                width={20}
                height={20}
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content py-2 shadow bg-neutral text-sm rounded w-20"
            >
              <li className={'hover:bg-accent px-1'}>
                <button
                  className={'block w-full text-base-100'}
                  onClick={signout}
                >
                  退出
                </button>
              </li>
              {/*<li className={'hover:bg-accent px-1'}><button onClick={signout}>编辑资料</button></li>*/}
            </ul>
          </div>
        </>
      ) : (
        <button onClick={toSignin} className={'btn btn-ghost btn-sm'}>
          登录
        </button>
      )}
    </div>
  )
}

UserName.defaultProps = {}
