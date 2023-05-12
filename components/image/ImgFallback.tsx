import { useEffect, useState } from 'react'

interface Props {
  src?: string
  fallback?: string
  alt?: string
  [key: string]: unknown
}
export default function ImgFallback(props: Props) {
  const { src, fallback } = props
  const [imgSrc, setImgSrc] = useState(src || '')
  const [loading, setLoading] = useState(true)

  useEffect(function () {}, [])

  function onLoadError() {
    if (fallback) {
      setImgSrc(fallback || '')
    }
    setLoading(false)
  }

  function onLoad() {
    setLoading(false)
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={props.alt || '加载中'}
      onError={onLoadError}
      onLoad={onLoad}
      onLoadedData={onLoad}
      className={`${props.className} ${loading ? 'loading-block' : ''}`}
      src={imgSrc}
      {...props}
    />
  )
}

ImgFallback.defaultProps = {
  fallback: 'https://pagenote.cn/favicon.ico',
}
