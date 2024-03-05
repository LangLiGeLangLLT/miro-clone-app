'use client'

import Hint from '@/components/hint'
import { cn } from '@/lib/utils'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export default function Item({
  id,
  name,
  imageUrl,
}: {
  id: string
  name: string
  imageUrl: string
}) {
  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  function onClick() {
    if (!setActive) return

    setActive({ organization: id })
  }

  return (
    <div className="size-8 relative">
      <Hint label={name} side='right' align='start' sideOffset={18}>
        <Image
          fill
          src={imageUrl}
          alt={name}
          onClick={onClick}
          className={cn(
            'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
            isActive && 'opacity-100'
          )}
        />
      </Hint>
    </div>
  )
}
