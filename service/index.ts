import dayjs from "dayjs";
import extApi from "@pagenote/shared/lib/pagenote-api";

export function createOrder(price?: number) {
    return extApi.network.pagenote({
        url:"/api/graph/site",
        data: {
            mutation: `mutation{active(id:"createOrder",remark:"${price}"){id}}`
        },
        method:"POST",
    })
}
export function bindTransition(record: string, amount: number) {
    const recordId = record || dayjs().format('YYYYMMDD_HHmmss');
    return extApi.network.pagenote({
        url:"/api/user",
        data: {
            mutation: `mutation{bindTransition(recordId:"${recordId}",recordType:"${3}",amount:${amount}){status}}`
        },
        method:"POST",
    })
}


