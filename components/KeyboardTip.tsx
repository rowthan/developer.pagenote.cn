import useShortcut from "../hooks/useShortcut";
import {ReactElement} from "react";

export default function KeyboardTip(props:{command: string,children?: ReactElement}) {
    const {command='',children=null} = props;
    const [_commands,commandMap={}] = useShortcut();

    const shortcut = commandMap[command]?.shortcut;
    if(!shortcut){
        return children;
    }
    return(
        <div className={'relative w-fit h-fit group'}>
            {children}
            <div
                className={'pointer-events-none flex items-center justify-center absolute left-0 top-0 w-full h-full  transition-all duration-200 opacity-0 group-hover:opacity-100'}>
                <span className={'kbd kbd-xs text-xs text-neutral'}>{shortcut}</span>
            </div>
        </div>
    )
}
