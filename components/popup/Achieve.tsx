import React from 'react'
import { PageInfo, CaptureButton, LightInfo } from './state/PageInfo'

interface Props {
  pageKey?: string
}

export default function Achieve() {
  return (
    <div className="">
      <div className={'flex gap-8'}>
        <CaptureButton />
        <PageInfo />
        <LightInfo />
      </div>
    </div>
  )
}

Achieve.defaultProps = {}
