
export default function HighLightText(props:{keyword: string, text?: string, hideOnUnMatch?: boolean}) {
    const {keyword,text, hideOnUnMatch=false} = props;

    const words = keyword.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').split(/\s+/)
    const regex = new RegExp(words.join("|"),"ig")

    if(!text || (hideOnUnMatch && !regex.test(text))){
        return null;
    }


    const html = text.replace(regex,function (word) {
        return `<mark>${word}</mark>`
    })
    return (
        <span dangerouslySetInnerHTML={{__html: html}}></span>
    )
}
