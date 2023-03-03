import React, {useState, useRef, ReactElement, useEffect} from 'react'

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import {imgPreview} from "./imgPreview";

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

type Props =  {
    preViewCanvas?: HTMLCanvasElement | null,
    originImgSrc: string,

    children: ReactElement
}

export default function ImageShape(props:Props) {
    const {originImgSrc,preViewCanvas,children} = props;
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement|null>(null)
    const imgRef = useRef<HTMLImageElement|null>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState<number | undefined>(1 / 1)

    useEffect(function () {
        setImgSrc(originImgSrc)
    },[originImgSrc])

    function onFinished() {
        previewCanvasRef.current?.toBlob(function () {

        })
    }



    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                (previewCanvasRef.current || preViewCanvas)
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current as HTMLImageElement,
                    preViewCanvas || previewCanvasRef.current as HTMLCanvasElement,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate, originImgSrc],
    )

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined)
        } else if (imgRef.current) {
            const { width, height } = imgRef.current
            setAspect(16 / 9)
            setCrop(centerAspectCrop(width, height, 16 / 9))
        }
    }

    return (
        <div className="App">
            {!!imgSrc && (
                <ReactCrop
                    maxWidth={256}
                    maxHeight={256}
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    circularCrop={true}
                >
                    <img
                        crossOrigin="anonymous"
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, minHeight:'128px' }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            <div>
                {!preViewCanvas && !!completedCrop && (
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            border: '1px solid black',
                            objectFit: 'contain',
                            width: completedCrop.width,
                            height: completedCrop.height,
                        }}
                    />
                )}
            </div>
            {children}
        </div>
    )
}
