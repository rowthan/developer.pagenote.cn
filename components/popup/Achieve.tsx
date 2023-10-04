import React from 'react'
import { OfflineButton, CaptureButton, LightInfo } from './state/OfflineButton'

interface Props {
  pageKey?: string
}

export default function Achieve() {
  return (
    <div className="">
      <div className={'flex gap-8'}>
        <CaptureButton />
        <OfflineButton />
        <LightInfo />
      </div>
    </div>
  )
}

Achieve.defaultProps = {}
