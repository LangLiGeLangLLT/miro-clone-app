'use client'

import { useOthersConnectionIds, useOthersMapped } from '@/liveblocks.config'
import React from 'react'
import Cursor from './cursor'
import { shallow } from '@liveblocks/client'
import Path from './path'
import { colorToCss } from '@/lib/utils'

const Cursors = () => {
  const connectionIds = useOthersConnectionIds()

  return (
    <>
      {connectionIds.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  )
}

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  )

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : '#000'}
            />
          )
        }

        return null
      })}
    </>
  )
}

const CursorsPresence = React.memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  )
})

CursorsPresence.displayName = 'CursorsPresence'

export default CursorsPresence
