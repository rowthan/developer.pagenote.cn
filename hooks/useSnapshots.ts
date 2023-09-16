import { SnapshotResource } from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/pagenote-api";
import { useEffect, useState } from "react";
import useSWR from "swr";


export default function useSnapshots(keys: string[]=[]): [Partial<SnapshotResource>[]]{
    // const {data=[]} = useSWR(function(){
    //     return '/developer/data/'+keys
    // },fetchData)
    const [data,setData] = useState<Partial<SnapshotResource>[] | null>(null);

    useEffect(function(){
        if(keys.length && data === null){
            fetchData().then(function(res){
                setData(res || []);
            })
        }
    },[keys])

    function fetchData (){
        return extApi.snapshot.query({
            query:{
                key: {
                    $in: keys
                }
            }
        }).then(function(res){
            console.log(keys,res,'---')
            return res.data?.list || []
        })
    }

    return [data || []]
}
