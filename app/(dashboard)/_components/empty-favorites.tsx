import Image from 'next/image'
import React from 'react'

export default function EmptyFavorites() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/1705060697926.png" width={1920 / 2} height={1080 / 2} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">No favorites boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try favouring a board
      </p>
    </div>
  )
}
