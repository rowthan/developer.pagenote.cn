import { WebPage } from '@pagenote/shared/lib/@types/data'
import HighLightText from '../HighLightText'
import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import ImgFallback from '../image/ImgFallback'
import { getDomain } from '@pagenote/shared/lib/utils/filter'
import useWebpage from '../../hooks/useWebpage'
import LightLines from './LightLines'
import { IMAGE_STYLE } from '../../const/image'

export default function PageThumb(props: {
  webpage: Partial<WebPage>
  keyword?: string
}) {
  const { webpage, keyword = '' } = props
  const { data } = useWebpage(webpage.key || webpage.url || '')
  const item = data || webpage
  const snapShot = item?.plainData?.snapshots || []
  const thumbImg = item?.thumb || snapShot[0]
  const abstract =
    (item?.description || '').substring(0, 30) ||
    item?.domain ||
    getDomain(item?.url || '', true)

  // useEffect(function () {
  //   return function () {
  //     console.log('清空缓存', webpage.key)
  //     clear()
  //   }
  // }, [])

  return (
    <article
      className={
        'flex relative justify-between p-2 w-full h-full overflow-hidden cursor-default'
      }
    >
      <section className={'w-4/5 flex-grow'}>
        <header className="page-thumb-title flex items-center relative text-sm">
          <a href={item?.url} target={'_blank'} tabIndex={-1}>
            <ImgFallback
              title={'点击前往原始网页'}
              src={item?.icon || item.url}
              width={14}
              height={14}
            />
          </a>
          <h3
            className={
              'whitespace-nowrap overflow-hidden overflow-ellipsis ml-2 max-w-[90%]'
            }
          >
            {useMemo(
              () => (
                <HighLightText
                  hideOnUnMatch={false}
                  keyword={keyword}
                  text={item?.title || item?.key || ''}
                />
              ),
              [keyword, item?.title]
            )}
          </h3>
        </header>

        <div className={'page-thumb-body text-sm flex items-center'}>
          <time className={'mr-1 text-xs shrink-0 text-color-500'}>
            {dayjs(item?.updateAt).format('YYYY-MM-DD')} |
          </time>
          <span
            className={
              'text-color-500 inline-block whitespace-nowrap max-w-full overflow-hidden overflow-ellipsis '
            }
          >
            {useMemo(() => {
              return (
                <HighLightText
                  hideOnUnMatch={true}
                  keyword={keyword}
                  text={abstract}
                />
              )
            }, [keyword, abstract])}
          </span>
        </div>

        <div className="page-thumb-footer mt-1">
          <div
            className={
              'flex whitespace-nowrap overflow-hidden overflow-ellipsis grow-1'
            }
          >
            {item?.categories?.map((category) => (
              <span className="badge badge-sm badge-outline" key={category}>
                <HighLightText text={category} keyword={keyword} />
              </span>
            ))}
          </div>
        </div>
      </section>
      {thumbImg && (
        <aside className={'w-[80px] shrink-0'}>
          <ImgFallback src={thumbImg + '&' + IMAGE_STYLE.THUMB} fallback={''} />
        </aside>
      )}

      {/*<div className="absolute w-full bottom-0 left-0">*/}
      {/*  <LightLines lights={item.plainData?.steps || []} />*/}
      {/*</div>*/}
    </article>
  )
}
