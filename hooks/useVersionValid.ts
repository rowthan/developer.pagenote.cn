import { user } from '@pagenote/shared/lib/extApi'
import extApi from '@pagenote/shared/lib/pagenote-api'
import useSWR from 'swr'
import WhoAmI = user.WhoAmI
import useWhoAmi from './useWhoAmi'
import { useEffect, useState } from 'react'
import { compare } from 'compare-versions'

export interface VersionValid{
    installed: boolean, 
    valid: boolean
}


export default function useVersionValid(requiredVersion='0.0.1'):VersionValid {
   const [whoAmi] = useWhoAmi();
   const [validInfo,setValid] = useState<VersionValid>(function(){
    return {
        installed: !!whoAmi?.version,
        valid: compare(whoAmi?.version||'',requiredVersion,'>='),
    }
   })
  
   useEffect(function(){
    setValid({
        installed: window.location.protocol.indexOf('http') === -1 || !!whoAmi?.version,
        valid: compare(whoAmi?.version||'',requiredVersion,'>='),
    })
   },[requiredVersion, whoAmi?.version])

  return validInfo
}
