import BasicLayout from '../layouts/BasicLayout'
import Signin from '../components/account/Signin'

export default function SigninPage() {
  return (
    <BasicLayout
      nav={false}
      title={'登录 PAGENOTE'}
      description={'登录 PAGENOTE 账号'}
    >
      <div className={'m-auto'}>
        <Signin />
      </div>
    </BasicLayout>
  )
}
