import { NavLink } from 'react-router-dom'
import BackSvg from '../../assets/svg/back.svg'
import React, { ReactElement } from 'react'

export default function SettingDetail(props: {
  children: ReactElement
  label: string | ReactElement
}) {
  const { children, label } = props
  return (
    <div className={'shadow rounded-lg'}>
      <div className={'flex px-3 items-center py-2 mb-8'}>
        <NavLink to={'/setting'}>
          <aside
            className={
              'flex items-center justify-center w-8 h-8 rounded-full hover:bg-base-300'
            }
          >
            <BackSvg className={'fill-current'} />
          </aside>
        </NavLink>
        <div className={'text-md ml-2'}>{label}</div>
      </div>
      <div className={''}>{children}</div>
    </div>
  )
}
