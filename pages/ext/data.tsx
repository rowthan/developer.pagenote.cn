import React, { useEffect } from 'react'
import { basePath } from 'const/env'

export default function Data() {
  useEffect(() => {
    window.location.href = basePath + '/ext/setting.html#/setting/data'
  }, [])
  return <div className="">前往新页面</div>
}

Data.defaultProps = {}
