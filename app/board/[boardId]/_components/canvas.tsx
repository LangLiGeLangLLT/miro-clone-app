'use client'

import React from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from '@/liveblocks.config'
import CursorsPresence from './cursors-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'

export default function Canvas({ boardId }: { boardId: string }) {
  const [canvasState, setCanvasState] = React.useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [camera, setCamera] = React.useState<Camera>({ x: 0, y: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

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

      setMyPresence({ cursor: current })
    },
    []
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

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
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
