import UserCard from "../components/account/UserCard";
import BasicLayout from "../layouts/BasicLayout";

export default function Account() {
    return(
        <BasicLayout nav={false} title={'用户信息'} description={'我的PAGENOTE用户信息'}>
            <div className="mx-auto max-w-xl">
                <UserCard />
            </div>
        </BasicLayout>
    )
}
