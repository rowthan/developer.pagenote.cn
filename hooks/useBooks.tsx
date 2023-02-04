import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";

interface Book {endTime: number, startTime: number,duration: number,remark: string,giftDays: number}
export default function ():[Book[]] {
    const {data} = useSWR<Book[]>('/books',fetchBookList,);

    function fetchBookList() {
        return extApi.network.pagenote({
            url:'/api/user',
            method:'GET',
            data:{
                'query': `query{bookInfo{startTime,endTime,duration,remark,giftDays}}`
            },
            _config:{
                cacheDuration: 2 * 60 * 1000
            }
        }).then(function (res) {
            const data = res.data.json;
            if(Array.isArray(data.data.bookInfo)){
                return data.data.bookInfo
            }
            return []
        })
    }

    return [data || []]

}
