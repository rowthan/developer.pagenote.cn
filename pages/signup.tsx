import BasicLayout from '../layouts/BasicLayout'
import Signin from '../components/account/Signin'

export default function SigninPage() {
  return (
    <BasicLayout
      nav={false}
      title={'注册 PAGENOTE'}
      description={'注册 PAGENOTE 账号'}
    >
      <div className={'m-auto'}>
        <Signin />
      </div>
    </BasicLayout>
  )
}
