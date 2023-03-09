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

export function updateProfile(avatar: string){
    return extApi.network.pagenote({
        url:"https://api-test.pagenote.cn/api/graph/user",
        data: {
            mutation: `mutation{updateProfile(avatar:"${avatar}"){avatar}}`
        },
        method:"POST",
    }).then(function(res){
        console.log('更新结果',res)
        const url = res?.data?.json?.data?.updateProfile
        return url;
    })
}


const CACHE_DURATION = 60 * 1000 * 10

export function fetchVersions(){
    return extApi.network.pagenote({
        url:"/api/graph/site",
        data: {
            query: `query{versions(released:true){released,version,release_time,platform,tags,description,changelog}}`
        },
        method:"POST",
        _config:{
            cacheDuration: CACHE_DURATION
        }
    }).then(function(res){
        return res?.data?.json?.data?.versions || []
    })
}

export function fetchVersionDetail(version:string){
    return extApi.network.pagenote({
        url:"/api/graph/site",
        data: {
            query: `query{versionDetail(version:"${version}"){_markdown,version,release_time,platform,tags,description,changelog}}`
        },
        method:"POST",
        _config:{
            cacheDuration: CACHE_DURATION
        }
    }).then(function(res){
        return res?.data?.json?.data?.versionDetail || null
    })
}
