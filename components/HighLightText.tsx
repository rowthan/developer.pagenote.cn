
export default function HighLightText(props:{keyword: string, text?: string, hideOnUnMatch?: boolean}) {
    const {keyword,text, hideOnUnMatch=true} = props;
    if(!text || (hideOnUnMatch && text.indexOf(keyword)===-1)){
        return null;
    }

    const regex = new RegExp(keyword,"ig")

    const html = text.replace(regex,function (word) {
        return `<mark>${word}</mark>`
    })
    return (
        <span dangerouslySetInnerHTML={{__html: html}}></span>
    )
}
