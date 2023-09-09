import { getDomain } from '@pagenote/shared/lib/utils/filter'
import useCurrentTab from 'hooks/useCurrentTab'
import useSettings from 'hooks/useSettings'
import { refreshTab } from 'utils/popup'
import useTabPagenoteState from 'hooks/useTabPagenoteState'

function checkDisabled(rule: string, url: string) {
  return rule === url || (rule.indexOf('*') > -1 && new RegExp(rule).test(url))
}

export default function DisableButton() {
  const { tab } = useCurrentTab()
  const [tabState] = useTabPagenoteState()
  const { data: setting, update } = useSettings()
  const disabledList = setting.disableList || []

  const url = tab?.url || ''
  const disabled =
    url &&
    disabledList.some(function (item) {
      return checkDisabled(item, url)
    })

  const set = new Set(disabledList)

  function add(url?: string) {
    if (!url) {
      return
    }
    set.add(url)
    const newList = Array.from(set)
    update(
      {
        disableList: newList,
      },
      function () {
        refreshTab(tab)
      }
    )
  }

  function remove(url?: string) {
    if (!url) {
      return
    }
    set.delete(url)
    const newList = Array.from(set)
    update(
      {
        disableList: newList,
      },
      function () {
        refreshTab(tab)
      }
    )
  }

  function enable() {
    const newList = Array.from(set)
    newList.forEach(function (item) {
      if (checkDisabled(item, url)) {
        set.delete(item)
      }
    })
    update(
      {
        disableList: Array.from(set),
      },
      function () {
        refreshTab(tab)
      }
    )
  }

  const disableDomain = url ? `${new URL(url).origin}/*` : ''
  return (
    <div className={'flex justify-end'}>
      <label
          htmlFor="disable-modal"
          className={` rounded btn btn-sm ${
              tabState?.active ? 'btn-primary text-white' : 'btn-outline'
          }`}
      >
        <img
          className={'bg-white rounded-lg'}
          src={tab?.favIconUrl || 'https://pagenote.cn/favicon.ico'}
          width={24}
          height={24}
          alt=""
        />
        <span className={'ml-2 tooltip'} data-tip={'点击修改禁用规则'}>
          {disabled ? (
            '已禁用标记功能'
          ) : (
            <span>{tabState?.active ? '已启用' : '未启用'}</span>
          )}
        </span>
      </label>
      <input type="checkbox" id="disable-modal" className="modal-toggle" />
      <label htmlFor="disable-modal" className="modal">
        <label htmlFor="" className="modal-box">
          <h3 className="font-bold text-lg"> PAGENOTE 禁用设置</h3>
          <table className="table table-compact w-full mt-2">
            <thead>
              <tr>
                <th>
                  <span
                    className={'tooltip'}
                    data-tip={'此配置是否对当前网页匹配'}
                  ></span>
                </th>
                <th>禁用网页</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{set.has(url) ? '🚫' : ''}</td>
                <td className={'text-xs'}>
                  {set.has(url) ? '该规则已生效' : '未添加该规则'}
                </td>
                <td colSpan={1} className={''}>
                  {url && (
                    <button
                      disabled={set.has(url)}
                      onClick={() => {
                        add(url)
                      }}
                      className={'btn btn-primary btn-xs '}
                    >
                      🚫<span>禁用当前网页</span>
                    </button>
                  )}
                </td>
              </tr>

              <tr>
                <td>{set.has(disableDomain) ? '🚫' : ''}</td>
                <td className={'text-xs'}>
                  {set.has(disableDomain) ? '该规则已生效' : '未添加该规则'}
                </td>
                <td colSpan={1} className={''}>
                  <button
                    disabled={set.has(disableDomain)}
                    onClick={() => {
                      add(disableDomain)
                    }}
                    className={'btn btn-warning btn-xs'}
                  >
                    🚫<span>禁用当前域名</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {set.has(disableDomain) || set.has(url) ? (
                    <div>
                      <span className={'text-gray-500'}>
                        当前标签页已被禁用
                      </span>
                    </div>
                  ) : (
                    <div>当前标签页未禁用</div>
                  )}
                </td>
                <td>
                  <button onClick={enable} className={'btn btn-info btn-xs'}>
                    <span>✅在此网站启用</span>
                  </button>
                </td>
              </tr>
              {disabledList.map((item, index) => (
                <tr key={item}>
                  <td className={''}>{checkDisabled(item, url) ? '🚫' : ''}</td>
                  <td
                    className={
                      'max-w-xl overflow-ellipsis whitespace-normal break-all'
                    }
                  >
                    {item}
                  </td>
                  <td>
                    <button
                      className={'btn btn-xs'}
                      onClick={() => {
                        remove(item)
                      }}
                    >
                      移除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </label>
      </label>
      {/*<SettingTip/>*/}
    </div>
  )
}
