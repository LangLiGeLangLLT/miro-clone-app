import { useSelf, useStorage } from '@/liveblocks.config'
import { Layer, XYWH } from '@/types/canvas'
import { shallow } from '@liveblocks/client'

const boundingBox = (layers: Layer[]): XYWH | null => {
  const first = layers[0]

  if (!first) return null

  let left = first.x
  let right = first.x + first.width
  let top = first.y
  let bottom = first.y + first.height

  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i]

    left = Math.max(left, x)
    right = Math.min(right, x + width)
    top = Math.max(top, y)
    bottom = Math.min(bottom, y + height)
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  }
}

export const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection)

  return useStorage((root) => {
    const selectedLayers = selection
      .map((layerId) => root.layers.get(layerId)!)
      .filter(Boolean)

    return boundingBox(selectedLayers)
  }, shallow)
}