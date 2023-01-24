import TipInfoSvg from 'assets/svg/info.svg'
export default function TipInfo(props:{tip: string,position?: string}) {
    const {tip,position='top'} = props;
    return(
        <span className={`tooltip tooltip-${position} align-bottom`} data-tip={tip}>
            <TipInfoSvg className={'fill-current'} />
        </span>
    )
}
