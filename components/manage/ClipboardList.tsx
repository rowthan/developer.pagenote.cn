import dayjs from 'dayjs'
import * as React from 'react'
import { useEffect, useState } from 'react'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { toast } from '../../utils/toast'
import TipSvg from 'assets/svg/info.svg'
import BasicSettingLine from '../setting/BasicSettingLine'
import useSettings from '../../hooks/useSettings'
import { box } from '@pagenote/shared/lib/extApi'
import Box = box.Box

export default function ClipboardList() {
  const [list, setList] = useState<Box[]>([])
  const { data: setting, update: updateSetting } = useSettings()

  const [selected, setSelected] = useState<string[]>([])

  function toggleSelected(id: string) {
    const index = selected.indexOf(id)
    if (index !== -1) {
      selected.splice(index, 1)
    } else {
      selected.push(id)
    }
    setSelected([...selected])
  }

  function toggleAll() {
    if (selected.length === 0) {
      setSelected(list.map((item) => item.id))
    } else {
      setSelected([])
    }
  }

  function batchDeleted() {
    extApi.table
      .remove({
        db: 'boxroom',
        table: 'clipboard',
        params: selected,
      })
      .then(function (res) {
        loadBoxList()
        if (res.success) {
          setSelected([])
        }
      })
  }

  function batchCopy() {
    const text = list
      .map(function (item) {
        return selected.includes(item.id) ? item.text : ''
      })
      .join('  ')
    navigator.clipboard.writeText(text)
    toast('已复制')
  }

  function loadBoxList() {
    extApi.table
      .query({
        db: 'boxroom',
        table: 'clipboard',
        params: {
          sort: {
            createAt: -1,
          },
          query: {},
          skip: 0,
          limit: 100,
        },
      })
      .then((res) => {
        console.log(res)
        if (res.success) {
          setList((res.data.list || []) as Box[])
        }
      })
  }

  function removeItem(key: string) {
    extApi.table
      .remove({
        db: 'boxroom',
        table: 'clipboard',
        params: [key],
      })
      .then(function () {
        loadBoxList()
      })
  }

  function copyItem(text: string) {
    navigator.clipboard.writeText(text)
    toast('已复制')
  }

  useEffect(function () {
    loadBoxList()
  }, [])

  const selectedCnt = selected.length
  return (
    <div>
      <div className="mx-auto p-3">
        <div>
          <BasicSettingLine
            label={'自动 Control C'}
            subLabel={'自动复制的内容将出现在下方'}
            right={
              <input
                type="checkbox"
                className="toggle toggle-info"
                checked={setting.controlC}
                onChange={(e) => {
                  updateSetting({ controlC: e.target.checked })
                }}
              />
            }
          />
        </div>
        <div className="my-4 flex items-center">
          <input
            type="checkbox"
            onChange={toggleAll}
            checked={selectedCnt > 0}
            className="checkbox mx-3"
          />
          <button
            onClick={batchDeleted}
            disabled={selectedCnt === 0}
            className="btn btn-xs btn-error mx-2"
          >
            批量删除{selectedCnt > 0 ? selectedCnt : ''}
          </button>
          <button
            onClick={batchCopy}
            disabled={selectedCnt === 0}
            className={'btn btn-xs btn-info mx-2'}
          >
            批量复制{selectedCnt > 0 ? selectedCnt : ''}
          </button>
        </div>
        {list.map(function (item) {
          return (
            <div key={item.id} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={item.icon} />
                  <input
                    type="checkbox"
                    onChange={() => {
                      toggleSelected(item.id)
                    }}
                    checked={selected.includes(item.id)}
                    className="checkbox checkbox-info absolute left-2 top-2 bg-white bg-opacity-50"
                  />
                </div>
              </div>
              <div className="chat-header">
                <span className="mr-2">
                  <a href={item.from} target="_blank">
                    {item.domain}
                  </a>
                </span>
                <time className="text-xs opacity-50">
                  {' '}
                  {dayjs(item.createAt).format('YYYY-MM-DD HH:mm:ss')}
                </time>
              </div>
              <div
                onClick={() => {
                  item.text && copyItem(item.text)
                }}
                className="break-all chat-bubble chat-bubble-accent text-sm"
              >
                {item.text}
              </div>
              <div className="chat-footer opacity-50 mt-1">
                <button
                  className="btn btn-xs btn-outline"
                  onClick={() => removeItem(item.id || '')}
                >
                  删除
                </button>
              </div>
            </div>
          )
        })}

        <div className="alert shadow-lg">
          <div>
            <TipSvg width={32} height={32} />
            <div>
              <div className="text-xs">最多保留30天内、100条数据。</div>
            </div>
          </div>
          {/*<div className="flex-none">*/}
          {/*  <button className="btn btn-sm">*/}
          {/*    <a*/}
          {/*      target="_blank"*/}
          {/*      href="https://www.bilibili.com/video/BV1TR4y1Q7Yf"*/}
          {/*    >*/}
          {/*      了解Notion 同步方法*/}
          {/*    </a>*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}
