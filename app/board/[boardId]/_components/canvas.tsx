'use client'

import React from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from '@/types/canvas'
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useStorage,
} from '@/liveblocks.config'
import CursorsPresence from './cursors-presence'
import {
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
} from '@/lib/utils'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'
import LayerPreview from './layer-preview'
import SelectionBox from './selection-box'
import SelectionTools from './selection-tools'

const MAX_LAYERS = 100

export default function Canvas({ boardId }: { boardId: string }) {
  const layerIds = useStorage((root) => root.layerIds)

  const [canvasState, setCanvasState] = React.useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [camera, setCamera] = React.useState<Camera>({ x: 0, y: 0 })
  const [lastUsedColor, setLastUsedColor] = React.useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get('layers')
      if (liveLayers.size >= MAX_LAYERS) {
        return
      }

      const liveLayerIds = storage.get('layerIds')
      const layerId = nanoid()
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      })

      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)

      setMyPresence(
        {
          selection: [layerId],
        },
        { addToHistory: true }
      )
      setCanvasState({ mode: CanvasMode.None })
    },
    [lastUsedColor]
  )

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      }

      const liveLayers = storage.get('layers')

      for (const layerId of self.presence.selection) {
        const layer = liveLayers.get(layerId)

        if (layer) {
          layer.update({
            x: layer.get('x') + offset.x,
            y: layer.get('y') + offset.y,
          })
        }
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      })
    },
    [canvasState]
  )

  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }

    setMyPresence({ selection: [] }, { addToHistory: true })
  }, [])

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      )

      const liveLayers = storage.get('layers')
      const layer = liveLayers.get(self.presence.selection[0])

      if (layer) {
        layer.update(bounds)
      }
    },
    [canvasState]
  )

  const onResizeHandlePointerDown = React.useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause()
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      })
    },
    [history]
  )

  const onWheel = React.useCallback((event: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - event.deltaX,
      y: camera.y - event.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(
    ({ setMyPresence }, event: React.PointerEvent) => {
      event.preventDefault()

      const current = pointerEventToCanvasPoint(event, camera)

      if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current)
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current)
      }

      setMyPresence({ cursor: current })
    },
    [camera, canvasState, resizeSelectedLayer, translateSelectedLayers]
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (canvasState.mode === CanvasMode.Inserting) {
        return
      }

      setCanvasState({
        origin: point,
        mode: CanvasMode.Pressing,
      })
    },
    [camera, canvasState.mode, setCanvasState]
  )

  const onPointUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayers()

        setCanvasState({
          mode: CanvasMode.None,
        })
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point)
      } else {
        setCanvasState({ mode: CanvasMode.None })
      }

      history.resume()
    },
    [camera, canvasState, history, insertLayer, unselectLayers]
  )

  const selections = useOthersMapped((other) => other.presence.selection)

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return
      }

      history.pause()
      e.stopPropagation()

      const point = pointerEventToCanvasPoint(e, camera)

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [setCanvasState, camera, history, canvasState.mode]
  )

  const layerIdsToColorSelection = React.useMemo(() => {
    const layerIdsToColorSelection: Record<string, any> = {}

    for (const user of selections) {
      const [connectionId, selection] = user

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
      }
    }

    return layerIdsToColorSelection
  }, [selections])

  return (
    <main className="min-h-screen relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
