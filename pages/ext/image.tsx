import { type ReactNode, useCallback, useState } from 'react'
import { SnapshotResource } from '@pagenote/shared/lib/@types/data'
import { useRouter } from 'next/router'
import useTableQuery from 'hooks/useTableQuery'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'

interface Props {
  children?: ReactNode
}

export default function Image() {
  const router = useRouter()
  const { pageKey = '', key = '' } = router.query

  const images = useTableQuery<SnapshotResource>('lightpage', 'snapshot', {
    limit: 8,
    query: {
      // $or: [
      //   {
      //     pageKey: pageKey.toString(),
      //   },
      //   {
      //     key: key.toString(),
      //   },
      // ],
    },
  })

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const imageList = images.map(function (item) {
    return {
      source: item.uri || item.url || '',
      src: item.uri || item.url || '',
      alt: item.alt,
      caption: '',
      width: 4,
      height: 3,
    }
  })
  return (
    <div className="bg-white m-4">
      {/*<Carousel views={imageList} />*/}
      <Gallery margin={4} photos={imageList}></Gallery>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={imageList.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : (
          <div></div>
        )}
      </ModalGateway>
    </div>
  )
}

Image.defaultProps = {}
