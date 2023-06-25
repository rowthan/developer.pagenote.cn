import { type ReactNode } from 'react'

interface Props {
  children?: ReactNode
  list: { name: string; icon?: ReactNode }[]
  activeIndex: number
  onchange: (index: number) => void
}

export default function TabBasic(props: Props) {
  const { list, activeIndex, onchange } = props
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex w-full justify-between overflow-hidden overflow-x-scroll rounded-xl bg-white p-4">
        <ul className="flex space-x-2">
          {list.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  onchange(index)
                }}
                className="flex rounded-lg bg-gray-100 p-2 font-medium text-gray-600 hover:bg-green-100 hover:text-green-400"
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

TabBasic.defaultProps = {}
