import TipInfoSvg from 'assets/svg/info.svg'
export default function TipInfo(props:{tip: string}) {
    const {tip} = props;
    return(
        <span className={'tooltip tooltip-top align-bottom'} data-tip={tip}>
            <TipInfoSvg />
        </span>
    )
}
