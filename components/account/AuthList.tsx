import useAuthList, {AuthInfo, authMap, unbindAuth} from '../../hooks/useAuthList'
import Modal from 'components/Modal'
import AuthBottoms, {AUTH_LIST} from "./AuthBottoms";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "../../@/components/ui/input";
import {Separator} from '@/components/ui/separator';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
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

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useVersionValid from "../../hooks/useVersionValid";
import {requestValidate} from "../../service/account";

export default function AuthList() {
    const [authList = [], fetch] = useAuthList();
    const [index, setIndex] = useState(-1)
    const {valid} = useVersionValid('0.26.7');
    const activeAuth = authList[index];

    function unbind(auth: AuthInfo) {
        unbindAuth(auth, valid).then(function (res) {
            console.log(res, 'unbind res')
            if (res?.error) {
                console.error(res.error)
            }
            fetch()
        })
    }

    useEffect(function (){
        if(activeAuth){
            requestValidate({
                validateType: 'un_bind',
                publicText: activeAuth.authId,
            },valid).then(function (res) {
                const publicText = res?.data?.requestValidate?.publicText;
                if(!publicText){

                }
            })
        }
    },[activeAuth])



    return (
        <div>
            <Card className={'shadow-none'}>
                <CardHeader className={'border-b'}>
                    <CardTitle>
                        账号管理
                    </CardTitle>
                    <CardDescription>
                        与当前账号关联账号。
                    </CardDescription>
                </CardHeader>
                <ul className="divide-y divide w-full">
                    {authList.map((item, index) => (
                        <li key={index} className="flex justify-between items-center px-4 hover:bg-accent">
                            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                <img
                                    alt="profil"
                                    src={authMap[item.authType]?.platformIcon}
                                    className="mx-auto object-cover rounded-full h-6 w-6 bg-white"
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex text-xs text-gray-600 dark:text-gray-200">
                                        <button className={'tooltip '} data-tip={item.authEmail}>
                                            {item.authName}
                                        </button>
                                        {
                                            item.authAvatar &&
                                            <img
                                                alt="profil"
                                                src={item.authAvatar}
                                                className="mx-auto ml-1 object-cover rounded-full h-6 w-6 bg-white"
                                            />
                                        }
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => {
                                        setIndex(index)
                                    }}>
                                        取消绑定
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </li>
                    ))}
                </ul>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className={'w-full border-t'} variant={'ghost'}>添加授权</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        <DropdownMenuLabel>一键登录</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            {
                                AUTH_LIST.map((item) => (
                                    <DropdownMenuItem key={item.label} onClick={() => {
                                        window.open(item.link)
                                    }}>
                                        {item.label}
                                    </DropdownMenuItem>
                                ))
                            }

                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Card>


            <AlertDialog open={!!activeAuth} onOpenChange={() => {
                setIndex(-1)
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确定删除关联?</AlertDialogTitle>
                        <AlertDialogDescription>
                            删除后将无法继续使用该账号对应的一键登录账号等功能。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>取消操作</AlertDialogCancel>
                        <Button variant="destructive" onClick={() => {
                            unbind(activeAuth)
                        }}>删除绑定</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/*<Dialog open={!!activeAuth} onOpenChange={()=>{setIndex(-1)}}>*/}
            {/*  <DialogContent>*/}
            {/*    <DialogHeader>*/}
            {/*      <DialogTitle>授权详情 - {authList[index]?.authType}</DialogTitle>*/}
            {/*    </DialogHeader>*/}
            {/*    <ul>*/}
            {/*      <li>昵称： {activeAuth?.authName}</li>*/}
            {/*      <li className={'flex items-center'}>头像：*/}
            {/*        <Avatar className={'w-6 h-6'}>*/}
            {/*          <AvatarImage src={activeAuth?.authAvatar} />*/}
            {/*        </Avatar>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        邮箱： {activeAuth?.authEmail}*/}
            {/*      </li>*/}
            {/*    </ul>*/}
            {/*    <p>*/}
            {/*      你可以通过 {activeAuth?.authType} 一键授权登录 PAGENOTE 账号。*/}
            {/*    </p>*/}
            {/*    <DialogFooter>*/}
            {/*      <Button variant={'destructive'} onClick={()=>{unbind(activeAuth)}}>取消授权</Button>*/}
            {/*    </DialogFooter>*/}
            {/*  </DialogContent>*/}
            {/*</Dialog>*/}

        </div>
    )
}
