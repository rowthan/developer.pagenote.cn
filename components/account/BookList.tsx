import useBooks from "../../hooks/useBooks";
import dayjs from "dayjs";

export default function BookList() {
    const [bookList] = useBooks()

    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                <tr>
                    <th>订阅周期</th>
                    <th>备注</th>
                </tr>
                </thead>
                <tbody>
                {
                    bookList.map((item, index) => (
                        <tr key={index}>
                            <th className={'text-xs'}>
                                {dayjs(item.startTime).format('YYYY-MM-DD')} - {dayjs(item.endTime).format('YYYY-MM-DD')}
                                {
                                    item.giftDays > 0 && <span className={'ml-2'}>赠送{item.giftDays}天</span>

                                }
                            </th>
                            <td>{item?.remark}</td>
                        </tr>
                    ))
                }

                </tbody>
            </table>
        </div>
    )
}
