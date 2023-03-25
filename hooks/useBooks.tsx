import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import dayjs from "dayjs";
import useUserInfo from "./useUserInfo";

interface Book {endTime: number, startTime: number,duration: number,remark: string,giftDays: number}
type BookInfo = {list: Book[],expiredAt?: Date|undefined,expiredTip: string}
export default function ():[BookInfo,()=>void] {
    const [userInfo] = useUserInfo();
    const {data={
        list:[],
        expiredAt: undefined,
        expiredTip:""
    }} = useSWR<BookInfo>('/books',()=>fetchBookList(30 * 60),{
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
        },{
            cacheControl:{
                maxAge: cacheDuration || 0
            }
        }).then(function (res) {
            const data = res.data.json;
            if(Array.isArray(data.data.bookInfo)){
                const endTime = data.data.bookInfo[0].endTime;
                let tip = endTime ? (dayjs(endTime).isAfter(dayjs(new Date('2028-01-01'))) ? '终身' : dayjs(endTime).format('YYYY-MM-DD')) : '-';
                const role = userInfo?.profile?.pro || 0
                if(role>9){
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
