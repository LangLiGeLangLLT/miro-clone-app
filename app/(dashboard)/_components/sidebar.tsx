import React from 'react'
import NewButton from './new-button'
import List from './list'

export default function Sidebar() {
  return (
    <aside className="fixed z-[1] left-0 bg-primary h-full w-[60px] flex p-3 flex-col space-y-4 text-white">
      <List />
      <NewButton />
    </aside>
  )
}
