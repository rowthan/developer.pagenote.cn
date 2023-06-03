import SigninPart from './sign/Signin'
import useUserInfo from '../../hooks/useUserInfo'
import UserCard from './UserCard'

export default function Signin() {
  const [user, mutation] = useUserInfo()

  const signed = !!user?.profile?.nickname

  return (
    <section className="border-red-500  min-h-fill flex items-center justify-center">
      <div className="bg-color-100 p-5  rounded-2xl shadow-lg min-w-[400px] max-w-3xl items-center">
        <div className=" px-5">
          {signed ? (
            <div>
              <h3>已登录</h3>
              <UserCard />
            </div>
          ) : (
            <SigninPart />
          )}
        </div>
      </div>
    </section>
  )
}
