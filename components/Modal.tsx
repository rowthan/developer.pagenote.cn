import {ReactElement} from "react";

interface Props {
    open: boolean,
    keepNode?: boolean,
    children: ReactElement
    toggleOpen?: (open: boolean)=>void
}
export default function Modal(props:Props) {
    const {open,keepNode=false,children,toggleOpen} = props;
    if(!open && !keepNode){
        return null;
    }
    return(
        <div className={`modal modal-${props.open?'open':'onClose'}`}>
            <div className="modal-box">
                {
                    toggleOpen &&
                    <label htmlFor="my-modal-3" onClick={()=>{toggleOpen?.(!open)}} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                }

                {children}
            </div>
        </div>
    )
}
