import React from 'react'
import { CaptureButton, LightInfo, PageInfo } from './state/PageInfo'

interface Props {
  pageKey?: string
}

export default function Achieve() {
  return (
    <div className="">
      <div className={'flex gap-4 items-center'}>
        <CaptureButton />
        <PageInfo />
        <LightInfo />
      </div>
    </div>
  )
}

Achieve.defaultProps = {}
