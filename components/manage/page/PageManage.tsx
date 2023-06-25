import ContextProvider from 'store/ContextProvider'
import OutLines from './Outline'
import { PageList } from './PageList'
import PageDetail from './PageDetail'
import Space, {
  Fill,
  Fixed,
  Right,
  Left,
  Top,
  Bottom,
  LeftResizable,
  RightResizable,
  ViewPort,
  BottomResizable,
  TopResizable,
} from 'react-spaces'
import { useEffect, useMemo, useState } from 'react'
import PageListBottom from './PageLIstBottom'
import OutLineTop from './OutLineTop'
import OutLineBottom from './OutLineBottom'

const LAYOUT_TOP_HEIGHT = 50
const LAYOUT_BOTTOM_HEIGHT = 50
export default function PageManage() {
  function description(value: string) {
    return value
  }

  const [show, setShow] = useState(false)

  useEffect(function () {
    setShow(true)
  }, [])

  if (!show) {
    return null
  }
  return (
    // 共享state上下文
    <ContextProvider>
      <ViewPort allowOverflow={false}>
        <LeftResizable
          size="40%"
          minimumSize={400}
          maximumSize={900}
          allowOverflow={false}
          trackSize={false}
        >
          <LeftResizable size={'40%'} maximumSize={350}>
            <Top size={LAYOUT_TOP_HEIGHT}>
              <OutLineTop />
            </Top>
            <Fill>
              <OutLines />
            </Fill>
            <Bottom size={LAYOUT_BOTTOM_HEIGHT} className={'flex items-center'}>
              <OutLineBottom />
            </Bottom>
          </LeftResizable>

          <Fill className="border border-right border-left border-gray-500 select-none">
            {/* <Top size={LAYOUT_TOP_HEIGHT}>
              <div>top</div>
            </Top> */}
            <Fill scrollable={false}>{/*<PageList />*/}</Fill>
            <Bottom size={LAYOUT_BOTTOM_HEIGHT} className={'flex items-center'}>
              {/*<PageListBottom />*/}
            </Bottom>
          </Fill>
        </LeftResizable>
        <Fill allowOverflow={false}>{/*<PageDetail />*/}</Fill>
        {/* <RightResizable size={'60%'} minimumSize={300} allowOverflow={false} trackSize={false}>

            </RightResizable> */}
      </ViewPort>
    </ContextProvider>
  )
}
