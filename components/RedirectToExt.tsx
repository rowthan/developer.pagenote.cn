import useWhoAmi from "../hooks/useWhoAmi";
import {ReactElement, useEffect} from "react";

export default function RedirectToExt(props:{children: ReactElement}) {
    const [whoAmI] = useWhoAmi();
    useEffect(function () {
        const origin = whoAmI?.origin;
        if(!origin){
            return;
        }
        const currentOrigin = window.location.origin;
        const site = window.location.href.replace(currentOrigin,origin)
        if(site){
            const url = new URL(site);
            let path = url.pathname;
            if(!/^web/.test(path)){
                path ='/web' + path;
            }
            if(!/html/.test(path)){
                path += '.html'
            }
            url.pathname = path;
            window.location.href = url.href;
        }
    },[whoAmI])
    return (props.children)
}
