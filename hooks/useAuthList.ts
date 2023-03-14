import useSWR from "swr";
import extApi from "@pagenote/shared/lib/pagenote-api";

const authOrigin = 'https://pagenote.cn'
const githubCallbackUrl = `${authOrigin}/oauth_callback.html`;
const notionAuthCallbackUrl = `${authOrigin}/notion_callback.html`
export const NotionLoginUrl = `https://api.notion.com/v1/oauth/authorize?client_id=3f5182ae-a3a4-46b1-8e17-b1e9f2c7e37a&response_type=code&owner=user&redirect_uri=${notionAuthCallbackUrl}`;

type PlatInfo = { platformUrl: string, platformIcon: string, bindUrl: string }

type AuthInfo = {
    authType: string,
    authName: string,

    avatar?: string

} & PlatInfo

const authMap: Record<string, PlatInfo> = {
    'github':{
        platformUrl:"https://github.com/settings/installations",
        platformIcon: "https://github.githubassets.com/favicons/favicon.svg",
        bindUrl: `https://github.com/login/oauth/authorize?scope=user%20repo&client_id=Iv1.fbdc49e54f75d9af&allow_signup=true&redirect_uri=${githubCallbackUrl}`
    },
    "notion":{
        platformUrl:"https://www.notion.so/my-integrations",
        platformIcon: "https://www.notion.so/images/favicon.ico",
        bindUrl: NotionLoginUrl
    },
}
function fetchAuthList(cacheDuration=5 * 60 * 1000) {
    return extApi.network.pagenote({
        data: {
            query:`query{authList{authType,authName}}`
        },
        method: 'GET',
        url: "/api/graph/user/",
        _config:{
            cacheDuration: cacheDuration,
        }
    },{

    }).then(function (res) {
        const list = (res.data?.json?.data?.authList || []) as AuthInfo[];
        const authedMap: Record<string, AuthInfo> = {}
        list.forEach(function (item) {
            authedMap[item.authType.toLowerCase()] = {
                ...item,
                ...authMap[item.authType.toLowerCase()]
            }
        });

        return ['github','notion'].map(function (item) {
            return authedMap[item] || authMap[item]
        })
    })
}

export default function useAuthList():[AuthInfo[],()=>void,(cache: number)=>Promise<any>] {
    const {data=[],mutate} = useSWR<AuthInfo[]>('/authList',fetchAuthList);

    return [data,mutate,fetchAuthList]
}
