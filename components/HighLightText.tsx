
export default function HighLightText(props:{keyword: string, text?: string, hideOnUnMatch?: boolean}) {
    const {keyword,text, hideOnUnMatch=true} = props;
    const regex = new RegExp(keyword,"i")

    if(!text || (hideOnUnMatch && !regex.test(keyword))){
        return null;
    }


    const html = text.replace(regex,function (word) {
        return `<mark>${word}</mark>`
    })
    return (
        <span dangerouslySetInnerHTML={{__html: html}}></span>
    )
}
