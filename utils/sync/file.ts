import LocalFileSystem from '@pagenote/shared/lib/library/localFileSystem'


export async function readForFile(fileSystem: LocalFileSystem,path: string, createOnNotExisit: string):Promise<string>{
    const hasFile = await fileSystem.exists(path);
    if(hasFile){
        console.log('存在',path)
        return fileSystem.readFile(path)
    }else{
        return fileSystem.writeFile(path,createOnNotExisit).then(function(){
            fileSystem.readFile(path);
            return createOnNotExisit;
        })
    }
}