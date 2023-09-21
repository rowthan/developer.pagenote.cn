import BookList from "./BookList";
import {ReactElement, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

export default function BookDetail(props: { children: ReactElement }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>VIP 详情</DialogTitle>
                    <DialogDescription>
                        有效期记录
                    </DialogDescription>
                </DialogHeader>
                <BookList />
                <DialogFooter>
                  <Button onClick={()=>{setOpen(false)}}>知道了</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
