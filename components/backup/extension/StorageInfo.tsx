import React, { type ReactNode } from 'react'
import useStorage from 'hooks/useStorage'
import { getMb } from 'utils/size'
import BasicSettingLine from '../../setting/BasicSettingLine'
import Loading from 'components/loading/Loading'
import useWhoAmi from 'hooks/useWhoAmi'
import {basePath} from "const/env";

interface Props {
  children?: ReactNode
}

export default function StorageInfo(props: Props) {
  const [pageStorage, loadingPage] = useStorage('lightpage', 'webpage')
  const [lightStorage, loadingLight] = useStorage('lightpage', 'light')
  const [snapshotStorage, loadingSnapshot] = useStorage('lightpage', 'snapshot')
  const [htmlStorage, loadingHtml] = useStorage('resource', 'html')
  const [noteStorage] = useStorage('lightpage', 'note')

  const [whoAmI] = useWhoAmi()
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
      link: `${basePath}/ext/gallery.html`,
    },
    {
      name: '离线html',
      usage: htmlStorage.usage,
      bg: '#4467a8',
    },
    {
      name: '备忘录',
      usage: noteStorage.usage,
      bg: '#b47d41',
    },
  ]

  return (
    <BasicSettingLine
      label={
        <span>
          <span>本机存储分析</span>
        </span>
      }
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
          {loading ? (
            <div>
              <Loading>正在统计中</Loading>
            </div>
          ) : (
            list.map((item) => (
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
                <a href={item.link} target={'_blank'}>
                  {item.name}
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </BasicSettingLine>
  )
}

StorageInfo.defaultProps = {}
