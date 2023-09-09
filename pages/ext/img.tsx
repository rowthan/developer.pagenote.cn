import {useRouter} from "next/router";
import useTableQuery from "hooks/useTableQuery";
import {SnapshotResource} from "@pagenote/shared/lib/@types/data";
import RedirectToExt from "components/RedirectToExt";
import Empty from "components/Empty";
import Head from "next/head";
import ForbiddenSvg from 'assets/svg/warn.svg'
import useWhoAmi from "hooks/useWhoAmi";

export default function Img() {
    const router = useRouter();
    const [whoAmI] = useWhoAmi()
    const images = useTableQuery<SnapshotResource>('lightpage', 'snapshot', {
        limit: 1,
        query: {
            key: router.query.id?.toString() || '',
        }
    })

    const image = images[0];

    if (!whoAmI?.origin) {
        return <Empty>
            <div>
                请安装 <a className={'link link-primary'} href="https://pagenote.cn/release">PAGENOTE</a> 插件后，访问此资源。
            </div>
        </Empty>
    }

    return (
        <RedirectToExt>
            <>
                <Head>
                    <title>图片-{image?.alt}</title>
                </Head>
                {
                    image ?
                        <>
                            <div className={'text-sm'}>
                                {
                                    image?.uri ?
                                        <div className={'flex'}>
                                            <ForbiddenSvg height={24}/>
                                            <span className={'ml-1'}>隐私安全提示：请不要分享此
                                                <span className={'tooltip tooltip-bottom'}
                                                      data-tip={image.uri}>图片链接</span>给其他人。
                                            </span>
                                        </div> :
                                        <div>
                                            此图片仅可通过 PAGENOTE 插件查看，无法被互联网访问。
                                        </div>
                                }
                            </div>
                            <img src={image.uri || image.url} alt={image.alt}/>
                        </>
                        : <Empty>
                            在 PAGENOTE 中没有发现图片资源
                        </Empty>
                }
            </>
        </RedirectToExt>
    );
}

Img.defaultProps = {}
