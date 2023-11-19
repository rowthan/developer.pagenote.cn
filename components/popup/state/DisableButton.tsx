import useCurrentTab from 'hooks/useCurrentTab'
import useSettings from 'hooks/useSettings'
import { refreshTab } from 'utils/popup'
import useTabPagenoteState from 'hooks/useTabPagenoteState'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { BiHighlight } from 'react-icons/bi'
import { TbHighlightOff } from 'react-icons/tb'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

function checkDisabled(rule: string, url: string) {
  return rule === url || (rule.indexOf('*') > -1 && new RegExp(rule).test(url))
}

enum EnableType {
  enable = 'enable',
  disableDomain = 'disable-domain',
  disableUrl = 'disable-url',
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

  const disableDomain = url ? `${new URL(url).origin}/*` : ''

  function onChangeDisableRule(type: EnableType | string) {
    switch (type) {
      case EnableType.disableDomain:
        add(disableDomain)
        break
      case EnableType.disableUrl:
        add(url)
        break
      case EnableType.enable:
        disabledList.forEach(function (item) {
          const matched = checkDisabled(item, url)
          if (matched) {
            remove(item)
          }
        })
        break
    }
  }

  let value = ''
  if (tabState?.active) {
    value = EnableType.enable
  } else if (set.has(disableDomain)) {
    value = EnableType.disableDomain
  } else if (set.has(url)) {
    value = EnableType.disableUrl
  }

  return (
    <>
      <Switch
        id={'disable-button'}
        color={'primary'}
        checked={value === EnableType.enable}
        onCheckedChange={(value) => {
          if (value) {
            onChangeDisableRule(EnableType.enable)
          } else {
            onChangeDisableRule(EnableType.disableUrl)
          }
        }}
      />
      <Label htmlFor="disable-button">
        {value === EnableType.enable ? '已启用' : '已禁用'}
      </Label>
    </>
  )

  return (
    <Select value={value} onValueChange={onChangeDisableRule}>
      <SelectTrigger className="w-auto h-auto p-0 border-none shadow-none">
        {tabState?.active ? <BiHighlight /> : <TbHighlightOff />}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="disable-url">🚫禁用当前网页</SelectItem>
        <SelectItem value="disable-domain">🚫禁用当前域名</SelectItem>
        <SelectItem value="enable">✅在此网站启用</SelectItem>
      </SelectContent>
    </Select>
  )
}
