import { ReactComponentElement, type ReactNode, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useMountedState } from 'react-use'
import QuestionSvg from '../assets/svg/question.svg'
import RateSvg from '../assets/svg/pingfen.svg'
import { useRouter } from 'next/router'
import HelpSvg from '../assets/svg/bangzhu.svg'
import SettingSvg from '../assets/svg/setting.svg'
import ShortCutInfo from './ShortCutInfo'
import { basePath, isExt } from '../const/env'
import Modal from './Modal'

interface Props {
  children?: ReactNode
}

export default function HelpAside(props: Props) {
    const {children} = props
    const {pathname} = useRouter()
    const [showShortcut, setShortcut] = useState(false)
    const mounted = useMountedState();
    const asideList: {
        label: string
        link?: string
        onClick?: () => void
        icon: ReactComponentElement<any>
        target?: '_self' | '_blank'
    }[] = [
        {
            label: '帮助',
            link: 'https://pagenote.cn/question',
            icon: <HelpSvg className={'fill-current inline'}/>,
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
    if (!isExt) {
      asideList.push({
        label: '评分',
        link: 'https://pagenote.cn/rate',
        icon: <RateSvg className={'fill-current inline'} />,
      })
    } else {
      asideList.push({
        label: '快捷键',
        icon: <RateSvg className={'fill-current inline'} />,
        onClick: function () {
          setShortcut(true)
        },
      })
    }

    return (
      <div className="bg-accent">
        {children}
        <aside className={'fixed right-4 bottom-6 pb-2'}>
          {mounted() && (
            <Popover>
              <PopoverTrigger>
                <QuestionSvg
                  className={'fill-current'}
                  width={20}
                  height={20}
                />
              </PopoverTrigger>
              <PopoverContent className="px-0 bg-background">
                <ul
                  tabIndex={0}
                  className="w-32 right-4 overflow-hidden bottom-full text-sm"
                >
                  {asideList.slice(0, 3).map((item, index) => (
                    <li
                      key={index}
                      className={
                        'py-1 px-2 hover:bg-accent hover:text-foreground'
                      }
                      onClick={item.onClick}
                    >
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
                </ul>
              </PopoverContent>
            </Popover>
          )}
        </aside>
        <Modal open={showShortcut} toggleOpen={setShortcut}>
          <ShortCutInfo />
        </Modal>
      </div>
    )
}

HelpAside.defaultProps = {}
