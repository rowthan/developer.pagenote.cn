import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SettingMoreSvg from '../../assets/svg/right-more.svg'
import classNames from 'classnames'
import Loading from '../loading/Loading'

export default function BasicSettingLine(props: {
  label: string | ReactElement
  subLabel?: string
  path?: string
  right?: ReactElement
  children?: ReactElement
  loading?: boolean
  onClick?: () => void
  className?: string
}) {
  const {
    className,
    label,
    path,
    right,
    onClick,
    subLabel,
    children,
    loading,
    ...left
  } = props
  const [expand, setExpand] = useState(false)
  const navigate = useNavigate()

  const Right = loading ? (
    <Loading />
  ) : (
    right || (
      <button
        className={
          'rounded-full hover:border hover:bg-base-300 w-6 h-6 flex items-center justify-center'
        }
      >
        <SettingMoreSvg className={'fill-current '} />
      </button>
    )
  )

  function onClickRoot() {
    if (path) {
      navigate(path)
    }
    onClick && onClick()
  }

  return (
    <div
      onClick={onClickRoot}
      className={classNames(
        'block px-5 py-3 min-h-12 bg-color-50  border-b border-base-200 hover:bg-base-200 bg-base-150 last:rounded-b-lg first:rounded-t-lg overflow-hidden',
        {
          'cursor-pointer': !!path,
        },
        className
      )}
      {...left}
    >
      <div className={'flex items-center justify-between'}>
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
