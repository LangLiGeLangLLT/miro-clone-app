'use client'

import { useRenameModal } from '@/stores/use-rename-modal'
import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

export default function RenameModal() {
  const { mutate, pending } = useApiMutation(api.board.update)

  const { isOpen, onClose, initialValues } = useRenameModal()

  const [title, setTitle] = React.useState(initialValues.title)

  React.useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Board renamed')
        onClose()
      })
      .catch(() => {
        toast.error('Failed to rename board')
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
