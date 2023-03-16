import dayjs from "dayjs";
import extApi from "@pagenote/shared/lib/pagenote-api";

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
