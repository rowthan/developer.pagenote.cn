

export enum Collection {
    webpage = 'webpage'
}

export const dbTableMap: Record<Collection, {
    db: string;
    table: string;
}> = {
    [Collection.webpage]:{
        db: 'lightpage',
        table: 'webpage'
    }
}
