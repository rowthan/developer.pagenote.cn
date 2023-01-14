import {useState} from 'react'
import  {setting} from "@pagenote/shared/lib/extApi";
import SETTING = setting.SDK_SETTING;
import extApi from "@pagenote/shared/lib/generateApi";
import useSWR from "swr";
import getDefaultSdkSetting = setting.getDefaultSdkSetting;

type SDK_SETTING = SETTING

export default function useSettings():{
    data: SDK_SETTING,
    update:(newSet:Partial<SDK_SETTING>,callback?:()=>void)=>void,
    loading: boolean
    mutate: ()=>void
} {
    const [loading,setLoading] = useState<boolean>(false);
    const {data:settings = getDefaultSdkSetting(),mutate} = useSWR<SDK_SETTING>('/setting',fetchLocalAndServerSetting,{
        fallbackData: setting.getDefaultSdkSetting(),
    })

    function fetchLocalAndServerSetting (){
        setLoading(true);
        return extApi.setting.getUserSetting().then((result)=>{
            setLoading(false)
            return result.data || setting.getDefaultSdkSetting();
        }).catch(function () {
            return setting.getDefaultSdkSetting()
        })
    }

    function update(newSet: null | Partial<SDK_SETTING>,callback?:()=>void) {
        const callbackFun = function () {
            setLoading(false);
            typeof callback==='function' && callback();
        }
        setLoading(true);
        if(newSet===null){
            extApi.setting.resetSetting(undefined).then(function () {
                mutate()
                callbackFun()
            })
        } else {
            extApi.setting.saveSetting(newSet).then(function () {
                mutate()
                callbackFun()
            })
        }
    }

    return {
        data:settings,
        update:update,
        loading:loading,
        mutate: mutate,
    }
}
