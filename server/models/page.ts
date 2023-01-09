import { getModelForClass, index, pre, prop} from "@typegoose/typegoose";
import {basicPreSave} from "./BasicModel";
import {DataVersion, PAGE_TYPES, WebPage} from "@pagenote/shared/lib/@types/data";

type OmitProperty =
    'plainData'|'directory'|'customTitle'|'hash'|'visitedAt'|'filename'|'sessionId'|'lastSyncTime'|'etag'|'mtimeMs'|'lastmod'
@pre<Page>('save', basicPreSave)
@index({bulkId: 1, key: 1}, {unique: true})
class Page implements Omit<Required<WebPage>,OmitProperty> {
    /**存储块所属用户*/
    @prop({type: String, required: true,index: true})
    public authUid?: string;

    @prop({type: String, required: true})
    public bulkId?: string;

    @prop({type: String, index: true, default: PAGE_TYPES.http})
    public pageType: PAGE_TYPES;

    @prop({type: String, required: true, index: true})
    public key: string;

    @prop({type: String, required: true, index: true})
    public url: string;

    @prop({type: [String], default: []})
    public urls: string[];

    @prop({type: String, default:""})
    public path: string;

    @prop({type: String, default:""})
    public title: string;

    @prop({type: String, default:""})
    public description: string;

    @prop({type: String, default:""})
    public domain: string;

    @prop({type: String, default:""})
    public icon: string;

    @prop({type: String, default:""})
    public cover: string;

    @prop({type: String, default:""})
    public thumb: string;

    @prop({type: [String], default: []})
    public categories: string[];

    @prop({type: String, default:""})
    public version: DataVersion;

    @prop({type: String, default:""})
    public did: string;

    @prop({type: String, default:""})
    public extVersion: string;


    @prop({type: Object})
    public sdkSetting: any;


    /**数据创建时间*/
    @prop({type: Number, default:Date.now() })
    public updateAt: number;
    /**数据修改时间*/
    @prop({type: Number, default:Date.now() })
    public createAt: number;

    @prop({type: Number, default:Date.now() })
    public expiredAt: number;


    /**归档、回收站标记*/
    @prop({type: Boolean})
    public deleted: boolean;

    @prop({type: Boolean})
    public achieved: boolean;
}

const PageModel = getModelForClass(Page)

export async function addPage(bulk:{bulkId: string, authUid: string}, page: WebPage) {
    const {bulkId,authUid} = bulk;
    PageModel.create({
        ...page,
        bulkId: bulkId,
        authUid: authUid,
    })
}

PageModel.findOne

export default PageModel;


