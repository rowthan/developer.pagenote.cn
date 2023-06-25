import { Step } from "@pagenote/shared/lib/@types/data";
import { useState } from "react";

interface LightLinesProps{
    lights: Step[];
}

function getPlainText(text: string){
    return text.replace(/<[^>]*>/g,"")
}
const MAX_TEXT_LENGTH = 40;
export default function LightLines(props: LightLinesProps){
    const {lights} = props;
    const [activeIndex,setActiveIndex] = useState(-1);
    const textLength = Math.floor(MAX_TEXT_LENGTH / lights.length);
    const width = lights.length === 1 ? 'auto' : 1/lights.length * 100 + '%';
    return(
        <div className="flex max-w-full relative"
            onMouseLeave={()=>{setActiveIndex(-1)}}
         >
            <div className="absolute bottom-0 z-10 w-full text-sm p-1 duration-75 pb-2 text-black" style={{backgroundColor: lights[activeIndex]?.bg}}>
                {lights[activeIndex]?.text}
            </div>
            <div className="absolute bottom-0 z-20 w-full flex">
                {
                    lights.map((light,index)=>(
                        <div key={index} 
                        onMouseEnter={()=>{setActiveIndex(index)}}
                        className="text-xs opacity-80 whitespace-nowrap overflow-hidden overflow-ellipsis h-3 mr-[1px]" 
                        style={{
                            maxWidth: '10em',
                            width: width,
                            borderBottom: `2px solid ${light.bg}`,
                            // backgroundColor: light.bg,
                        }}>
                            {/* {getPlainText(light.text||'').substring(0,textLength)} */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}