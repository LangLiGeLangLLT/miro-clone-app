'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import React from 'react'
import { useDebounceValue } from 'usehooks-ts'

export default function SearchInput() {
  const router = useRouter()
  const [value, setValue] = React.useState('')
  const [debounceValue] = useDebounceValue(value, 500)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  React.useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [debounceValue, router])

  return (
    <div className="w-full relative">
      <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}
