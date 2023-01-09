import {getModelForClass, index, pre, prop} from "@typegoose/typegoose";
import {add, BasicBulkItem, basicPreSave} from "./BasicModel";
import {BucketInfo} from "../typing/sync";
import md5 from "md5";

@pre<Bulk>('save', basicPreSave)
@index({bulkId: 1},{unique: true})
class Bulk implements BucketInfo{
    /**存储块所属用户*/
    @prop({type: String, required: true,index: true})
    public authUid?: string;

    @prop({type: String, required: true,unique: true})
    public bucketId?: string;

    @prop({type: String, default:""})
    public title?: string;

    @prop({type: [String], default:[]})
    public tables?: string[];

    /**空间过期时间*/
    @prop({type: Date, default:new Date() })
    public expiredAt?: Date;
    /**数据创建时间*/
    @prop({type: Date, default:new Date() })
    public updateAt?: Date;
    /**数据修改时间*/
    @prop({type: Date, default:new Date() })
    public createAt?: Date;
}

const BulkModel = getModelForClass(Bulk)

export async function createBulk(data: Omit<Required<BucketInfo>, 'bucketId'>):Promise<BucketInfo|null> {
    const bulkId = md5(`${Date.now()}${data.authUid}`);
    const bulkInfo: Required<BucketInfo> = {
        authUid: data.authUid,
        title: data.title,
        bucketId: bulkId,
        expiredAt: new Date(Date.now() + 3600 * 100),
        createAt: new Date(),
        updateAt: new Date(),
        tables: ["page","light","snapshot"]
    }
    const list = await add<BucketInfo>(BulkModel, [bulkInfo],{
        bulkId: bulkId,
        authUid: data.authUid,
    });

    return list? list[0]: null
}

export async function getCurrentValidBulk(authUid: string) {
    const result = await BulkModel.findOne({
        authUid: authUid,
        expiredAt: {
            $gt: new Date()
        }
    })

    return result ? result.toObject() : null
}

export default BulkModel;


