import {SnapshotResource, Step, WebPage} from "@pagenote/shared/lib/@types/data";

export type TableNameType = 'page' | 'light' | 'snapshot';
export type DataTypes = WebPage | Step | SnapshotResource;

export type DataBasic = {
    key: string
    updateAt: number
}
