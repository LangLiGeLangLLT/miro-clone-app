import { Id } from '@/convex/_generated/dataModel'
import { create } from 'zustand'

const defaultValues = {
  id: '' as Id<'boards'>,
  title: '',
}

type RenameModal = {
  isOpen: boolean
  initialValues: {
    id: Id<'boards'>
    title: string
  }
  onOpen: (id: Id<'boards'>, title: string) => void
  onClose: () => void
}

export const useRenameModal = create<RenameModal>()((set) => ({
  isOpen: false,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: { id, title },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
  initialValues: defaultValues,
}))
