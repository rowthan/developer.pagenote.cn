import React, { useEffect } from 'react'
import { basePath } from '../../const/env'

export default function Data() {
  useEffect(() => {
    window.location.href = basePath + '/ext/setting.html#/setting/data'
  }, [])
  return <div className=""></div>
}

Data.defaultProps = {}
