import { useMutation } from 'convex/react'
import { FunctionReference } from 'convex/server'
import React from 'react'

interface ApiMutationReturnType<T extends FunctionReference<'mutation'>> {
  pending: boolean
  mutate: (payload: T['_args']) => Promise<T['_returnType'] | void>
}

export function useApiMutation<Mutation extends FunctionReference<'mutation'>>(
  mutation: Mutation
): ApiMutationReturnType<Mutation> {
  const [pending, setPending] = React.useState(false)
  const apiMutation = useMutation(mutation)

  const mutate = async (payload: Mutation['_args']) => {
    setPending(true)
    return await apiMutation(payload)
      .catch((error: any) => {
        throw error
      })
      .finally(() => {
        setPending(false)
      })
  }

  return {
    mutate,
    pending,
  }
}
