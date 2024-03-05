'use client'

import Hint from '@/components/hint'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React from 'react'

export default function NewButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Hint
            label="Create organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button className="bg-white/25 size-8 flex justify-center items-center opacity-60 rounded-md hover:opacity-100 transition">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  )
}
