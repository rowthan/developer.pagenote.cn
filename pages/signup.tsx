import BasicLayout from '../layouts/BasicLayout'
import SignUpForm from '../components/account/SignUpForm'

export default function Signup() {
  return (
    <BasicLayout
      nav={false}
      title={'注册 PAGENOTE'}
      description={'注册一个 PAGENOTE 账号'}
    >
      <div className={'m-auto max-w-lg pt-20 min-h-fill'}>
        <SignUpForm />
        <div className={'text-sm mt-6'}>
          <div>
            已有账号，
            <a
              className={'link link-primary'}
              href="https://pagenote.cn/signin"
            >
              前往登录
            </a>
          </div>
          <ul className={'text-color-500 mt-6'}>
            <li>
              <p>❌ 登录不是必须的：不登录也可以使用PAGENOTE</p>
            </li>
            <li>
              <b>❌ 登录不能同步笔记数据</b>： 服务器不会存储你的笔记数据。
            </li>
            <li>⚠️ 同步功能开发中</li>
            <li>✅ 登录可以确定你的身份：如果你已赞助，请务必登录。</li>
            <li>✅ 登录后可以领取福利</li>
          </ul>
        </div>
      </div>
    </BasicLayout>
  )
}
