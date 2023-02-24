import  {setting} from "@pagenote/shared/lib/extApi";
import extApi from "@pagenote/shared/lib/pagenote-api";
import useSWR from "swr";
import ISearchEngine = setting.ISearchEngine;


type IConfig = {
    rootPage: string,
    clipboard: string,
    page: string,
    light: string,
} | undefined
export default function useNotionConfig(): IConfig{
    const {data} = useSWR<IConfig>('/notion_config',fetchLocalAndServerSetting)

    function fetchLocalAndServerSetting (){
        return extApi.setting.getSearchEngines().then((result)=>{
            return {
                ...data,
                searchEngines: result.data
            };
        })
    }

    return data
}
