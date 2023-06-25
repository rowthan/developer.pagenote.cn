import useLights from 'hooks/useLights'
import LightItemEditor from './LightItemEditor'

interface Props {
  pageKey: string
  showContext?: boolean
}

export default function LightsEditor(props: Props) {
  const { pageKey, showContext } = props
  const { data: lights = [], mutate } = useLights(pageKey)

  function refresh(lightId: string) {
    console.log(lightId, 'refresh')
    mutate()
  }

  return (
    <div>
      {lights.map((light) => {
        return (
          <LightItemEditor
            showContext={showContext}
            onDelete={refresh}
            key={light.lightId}
            lightid={light.lightId || ''}
            initialLight={light}
          />
        )
      })}
    </div>
  )
}
