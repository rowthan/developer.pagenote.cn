import BlogLayout from "../../layouts/blog";
import useWhoAmi from "../../hooks/useWhoAmi";
import {useEffect, useState} from "react";
import {WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/generateApi";
import dayjs from 'dayjs';
import Breadcrumbs from "../../components/Breadcrumbs";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import BasicLayout from "../../layouts/BasicLayout";
import ExtensionInfos from "components/ExtensionInfos";
import Logs from "../../components/debug/Logs";
import FeedbackForm from "../../components/contact/FeedbackForm";
import FeedbackList from "../../components/contact/FeedbackList";

export default function () {
    const [showForm, setShowForm] = useState(false)

    useEffect(function () {

    }, [])


    return (
        <BasicLayout title={'反馈问题'} description={'联系开发者'}>
            <div className="flex w-full">
                <div className="flex-grow card bg-base-300 rounded-box min-w-4xl p-4">
                    <ExtensionInfos/>
                    <Logs/>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid flex-grow card bg-base-300 rounded-box p-4">
                    {
                        showForm ? <FeedbackForm/> :
                        <div className='flex align-center text-center justify-center items-center'>
                            <div>
                                <div className='text-sm text-gray-400'>
                                    请根据左侧日志、提示了解当前插件运行状态，如仍无法解决请：
                                </div>
                                <button className='btn' onClick={()=>{setShowForm(true)}}>反馈问题</button>
                            </div>
                        </div>
                    }
                    <FeedbackList />
                </div>
            </div>
        </BasicLayout>
    )
}
