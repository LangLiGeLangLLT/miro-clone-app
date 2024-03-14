import Hint from '@/components/hint'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

export default function UserAvatar({
  src,
  name,
  fallback,
  borderColor,
}: {
  src?: string
  name?: string
  fallback?: string
  borderColor?: string
}) {
  return (
    <Hint label={name || 'Teammate'} side="bottom" sideOffset={18}>
      <Avatar className="size-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  )
}
