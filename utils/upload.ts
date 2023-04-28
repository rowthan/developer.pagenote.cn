import OSS from 'ali-oss'
import extApi from '@pagenote/shared/lib/pagenote-api/'


export function UploadImage() {
    return extApi.network.pagenote({
        url:"https://api-test.pagenote.cn/api/graph/profile",
        method:"GET",
        data:{
            query:`query{ossKey(spaceType:"public"){AccessKeyId,AccessKeySecret,SecurityToken,CloudSpace,bucket,region}}`
        },
    },{
        cacheControl:{
            maxAgeMillisecond: 60 * 1000 * 10,
            // @ts-ignore
            maxAge: 60 * 10
        }
    }).then(function (res) {
        const data = res?.data?.json?.data?.ossKey;
        if(!data){
            return{
                client: null,
                cloud_space: ""
            }
        }
        const client = new OSS({
            region: data.region,
            accessKeyId: data.AccessKeyId,
            accessKeySecret: data.AccessKeySecret,
            stsToken: data.SecurityToken,
            bucket: data.bucket,
        });
        return {
            client: client,
            cloud_space: data.CloudSpace,
        };
    })
}
