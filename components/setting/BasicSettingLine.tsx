import React, { ReactElement, useState } from 'react'
import { NavLink } from 'react-router-dom'
import SettingMoreSvg from '../../assets/svg/right-more.svg'

export default function BasicSettingLine(props: {
  label: string | ReactElement
  subLabel?: string
  path?: string
  right?: ReactElement
  children?: ReactElement
}) {
  const { label, path, right, subLabel, children } = props
  const [expand, setExpand] = useState(false)

  const Right = right || (
    <button
      className={
        'rounded-full hover:border hover:bg-base-300 w-6 h-6 flex items-center justify-center'
      }
    >
      <SettingMoreSvg className={'fill-current '} />
    </button>
  )

  function Content() {
    return (
      <div
        className={
          'px-5  border-b border-base-200 hover:bg-base-200 bg-base-150 last-of-type:border-none'
        }
      >
        <div className={'min-h-12 flex items-center justify-between'}>
          <div className={'text-sm'}>
            <div className={' leading-12 '}>{label}</div>
            <div className={'text-xs text-gray-500'}>{subLabel}</div>
          </div>
          {Right}
        </div>
        <div className={''}>{children}</div>
      </div>
    )
  }

  return path ? (
    <NavLink to={path}>
      <Content />
    </NavLink>
  ) : (
    <Content />
  )
}
