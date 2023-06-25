import ImgFallback from 'components/image/ImgFallback'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  children?: ReactNode
  thumbs?: {
    img: string
  }[]
  initHeight?: number | string
}

export default function PageHead({ children, thumbs = [], initHeight }: Props) {
  const [height, setHeight] = useState<number>(function () {
    return typeof initHeight === 'string' ? Number(initHeight) : 200
  })
  const ref = useRef<HTMLDivElement>(null)

  const changeHeight = useCallback(
    function (offsetHeight: number) {
      console.log(height + offsetHeight, height)
      setHeight(height + offsetHeight)
    },
    [height]
  )

  useEffect(function () {
    if (!ref.current) {
      return
    }
  }, [])

  return (
    <header
      className="block group h-56 relative"
      style={{ height: `${height}px` }}
    >
      <Swiper
        // key={thumbs}
        className="h-full w-full !absolute left-0 top-0"
        spaceBetween={5}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.head-swiper',
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Pagination]}
      >
        {thumbs.map((item, index) => (
          <SwiperSlide key={item.img}>
            <div className="overflow-hidden h-full absolute w-full left-0 top-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-fit" src={item.img} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-full h-full absolute bottom-0 z-10">
        <div className="swiper-pagination head-swiper z-10"></div>
        <div className="max-w-7xl m-auto w-full h-full relative z-20">
          {children}
        </div>
      </div>
      {/*尺寸调整*/}
      <div
        ref={ref}
        className="invisible group-hover:visible absolute bottom-0 w-full h-2 border-dashed border-b border-white "
        style={{ cursor: 'row-resize' }}
      ></div>
    </header>
  )
}
