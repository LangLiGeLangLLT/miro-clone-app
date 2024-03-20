'use client'

import { useOthersConnectionIds } from '@/liveblocks.config'
import React from 'react'
import Cursor from './cursor'

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

const CursorsPresence = React.memo(() => {
  return (
    <>
      <Cursors />
    </>
  )
})

CursorsPresence.displayName = 'CursorsPresence'

export default CursorsPresence
