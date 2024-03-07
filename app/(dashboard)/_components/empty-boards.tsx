'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { useOrganization } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'

export default function EmptyBoards() {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  function onClick() {
    if (!organization) return

    mutate({
      orgId: organization.id,
      title: 'Untitled',
    })
      .then((id) => {
        toast.success('Board created')
      })
      .catch(() => {
        toast.error('Failed to create board')
      })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/1705060744705.png" width={1920 / 2} height={1080 / 2} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} size="lg" onClick={onClick}>
          Create board
        </Button>
      </div>
    </div>
  )
}