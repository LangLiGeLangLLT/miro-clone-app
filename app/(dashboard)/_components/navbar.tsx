'use client'

import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Navbar() {
  return (
    <div className="flex items-center space-x-4 p-5 bg-green-500">
      <div className="hidden lg:flex flex-1 bg-yellow-500">Search</div>
      <UserButton />
    </div>
  )
}
