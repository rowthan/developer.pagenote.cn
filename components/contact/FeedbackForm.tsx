import {useState} from "react";
import CheckUser from "../check/CheckUser";
import extApi from "@pagenote/shared/lib/generateApi";
import useDataStat from "../../hooks/useDataStat";
import {toast} from "../../utils/toast";
import useWhoAmi from "../../hooks/useWhoAmi";
import useSettings from "../../hooks/useSettings";
import CheckVersion from "../check/CheckVersion";

enum SubmitState {
    un_submit = 0,
    submiting = 1,
    success = 2
}

export default function () {
    const [formData, setFormData] = useState<{ title?: string, description?: string, feedbackType: number, uploadStat: boolean }>({
        feedbackType: 1,
        title: '',
        description: '',
        uploadStat: false,
    })
    const [dataStat] = useDataStat();
    const [whoAmI] = useWhoAmi();
    const [settings] = useSettings();


    const [submitState, setSubmitState] = useState<SubmitState>(SubmitState.un_submit);
    const [feedbackId, setFeedbackId] = useState('');


    function changeValue(object: Object) {
        setFormData({
            ...formData,
            ...object,
        })
    }

    function submitFeedback() {
        setSubmitState(SubmitState.submiting)
        const data = {
            userAgent: navigator.userAgent,
        }
        if (formData.uploadStat) {
            // @ts-ignore
            data.extInfo = {
                whoAmI: whoAmI,
                settings: settings,
                dataStat: dataStat,
            };
        }
        const extraInfo = JSON.stringify(data)
        const postData = {
            feedbackType: formData.feedbackType,
            title: formData.title,
            content: formData.description,
            extraInfo: extraInfo,
        }
        extApi.network.pagenote({
            url: '/api/graph/user',
            method: 'POST',
            data: {
                'mutation': `mutation makeFeedBack($title: String,$content: String $feedbackType: Float,$extraInfo: String){
                    postFeedback(title:$title,content:$content,feedbackType:$feedbackType,extraInfo:$extraInfo){
                        feedbackId
                    }
                }`,
                variables: postData
            }
        },{
            timeout: 8000,
        }).then(function (res) {
            if (res.success && res.data.json.success) {
                setFeedbackId(res.data.json?.data?.postFeedback?.feedbackId)
            } else {
                toast('????????????')
            }
            console.log(res, '--????????????')

            setSubmitState(SubmitState.un_submit)
        })
    }

    return (
        <CheckUser>
            <CheckVersion requireVersion={'0.24.4'}>
                <div className='w-full max-w-md'>
                <div className="form-control  ">
                    <label className="label">
                        <span className="label-text">?????????????</span>
                    </label>
                    <select value={formData.feedbackType}
                            onChange={(e) => {
                                changeValue({feedbackType: Number(e.target.value)})
                            }}
                            className="select select-primary">
                        <option disabled>?????????????????????</option>
                        <option value={1}>bug:????????????</option>
                        <option value={2}>bug:????????????</option>
                        <option value={3}>idea:?????????????????????</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">???????????????????</span>
                    </label>
                    <input value={formData.title}
                           onChange={(e) => {
                               changeValue({title: e.target.value})
                           }}
                           type="text"
                           placeholder="????????????"
                           className="input input-bordered"/>
                </div>

                {/*<div className="">*/}
                {/*    <label className="label">*/}
                {/*        <span className="label-text">??????????????????</span>*/}
                {/*    </label>*/}
                {/*    <div>*/}
                {/*        <span>*/}
                {/*            <input type="radio" name="radio-4" className="radio radio-accent" checked />*/}
                {/*            <span>???????????????</span>*/}
                {/*        </span>*/}
                {/*        <span>*/}
                {/*            <input type="radio" name="radio-4" className="radio radio-accent" />*/}
                {/*            <span>???????????????</span>*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/*<div className="form-control">*/}
                {/*    <label className="label">*/}
                {/*        <span className="label-text">????????????????????????</span>*/}
                {/*    </label>*/}
                {/*    <input value={formData.title} onChange={(e)=>{changeValue({title:e.target.value })}} type="text" placeholder="??????" className="input input-bordered w-full max-w-xs" />*/}
                {/*</div>*/}

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">?????????????</span>
                        {
                            !formData.description &&
                            <span className="label-text-alt text-error">?????????????????????</span>
                        }
                    </label>
                    <textarea value={formData.description}
                              onChange={(e) => {
                                  changeValue({description: e.target.value})
                              }}
                              className="textarea"
                              placeholder="???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"></textarea>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">
                            ??????????????????????????????????????????????????????
                        </span>
                        <input type="checkbox"
                               onChange={(e) => {
                                   changeValue({uploadStat: e.target.checked})
                               }}
                               checked={formData.uploadStat} className="checkbox"/>
                    </label>
                </div>

                <div className='flex justify-end my-2'>
                    <button disabled={!formData.description || submitState === SubmitState.submiting}
                            className={`${submitState === SubmitState.submiting ? 'loading' : ''} btn btn-sm`}
                            onClick={submitFeedback}>
                        ??????
                    </button>
                </div>

                {
                    feedbackId &&
                    <div className="modal modal-open">
                        <div className="modal-box relative">
                            <label htmlFor="my-modal-3" onClick={() => setFeedbackId('')}
                                   className="btn btn-sm btn-circle absolute right-2 top-2">???</label>
                            <h3 className="text-lg font-bold">?????????????????????!</h3>
                            <p className="py-4">
                                ?????????????????????????????????????????????????????????????????????<br/>
                                ??????????????????ID???<kbd>{feedbackId}</kbd>???????????????????????????
                            </p>
                        </div>
                    </div>
                }
            </div>
            </CheckVersion>
        </CheckUser>
    )
}
