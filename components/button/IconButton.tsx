import { type ReactNode } from 'react'
import * as React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

// @ts-ignore
function IconButton(props: Props, ref) {
  const { children, className = '', ...left } = props
  return (
    <button
      {...left}
      className={`px-1 inline-block hover:bg-muted hover:text-accent-foreground rounded-md ${className}`}
    >
      {children}
    </button>
  )
}

export default React.forwardRef(IconButton)
