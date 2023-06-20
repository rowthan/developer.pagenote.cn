import { type ReactNode } from 'react'
import useStorage from '../../../hooks/useStorage'
import { getMb } from '../../../utils/size'

interface Props {
  children?: ReactNode
}

export default function StorageInfo(props: Props) {
  const { children } = props
  const [pageStorage] = useStorage('lightpage', 'webpage')
  const [lightStorage] = useStorage('lightpage', 'light')
  const [snapshotStorage] = useStorage('lightpage', 'snapshot')
  const [htmlStorage] = useStorage('resource', 'html')

  const total =
    pageStorage?.usage +
    lightStorage?.usage +
    snapshotStorage?.usage +
    htmlStorage?.usage +
    1

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
    <div className="px-5 py-2 bg-color-50 rounded">
      <div className={'flex justify-between items-center'}>
        <div className={'text-md'}>扩展应用存储空间</div>
        <div className={'text-sm text-color-400'}>{getMb(total)} 已使用</div>
      </div>

      <div className={'mt-2'}>
        <div className={'flex w-full rounded overflow-hidden'}>
          {list.map((item) => (
            <div
              className={'h-3 min-w-[1px]'}
              key={item.name}
              style={{
                width: `${(item.usage / total) * 100}%`,
                backgroundColor: item.bg,
              }}
            ></div>
          ))}
        </div>
        <div className={'flex mt-2'}>
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
        </div>
      </div>
    </div>
  )
}

StorageInfo.defaultProps = {}
