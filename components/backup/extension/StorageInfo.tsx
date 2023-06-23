import React, { type ReactNode } from 'react'
import useStorage from 'hooks/useStorage'
import { getMb } from 'utils/size'
import BasicSettingLine from '../../setting/BasicSettingLine'
import Loading from 'components/loading/Loading'

interface Props {
  children?: ReactNode
}

export default function StorageInfo(props: Props) {
  const [pageStorage, loadingPage] = useStorage('lightpage', 'webpage')
  const [lightStorage, loadingLight] = useStorage('lightpage', 'light')
  const [snapshotStorage, loadingSnapshot] = useStorage('lightpage', 'snapshot')
  const [htmlStorage, loadingHtml] = useStorage('resource', 'html')

  const loading = loadingHtml || loadingLight || loadingSnapshot || loadingPage
  const total =
    pageStorage?.usage +
    lightStorage?.usage +
    snapshotStorage?.usage +
    htmlStorage?.usage +
    1024

  const list = [
    {
      name: '网页',
      usage: pageStorage.usage,
      bg: '#ff3a51',
    },
    {
      name: '标记',
      usage: lightStorage.usage,
      bg: '#f17c3b',
    },
    {
      name: '截图',
      usage: snapshotStorage.usage,
      bg: '#f6d647',
    },
    {
      name: '离线html',
      usage: htmlStorage.usage,
      bg: '#4467a8',
    },
  ]

  return (
    <BasicSettingLine
      label={'本插件'}
      right={
        <div className={'text-sm text-color-400'}>{getMb(total)} 已使用</div>
      }
    >
      <div className={'mt-2'}>
        <div className={'flex w-full '}>
          {list.map((item) => (
            <div
              className={
                'h-3 min-w-[1px] tooltip tooltip-top first:rounded-l last:rounded-r'
              }
              key={item.name}
              data-tip={`${getMb(item.usage || 0)}`}
              style={{
                width: `${(item.usage / total) * 100}%`,
                backgroundColor: item.bg,
              }}
            ></div>
          ))}
        </div>
        <div className={'flex mt-2 text-color-400'}>
          {list.map((item) => (
            <div
              className={'text-xs inline-flex items-center mr-4'}
              key={item.name}
            >
              <div
                className={'w-2 h-2 rounded-full mr-1'}
                style={{
                  backgroundColor: item.bg,
                }}
              ></div>
              <div>{item.name}</div>
            </div>
          ))}
          {loading && <Loading />}
        </div>
      </div>
    </BasicSettingLine>
  )
}

StorageInfo.defaultProps = {}
