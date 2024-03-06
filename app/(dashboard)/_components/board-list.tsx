import React from 'react'
import EmptySearch from './empty-search'
import EmptyFavorites from './empty-favorites'
import EmptyBoards from './empty-boards'

export default function BoardList({
  orgId,
  query,
}: {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}) {
  const data = []

  if (!data?.length && query.search) {
    return <EmptySearch />
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />
  }

  if (!data?.length) {
    return <EmptyBoards />
  }

  return <div>{JSON.stringify(query)}</div>
}
