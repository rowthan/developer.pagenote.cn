import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import dayjs from "dayjs";

interface Book {endTime: number, startTime: number,duration: number,remark: string,giftDays: number}
type BookInfo = {list: Book[],expiredAt?: Date|undefined,expiredTip?: string}
export default function ():[BookInfo,()=>void] {
    const {data={
        list:[],
        expiredAt: undefined,
        expiredTip:""
    },mutate} = useSWR<BookInfo>('/books',()=>fetchBookList(30 * 60 * 1000),{
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
                'query': `query{bookInfo{startTime,endTime,duration,remark,giftDays},profile{pro}}`
            },
        },{
            cacheControl:{
                maxAgeMillisecond: cacheDuration || 0
            }
        }).then(function (res) {
            const data = res.data.json;
            if(Array.isArray(data.data.bookInfo)){
                const endTime = data.data.bookInfo[0].endTime;
                let tip = endTime ? dayjs(endTime).format('YYYY-MM-DD') : '-';
                if((data.data.profile?.pro || 0) > 9){
                    tip = '终身'
                }
                return {
                    list: data.data.bookInfo,
                    expiredAt: endTime ? new Date(endTime): undefined,
                    expiredTip: tip
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
