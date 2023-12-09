import BasicLayout from "../layouts/BasicLayout";
import ProPlan from "./widget/pro-plan";


export default function Pricing() {
    return(
        <BasicLayout title={'pagenote 价格'} nav={false}>
            <div className={'p-4 pt-16 max-w-7xl mx-auto'}>
                <ProPlan />
            </div>
        </BasicLayout>
    )
}
