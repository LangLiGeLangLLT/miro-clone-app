'use client'

import { useStorage } from '@/liveblocks.config'
import { LayerType } from '@/types/canvas'
import React from 'react'
import Rectangle from './rectangle'

const LayerPreview = React.memo(function LayerPreview({
  id,
  onLayerPointerDown,
  selectionColor,
}: {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}) {
  const layer = useStorage((root) => root.layers.get(id))

  if (!layer) return null

  switch (layer.type) {
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    default:
      return null
  }
})

LayerPreview.displayName = 'LayerPreview'

export default LayerPreview
