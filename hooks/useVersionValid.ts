import useWhoAmi from './useWhoAmi'
import { useEffect, useState } from 'react'
import { compare } from 'compare-versions'

export interface VersionValid {
  installed: boolean
  valid: boolean
}

export default function useVersionValid(
  requiredVersion = '0.0.1'
): VersionValid {
  const [whoAmi] = useWhoAmi()
  const [validInfo, setValid] = useState<VersionValid>(function () {
    return {
      installed: !!whoAmi?.version,
      valid: compare(whoAmi?.version || '0.0.0', requiredVersion, '>='),
    }
  })

  useEffect(
    function () {
      setValid({
        installed:
          window.location.protocol.indexOf('http') === -1 || !!whoAmi?.version,
        valid: compare(whoAmi?.version || '0.0.0', requiredVersion, '>='),
      })
    },
    [requiredVersion, whoAmi?.version]
  )

  return validInfo
}
