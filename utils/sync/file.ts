import LocalFileSystem from '@pagenote/shared/lib/library/localFileSystem'


export async function readForFile(fileSystem: LocalFileSystem,path: string, createOnNotExisit: string):Promise<string>{
    const hasFile = await fileSystem.exists(path);
    if(hasFile){
        const data = await fileSystem.readFile(path);
        if(data){
            return data;
        }else{
            await fileSystem.writeFile(path, createOnNotExisit);
            return createOnNotExisit
        }
    }else{
        await fileSystem.writeFile(path, createOnNotExisit);
        return createOnNotExisit;
    }
}
