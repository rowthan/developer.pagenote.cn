import useBooks from "../../hooks/useBooks";
import dayjs from "dayjs";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export default function BookList() {
    const [bookList] = useBooks()

    return (
        <div className="overflow-x-auto max-h-[400px] overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">订阅周期</TableHead>
                        <TableHead className={'w-32'}>福利</TableHead>
                        <TableHead>备注</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={''}>
                    {bookList?.list.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {dayjs(item.startTime).format('YYYY/MM/DD')}-{dayjs(item.endTime).format('YYYY/MM/DD')}
                            </TableCell>
                            <TableCell className="">
                                {
                                    item.giftDays > 0 && <span className={'ml-2'}>赠送{item.giftDays}天</span>
                                }
                            </TableCell>
                            <TableCell>
                                {item?.remark}
                            </TableCell>
                        </TableRow>
                    ))}
                    {bookList?.list.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {dayjs(item.startTime).format('YYYY/MM/DD')}-{dayjs(item.endTime).format('YYYY/MM/DD')}
                            </TableCell>
                            <TableCell className="">
                                {
                                    item.giftDays > 0 && <span className={'ml-2'}>赠送{item.giftDays}天</span>
                                }
                            </TableCell>
                            <TableCell>
                                {item?.remark}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
