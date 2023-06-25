import React, { type ReactNode } from 'react'

interface Props {
  children?: ReactNode
  icon?: ReactNode | JSX.Element
  name: string
  onClick?: () => void
  confirm?: ReactNode
}

export default function ActionItem(props: Props) {
  const { children, onClick, icon, name } = props
  return (
    <div
      tabIndex={0}
      className={
        'flex justify-between items-center p-1 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-gray-800'
      }
      onClick={onClick}
    >
      <div className={'flex items-center'}>
        <span className={'text-[20px]'}>{icon}</span>
        <span className={'ml-2'}>{name}</span>
      </div>
      {children}
    </div>
  )
}

ActionItem.defaultProps = {}
