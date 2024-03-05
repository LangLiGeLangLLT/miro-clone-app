'use client'

import { useOrganizationList } from '@clerk/nextjs'
import React from 'react'
import Item from './item'

export default function List() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  if (!userMemberships.data?.length) return null

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((mem) => (
        <li key={mem.organization.id}>
          <Item
            id={mem.organization.id}
            name={mem.organization.name}
            imageUrl={mem.organization.imageUrl}
          />
        </li>
      ))}
    </ul>
  )
}
