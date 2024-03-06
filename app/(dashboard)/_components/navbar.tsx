'use client'

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from '@clerk/nextjs'
import React from 'react'
import SearchInput from './search-input'
import InviteButton from './invite-button'

export default function Navbar() {
  const { organization } = useOrganization()

  return (
    <div className="flex items-center space-x-4 p-5">
      <div className="hidden lg:flex flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: '100%',
                maxWidth: '376px',
              },
              organizationSwitcherTrigger: {
                padding: '6px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  )
}
