import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import React from 'react'

export default function Footer({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: {
  title: string
  authorLabel?: string
  createdAtLabel: string
  isFavorite: boolean
  onClick: () => void
  disabled: boolean
}) {
  return (
    <div className="relative bg-background p-3">
      <p className="text-sm truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
          disabled && 'cursor-not-allowed opacity-75'
        )}
      >
        <Star
          className={cn('size-4', isFavorite && 'fill-blue-600 text-blue-600')}
        />
      </button>
    </div>
  )
}
