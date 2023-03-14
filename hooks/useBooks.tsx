import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import dayjs from "dayjs";

interface Book {endTime: number, startTime: number,duration: number,remark: string,giftDays: number}
type BookInfo = {list: Book[],expiredAt?: Date|undefined,expiredTip: string}
export default function ():[BookInfo,()=>void] {
    const {data={
        list:[],
        expiredAt: undefined,
        expiredTip:""
    }} = useSWR<BookInfo>('/books',fetchBookList,{
        fallbackData:{
            list:[],
            expiredAt: undefined,
            expiredTip:""
        }
    });

    function fetchBookList(cacheDuration?: number) {
        return extApi.network.pagenote({
            url:'/api/user',
            method:'GET',
            data:{
                'query': `query{bookInfo{startTime,endTime,duration,remark,giftDays}}`
            },
            _config:{
                cacheDuration: cacheDuration || 30 * 60 * 1000
            }
        }).then(function (res) {
            const data = res.data.json;
            if(Array.isArray(data.data.bookInfo)){
                const endTime = data.data.bookInfo[0].endTime;
                return {
                    list: data.data.bookInfo,
                    expiredAt: endTime ? new Date(endTime): undefined,
                    expiredTip: endTime ? (dayjs(endTime).isAfter(dayjs(new Date('2032-01-01'))) ? '终身' : dayjs(endTime).format('YYYY-MM-DD')) : "-"
                }
            }
            return {
                list: [],
                expiredTip:"-"
            }
        })
    }

    return [data,fetchBookList]

}
