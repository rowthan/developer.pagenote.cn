import BookList from "./BookList";
import {ReactElement, useState} from "react";
import Modal from "components/Modal";

export default function BookDetail(props:{children: ReactElement}) {
    const [showDetail,setShowDetail] = useState(false)

    return(
        <div>
            <div onClick={()=>{setShowDetail(true)}}>
                {props.children}
            </div>
            <Modal open={showDetail} keepNode={false} toggleOpen={setShowDetail}>
                <div className={'mt-4'}>
                    <BookList />
                </div>
            </Modal>
        </div>

    )
}
