import OutLink from '../../assets/svg/outlink.svg'
import React from 'react'
import useSettings from '../../hooks/useSettings'
import BasicSettingLine, {SettingSection} from './BasicSettingLine'
import SettingDetail from './SettingDetail'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function LightSetting() {
  const { data: setting, update: updateSetting } = useSettings()

  const { keyupTimeout, showBarTimeout } = setting

  function resetSetting() {
    // @ts-ignore
    updateSetting(null)
  }

  return (
    <SettingDetail label={'画笔设置'}>
      <div >
        <SettingSection>
          <BasicSettingLine
            label={'标记快捷键灵敏度'}
            right={
                <Select defaultValue={`${keyupTimeout}`} value={`${keyupTimeout}`} onValueChange={(newValue)=>{
                    updateSetting({ keyupTimeout: Number(newValue) })
                }}>
                    <SelectTrigger className={'w-auto border-none shadow-none'}>
                        <SelectValue placeholder={'敏捷度调节'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'0'}>灵敏，按下即触发</SelectItem>
                        <SelectItem value="500">适中，长按0.5秒</SelectItem>
                        <SelectItem value="2000">迟缓，长按2秒</SelectItem>
                    </SelectContent>
                </Select>
            }
          ></BasicSettingLine>
          <BasicSettingLine
            label={'画笔面板出现时机'}
            right={
                <Select defaultValue={`${showBarTimeout}`} value={`${showBarTimeout}`} onValueChange={(newValue)=>{
                    updateSetting({ showBarTimeout: Number(newValue) })
                }}>
                    <SelectTrigger className={'w-auto border-none shadow-none'}>
                        <SelectValue placeholder={'敏捷度调节'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'0'}>立刻</SelectItem>
                        <SelectItem value="1000">迟缓</SelectItem>
                    </SelectContent>
                </Select>
            }
          ></BasicSettingLine>
        </SettingSection>

        <div>
          <a
            href="/pagenote.html#setting"
            target={'_blank'}
            className={'mt-10 block '}
          >
              <SettingSection>
                  <BasicSettingLine
                      label={'画笔设置'}
                      subLabel={'添加画笔、修改颜色'}
                      right={<OutLink className={'fill-current'} />}
                  ></BasicSettingLine>
              </SettingSection>
          </a>
        </div>
      </div>
    </SettingDetail>
  )
}
