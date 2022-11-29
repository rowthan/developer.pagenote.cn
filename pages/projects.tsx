import {useEffect} from "react";
import {useRouter} from "next/router";

export default function () {
    const router = useRouter();
    useEffect(function () {
        router.replace('/developer/project')
    },[])

    return(
        <div>

        </div>
    )
}
