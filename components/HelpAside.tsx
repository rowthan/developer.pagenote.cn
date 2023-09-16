import { ReactComponentElement, type ReactNode, useState } from 'react'
import QuestionSvg from '../assets/svg/question.svg'
import RateSvg from '../assets/svg/pingfen.svg'
import useWhoAmi from '../hooks/useWhoAmi'
import { useRouter } from 'next/router'
import HelpSvg from '../assets/svg/bangzhu.svg'
import SettingSvg from '../assets/svg/setting.svg'
import ShortCutInfo from './ShortCutInfo'
import { basePath } from '../const/env'
import Modal from './Modal'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  children?: ReactNode
}

export default function HelpAside(props: Props) {
  const { children } = props
  const [whoAmi] = useWhoAmi()
  const { pathname } = useRouter()
  const [showShortcut, setShortcut] = useState(false)

  const asideList: {
    label: string
    link: string
    icon: ReactComponentElement<any>
    target?: '_self' | '_blank'
  }[] = [
    {
      label: '帮助',
      link: 'https://pagenote.cn/question',
      icon: <HelpSvg className={'fill-current inline'} />,
    },
  ]
  if (pathname.includes('/ext')) {
    asideList.push({
      label: '设置',
      link: basePath + '/ext/setting.html',
      icon: <SettingSvg className={'fill-current inline'} />,
      target: '_blank',
    })
  } else {
    asideList.push({
      label: '设置',
      link: 'https://pagenote.cn/setting',
      icon: <SettingSvg className={'fill-current inline'} />,
      target: '_self',
    })
  }
  if (!whoAmi?.isTest) {
    asideList.push({
      label: '评分',
      link: 'https://pagenote.cn/rate',
      icon: <RateSvg className={'fill-current inline'} />,
    })
  }

  return (
    <div className="">
      {children}
      <aside className={'fixed right-4 bottom-6 pb-2'}>
        <div className="dropdown dropdown-top dropdown-end">

          <Popover>
            <PopoverTrigger>
              <button className={'rounded-full bg-neutral text-neutral-content'}>
                <QuestionSvg className={'fill-current'} width={20} height={20} />
              </button>
            </PopoverTrigger>
            <PopoverContent className='px-0'>
                <ul
                tabIndex={0}
                className="dropdown-content w-32 rounded right-4 mb-2 py-2 overflow-hidden bottom-full text-sm"
              >
                {asideList.slice(0, 2).map((item, index) => (
                  <li key={index} className={'hover:bg-accent py-1 px-2'}>
                    <a
                      className={' flex items-center w-full'}
                      href={item.link}
                      target={item.target || '_blank'}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
                <li
                  className={'hover:bg-accent py-1 px-4'}
                  onClick={() => {
                    setShortcut(true)
                  }}
                >
                  <a className={' flex items-center w-full'}>
                    <RateSvg className={'fill-current inline'} />
                    <span>快捷键</span>
                  </a>
                </li>
              </ul>

            </PopoverContent>
          </Popover>

          
        </div>
      </aside>
      <Modal open={showShortcut} toggleOpen={setShortcut}>
        <ShortCutInfo />
      </Modal>
    </div>
  )
}

HelpAside.defaultProps = {}
