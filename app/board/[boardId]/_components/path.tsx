import { getSvgPathFromStroke } from '@/lib/utils'
import React from 'react'
import getStroke from 'perfect-freehand'

export default function Path({
  x,
  y,
  points,
  fill,
  onPointerDown,
  stroke,
}: {
  x: number
  y: number
  points: number[][]
  fill: string
  onPointerDown?: (e: React.PointerEvent) => void
  stroke?: string
}) {
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  )
}
