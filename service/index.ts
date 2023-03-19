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

export type UpdateProfile = {
    avatar?: string,
    nickname?: string
}
export function updateProfile(updateInfo: UpdateProfile){
    return extApi.network.pagenote({
        url:"https://api-test.pagenote.cn/api/graph/user",
        data: {
            mutation: `mutation makeUpdateConfig($avatar: String, $nickname: String) {updateProfile(avatar:$avatar,nickname:$nickname){avatar,nickname}}`,
            variables: updateInfo
        },
        method:"POST",
    },{
        timeout: 10 * 1000
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
    },{
        cacheControl:{
            maxAge: 3600 * 2
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
    },{
        cacheControl:{
            maxAge: 3600
        }
    }).then(function(res){
        return res?.data?.json?.data?.versionDetail || null
    })
}
