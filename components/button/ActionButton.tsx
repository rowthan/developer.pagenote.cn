import {type ReactNode} from 'react';
import classNames from "classnames";
import KeyboardTip from "../KeyboardTip";

type Props = {
    children?: ReactNode;
    tip?: string
    keyboard?: string
    active?: boolean,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function ActionButton(props: Props) {
    const {children, tip, active, keyboard = '', className, ...left} = props;
    return (
        <KeyboardTip command={keyboard}>
            <button
                data-tip={tip}
                className={
                    classNames(`flex justify-center items-center btn btn-sm text-center text-lg p-0 w-8 h-8 rounded btn-outline tooltip-bottom`, className, {
                        tooltip: !!tip,
                        'btn-primary': active,
                    })}
                {...left}>
                {children}
            </button>
        </KeyboardTip>
    );
}

ActionButton.defaultProps = {}
