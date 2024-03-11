'use client'

import RenameModal from '@/components/modals/rename-modal'
import React from 'react'

export default function ModalProvider() {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RenameModal />
    </>
  )
}
