'use client'

import Loading from '@/components/auth/loading'
import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

const address = process.env.NEXT_PUBLIC_CONVEX_URL!
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!

const convex = new ConvexReactClient(address)

export default function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthLoading>
          <Loading />
        </AuthLoading>
        <Authenticated>{children}</Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
