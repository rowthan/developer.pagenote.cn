import { type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export default function OutLineTop(props: Props) {
  const { children } = props
  // todo 这里给出一些智能、快捷操作
  return <div className=""></div>
}

OutLineTop.defaultProps = {}
