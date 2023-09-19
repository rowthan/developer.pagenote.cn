import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useUserInfo from "../../hooks/useUserInfo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, {useState} from "react";
import UserInfoForm from "./UserInfoForm";
import {ProfileEditor} from "./ProfileEditor";

interface Props {
  nickname: string
}
export default function Nickname(props: Props) {
  const [data, mutate, setToken] = useUserInfo()
  const [open,setOpen] = useState(false)
  function signout() {
    setToken(null)
  }
  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" >{data?.profile.nickname}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/*<DropdownMenuLabel>账号信息</DropdownMenuLabel>*/}
            {/*<DropdownMenuSeparator />*/}
            <DropdownMenuGroup>
              {/*<DropdownMenuItem disabled>*/}
              {/*  昵称：{data?.profile?.nickname}*/}
              {/*</DropdownMenuItem>*/}
              <DropdownMenuItem disabled>
                用户ID：{data?.profile?.uid}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/*<DropdownMenuGroup>*/}
            {/*  <DropdownMenuItem>Team</DropdownMenuItem>*/}
            {/*  <DropdownMenuSub>*/}
            {/*    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>*/}
            {/*    <DropdownMenuPortal>*/}
            {/*      <DropdownMenuSubContent>*/}
            {/*        <DropdownMenuItem>Email</DropdownMenuItem>*/}
            {/*        <DropdownMenuItem>Message</DropdownMenuItem>*/}
            {/*        <DropdownMenuSeparator />*/}
            {/*        <DropdownMenuItem>More...</DropdownMenuItem>*/}
            {/*      </DropdownMenuSubContent>*/}
            {/*    </DropdownMenuPortal>*/}
            {/*  </DropdownMenuSub>*/}
            {/*  <DropdownMenuItem>*/}
            {/*    New Team*/}
            {/*    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>*/}
            {/*  </DropdownMenuItem>*/}
            {/*</DropdownMenuGroup>*/}
            <DropdownMenuItem onClick={()=>{setOpen(true)}}>编辑资料</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signout}>
              退出账号
              {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>更新账号信息</DialogTitle>
              <DialogDescription>

              </DialogDescription>
            </DialogHeader>
            <ProfileEditor close={()=>{setOpen(false)}}/>
          </DialogContent>
        </Dialog>
      </>
  )
}
