import {type ReactNode} from 'react';
import {Step} from "@pagenote/shared/lib/@types/data";

interface Props {
    children?: ReactNode;
    lights: Step[]
}

export default function ThumbLights(props: Props) {
    const {children} = props;
    return (
        <div className="">
            {children}
        </div>
    );
}

ThumbLights.defaultProps = {}
