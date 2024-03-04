import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
        <Image
          src="/next.svg"
          alt="Logo"
          width={180}
          height={37}
          className="animate-pulse duration-700"
        />
      </div>
    </div>
  )
}
