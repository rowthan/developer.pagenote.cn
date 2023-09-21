import useAuthList, {authMap} from 'hooks/useAuthList'
import {AUTH_LIST} from "./AuthBottoms";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UnbindForm from "../form/UnbindForm";
import Loading from "../loading/Loading";

export default function AuthList() {
    const {data: authList = [], mutate: fetch, isLoading} = useAuthList();
    const [index, setIndex] = useState(-1)
    const activeAuth = authList[index];

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
                {
                    isLoading && <Loading className={'!mx-auto my-3'}/>
                }
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
                                <DropdownMenuTrigger asChild>
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
                                    <DropdownMenuItem disabled={item.authType === 'email'} onClick={() => {
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

            <Dialog open={!!activeAuth} onOpenChange={(open) => {
                console.log(open, 'on close')
                setIndex(-1)
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>确定删除关联?</DialogTitle>
                        <DialogDescription>
                            删除后将无法继续使用该账号对应的一键登录账号等功能。
                        </DialogDescription>
                    </DialogHeader>

                    <UnbindForm auth={activeAuth} onFinished={() => {
                        fetch();
                        setIndex(-1);
                    }}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}
