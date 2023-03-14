import {useForm} from "react-hook-form";
import {RegisterOptions} from "react-hook-form/dist/types/validator";
import {useEffect} from "react";

export type CommonFormField = {
    type?: "text" | string
    name: string,
    options?: RegisterOptions,
    placeholder?: string
}
interface Props {
    fields: CommonFormField[]
    onSubmit: (data: any) => void
    loading?: boolean
    value: any
}

export default function CommonForm(props: Props) {
    const {fields, onSubmit, loading, value} = props;
    const {
        setValue,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: value
    });


    return (
        <div>
            <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit((data) => onSubmit(data))}>
                {
                    fields.map((item) => (
                        <input type={item.type || "text"} className="p-2 m-5 mb-1 rounded-xl border"
                               {...register(item.name, item.options)}
                               placeholder={item.placeholder}/>
                    ))
                }

                <button
                    className={`bg-[#002074] rounded-xl py-2 text-white max-w-full px-10  hover:scale-105 duration-300 btn btn-sm ${loading ? 'loading' : ''}`}>
                    保存
                </button>
            </form>
        </div>
    )
}
