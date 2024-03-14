'use client'

import React from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { CanvasMode, CanvasState } from '@/types/canvas'
import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config'

export default function Canvas({ boardId }: { boardId: string }) {
  const [canvasState, setCanvasState] = React.useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

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
    </main>
  )
}
