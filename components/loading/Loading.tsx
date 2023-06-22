import { type ReactNode } from 'react'
import LoadingSvg from 'assets/svg/loading.svg'

interface Props {
  children?: ReactNode
  className?: string
}

export default function Loading(props: Props) {
  const { className } = props
  return (
    <LoadingSvg
      className={`animate-spin fill-current text-color-100 ${className}`}
    />
  )
}

Loading.defaultProps = {}
