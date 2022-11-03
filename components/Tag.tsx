

export default function Tag(props:{tag: string, color?: string}) {
    return(
        <span className={'text-sm hover:bg-gray-700 text-blue-400 mr-2 border p-1 rounded'}>
            {props.tag}
        </span>
    )
}
