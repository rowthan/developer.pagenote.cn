import extApi from "@pagenote/shared/lib/generateApi";
import useSWR from "swr";
import Tab = chrome.tabs.Tab;

type TabGroups = Tab[];
type WindowMap = Map<number, TabGroups>
export default function useCurrentTab(tabId?: number):{tab: Tab | undefined, windows: TabGroups[] | undefined} {
    const {data: tab} = useSWR<Tab>(`/tab/currentTab/${tabId}`,getTabInfo,)
    const {data: windowTabs} = useSWR<TabGroups[]>(`/tab/windows/${tabId}`,getAllWindows,{
        fallbackData: []
    })

    function getTabInfo() {
        if(tabId){
            return extApi.developer.chrome({
                type: 'get',
                namespace: 'tabs',
                params: tabId
            }).then(function (res) {
                return res.data
            })
        }
        return extApi.commonAction.getCurrentTab().then(function (res) {
            return res.data
        })
    }

    function getAllWindows() {
        return extApi.commonAction.queryTabs({}).then(function (res) {
            const windowMap: WindowMap = new Map<number, TabGroups>()
            res.data.forEach(function (item) {
                const newTabs = (windowMap.get(item.windowId) || []).concat(item)
                windowMap.set(item.windowId,newTabs)
            })
            return Array.from(windowMap.values());
        })
    }

    return {
        tab: tab,
        windows:windowTabs,
    }
}
