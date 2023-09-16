import useAuthList, {authMap} from '../../hooks/useAuthList'
import Modal from 'components/Modal'
import AuthBottoms from "./AuthBottoms";

export default function AuthList() {
  const [authList = [], fetch] = useAuthList();

  function showUnbindModal(type: string) {

  }

  return (
      <div>
        <div
            className="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="w-full px-4 py-5 border-b sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              授权管理
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
              通过第三方平台一键登录 PAGENOTE
            </p>
          </div>
          <ul className="divide-y divide w-full">
            {authList.filter(function (item) {
              return item.authType !== 'email'
            }).map((item, index) => (
                <li key={index} className="flex justify-between items-center px-4 ">
                  <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                    <img
                        alt="profil"
                        src={authMap[item.authType]?.platformIcon}
                        className="mx-auto object-cover rounded-full h-6 w-6 bg-white"
                    />
                  </div>
                  <div className="flex text-xs text-gray-600 dark:text-gray-200">
                    {item.authName ? (
                        <button className={'tooltip '} data-tip={item.authType}>
                          {item.authName}
                        </button>
                    ) : (
                        <a className={'btn btn-outline btn-xs'} href={item.bindUrl}>
                          未绑定
                        </a>
                    )}
                    {
                        item.authAvatar &&
                        <img
                            alt="profil"
                            src={item.authAvatar}
                            className="mx-auto ml-1 object-cover rounded-full h-6 w-6 bg-white"
                        />
                    }
                  </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
