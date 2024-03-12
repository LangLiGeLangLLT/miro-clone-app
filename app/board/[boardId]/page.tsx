import React from 'react'
import Canvas from './_components/canvas'
import Room from '@/components/room'
import Loading from './_components/loading'

export default function Page({ params }: { params: { boardId: string } }) {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  )
}
