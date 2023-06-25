import { type ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  children?: ReactNode
  // start: boolean;
  // pause: boolean;
  onFinished: () => void
  onCancel: () => void
}

enum RunningState {
  unset = 0,
  running = 1,
  canceled = 2,
  finished = 3,
}

export default function DoWithRevert(props: Props) {
  const { children, onFinished, onCancel } = props
  const [state, setState] = useState<RunningState>(RunningState.unset)

  const timer = useRef<NodeJS.Timer>()

  useEffect(function () {
    setState(RunningState.running)
    timer.current = setTimeout(function () {
      setState(RunningState.finished)
    }, 3000)
    return function () {
      clearTimeout(timer.current)
    }
  }, [])

  useEffect(
    function () {
      switch (state) {
        case RunningState.canceled:
          clearTimeout(timer.current)
          // 这里延迟返回是为了保留回退动画，准确的做法是计算进度条走了多少时间。todo 之后有时间再优化吧
          setTimeout(function () {
            onCancel()
          }, 3000)
          break
        case RunningState.finished:
          onFinished()
          break
        default:
          break
      }
    },
    [state]
  )

  function cancel() {
    console.log('canceled')
    setState(RunningState.canceled)
  }

  const running = state === RunningState.running
  const tip: Record<RunningState, string> = {
    [RunningState.finished]: '已完成操作',
    [RunningState.canceled]: '正在取消操作',
    [RunningState.unset]: '',
    [RunningState.running]: ' 正在删除，点击取消。删除后不可恢复',
  }

  return (
    <div onClick={cancel} className={`  h-full w-full `}>
      <div
        className={`absolute flex items-center bg-color-0  h-full top-0 left-0 transition-all duration-[3000ms] ${
          running ? 'w-full' : 'w-0'
        }`}
      >
        <div className={'whitespace-nowrap p-2 text-sm text-color-500'}>
          {tip[state]}
        </div>
      </div>
      {children}
    </div>
  )
}

DoWithRevert.defaultProps = {}
