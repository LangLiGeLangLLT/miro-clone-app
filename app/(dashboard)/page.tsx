'use client'

import React from 'react'
import EmptyOrg from './_components/empty-org'
import { useOrganization } from '@clerk/nextjs'
import BoardList from './_components/board-list'

export default function Page({
  searchParams,
}: {
  searchParams: {
    search?: string
    favorites?: string
  }
}) {
  const { organization } = useOrganization()

  return (
    <div className="flex-1 p-6">
      {organization ? (
        <BoardList orgId={organization.id} query={searchParams} />
      ) : (
        <EmptyOrg />
      )}
    </div>
  )
}
