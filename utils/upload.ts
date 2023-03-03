import OSS from 'ali-oss'
import extApi from '@pagenote/shared/lib/pagenote-api/'


export function UploadImage() {
    console.log('upload')
    return extApi.network.pagenote({
        url:"http://localhost:3000/api/graph/profile",
        method:"GET",
        data:{
            query:`query{ossKey(buket:"public"){AccessKeyId,AccessKeySecret,SecurityToken}}`
        }
    }).then(function (res) {
        const data = res.data.json.data.ossKey;
        console.log(data,'ossKey')
        const client = new OSS({
            region:"oss-cn-beijing",
            accessKeyId: data.AccessKeyId,
            accessKeySecret: data.AccessKeySecret,
            stsToken: data.SecurityToken,
            bucket:"pagenote-public"
        });
        return client;
    })
}
