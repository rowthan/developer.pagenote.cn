/**
 * This code was generated by v0 by Vercel Labs.
 * @see https://v0.dev/t/Jd3OFwX
 */
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { getDomain } from '@pagenote/shared/lib/utils/filter'
import useCurrentTab from 'hooks/useCurrentTab'
import useTabPagenoteData from 'hooks/useTabPagenoteData'
import { Button } from '../../@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../@/components/ui/card'
import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
} from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../@/components/ui/dropdown-menu'
import { Separator } from '../../@/components/ui/separator'
import DisableButton from './state/DisableButton'
import useTabPagenoteState from '../../hooks/useTabPagenoteState'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TbCapture } from 'react-icons/tb'
import Achieve from './Achieve'

export function Bookmark() {
  const { tab } = useCurrentTab()
  const [webpage] = useTabPagenoteData()
  const [content] = useTabPagenoteState()

  return (
    <div className="w-full p-4 bg-card rounded flex flex-col gap-2">
      <div className={'flex justify-start items-start gap-2.5'}>
        <Avatar className={'rounded'}>
          <AvatarImage src={tab?.favIconUrl} alt={tab?.title} />
          <AvatarFallback>{tab?.title}</AvatarFallback>
        </Avatar>

        <div className=" relative">
          <div className=" text-sm font-medium font-['Inter']">
            <span className={''}>{tab?.title || '--'}</span>
          </div>
          <div className="mt-1 text-muted-foreground text-xs font-normal font-['Inter']">
            {/*@ts-ignore*/}
            {content?.description || ''}
          </div>
        </div>
      </div>
      <Separator className={'my-1'} />
      <Achieve />
    </div>
  )

  return (
    <div className={'border-none rounded-md shadow-none !bg-none'}>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className={'flex items-center'}>
            <Avatar className={'w-6 h-6'}>
              <AvatarImage src={tab?.favIconUrl} alt={tab?.title} />
              <AvatarFallback>{tab?.title}</AvatarFallback>
            </Avatar>
            <span className={'ml-2'}>{tab?.title || '--'}</span>
          </CardTitle>
          <CardDescription>
            {/*@ts-ignore*/}
            {content?.description || ''}
          </CardDescription>
        </div>
        <DisableButton />
      </CardHeader>
      {/*<CardContent>*/}
      {/*    <div className="flex space-x-4 text-sm text-muted-foreground">*/}
      {/*        <div className="flex items-center">*/}
      {/*            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />*/}
      {/*            TypeScript*/}
      {/*        </div>*/}
      {/*        <div className="flex items-center">*/}
      {/*            <StarIcon className="mr-1 h-3 w-3" />*/}
      {/*            20k*/}
      {/*        </div>*/}
      {/*        <div>Updated April 2023</div>*/}
      {/*    </div>*/}
      {/*</CardContent>*/}
    </div>
  )
}