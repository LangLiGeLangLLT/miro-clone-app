'use client'

import { RoomProvider } from '@/liveblocks.config'
import { Layer } from '@/types/canvas'
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'
import { ClientSideSuspense } from '@liveblocks/react'
import React from 'react'

export default function Room({
  children,
  roomId,
  fallback,
}: {
  children: React.ReactNode
  roomId: string
  fallback: NonNullable<React.ReactNode> | null
}) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
