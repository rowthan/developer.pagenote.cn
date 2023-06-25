import React from 'react'
import { MdRemoveCircle } from 'react-icons/md'

interface TagProps {
  children: React.ReactNode
  color?: string
  editing: boolean
  onDelete: React.MouseEventHandler
}

export default function TagItem({ children, editing, onDelete }: TagProps) {
  return (
    <span
      className={'inline-flex border-1 border-base-100'}
      style={{
        animationDelay: Math.random() * 0.25 + 's',
        fontSize: 12,
        lineHeight: '1.4em',
        padding: '0 4px',
        margin: 4,
        // background: '#f5f5f5',
        border: '1px solid transparent',
        borderRadius: 3,
        // color: '#ababab',
        cursor: 'pointer',
        animationDuration: '0.25s',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        transformOrigin: '30% 5%',
        animationName: editing ? 'iosShake1' : '',
      }}
    >
      {children}
      {editing && (
        <span className={'absolute top-0 right-0'} onClick={onDelete}>
          <MdRemoveCircle width={20} height={20} />
        </span>
      )}
    </span>
  )
}
