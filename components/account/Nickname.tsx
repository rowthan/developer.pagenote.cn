import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useUserInfo from '../../hooks/useUserInfo'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useState } from 'react'
import { ProfileEditor } from './ProfileEditor'
import { DialogPortal } from '@radix-ui/react-dialog'

interface Props {
  nickname: string
}

export default function Nickname(props: Props) {
  const [data, mutate, setToken] = useUserInfo()
  const [open, setOpen] = useState(false)

  function signout() {
    setToken(null)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span>{data?.profile.nickname}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <div className={'p-1'}>用户ID：{data?.profile?.uid}</div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>编辑资料</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signout}>退出账号</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogPortal>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>更新账号信息</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <ProfileEditor
              close={() => {
                setOpen(false)
              }}
            />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}
