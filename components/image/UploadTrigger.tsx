import React, {ReactElement} from "react";

export default function UploadTrigger(props:{onChange:(imgSrc: string)=>void,children: ReactElement}) {
    const {onChange,children} = props
    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                onChange(reader.result?.toString() || ''),
            )
            // @ts-ignore
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return(
        <label className="">
            {children}
            <input style={{display:"none"}} type="file" accept="image/*" onChange={onSelectFile} />
        </label>
    )
}
