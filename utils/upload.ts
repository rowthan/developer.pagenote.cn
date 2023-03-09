import OSS from 'ali-oss'
import extApi from '@pagenote/shared/lib/pagenote-api/'


export function UploadImage() {
    console.log('upload')
    return extApi.network.pagenote({
        url:"https://api-test.pagenote.cn/api/graph/profile",
        method:"GET",
        data:{
            query:`query{ossKey(buket:"public"){AccessKeyId,AccessKeySecret,SecurityToken,CloudSpace}}`
        }
    }).then(function (res) {
        console.log(res,'upload token')
        const data = res?.data?.json?.data?.ossKey;
        console.log(data,'ossKey')
        const client = new OSS({
            region:"oss-cn-beijing",
            accessKeyId: data.AccessKeyId,
            accessKeySecret: data.AccessKeySecret,
            stsToken: data.SecurityToken,
            bucket:"pagenote-public"
        });
        return {
            client: client,
            cloud_space: data.CloudSpace,
        };
    })
}
