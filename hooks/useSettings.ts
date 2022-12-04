import {useState} from 'react'
import  {setting} from "@pagenote/shared/lib/extApi";
import SETTING = setting.SDK_SETTING;
import extApi from "@pagenote/shared/lib/generateApi";
import useSWR,{mutate} from "swr";
import getDefaultSdkSetting = setting.getDefaultSdkSetting;

type SDK_SETTING = SETTING

export default function useSettings():[settings: SDK_SETTING, update:(newSet:Partial<SDK_SETTING>,callback?:()=>void)=>void, loading: boolean] {
    const [loading,setLoading] = useState<boolean>(false);
    const {data:settings = getDefaultSdkSetting()} = useSWR<SDK_SETTING>('/setting',fetchLocalAndServerSetting,{
        fallbackData: setting.getDefaultSdkSetting(),
    })

    function fetchLocalAndServerSetting (){
        setLoading(true);
        console.log('fetch settings')
        return extApi.setting.getSetting().then((result)=>{
            setLoading(false)
            return result.data || setting.getDefaultSdkSetting();
        }).catch(function () {
            return setting.getDefaultSdkSetting()
        })
    }

    const update = function (newSet:Partial<SDK_SETTING>,callback?:()=>void) {
        const callbackFun = function () {
            setLoading(false);
            typeof callback==='function' && callback();
        }
        setLoading(true);
        if(newSet===null){
            extApi.setting.resetSetting(undefined).then(function () {
                mutate('/setting')
                callbackFun()
            })
        } else {
            extApi.setting.saveSetting(newSet).then(function () {
                mutate('/setting')
                callbackFun()
            })
        }
    }

    return [settings,update,loading]
}
