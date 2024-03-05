import React from 'react'
import Sidebar from './_components/sidebar'
import OrgSidebar from './_components/org-sidebar'
import Navbar from './_components/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Sidebar />
      <div className="pl-[60px] flex-1 flex flex-col">
        <div className="flex-1 flex">
          <OrgSidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
