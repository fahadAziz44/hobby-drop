import { useEffect } from 'react'

import Router from 'next/router'
import useSWR from 'swr'

import { GetUserResponse } from 'src/lib/types'
import { fetchGetJSON } from 'src/utils/api-helpers'

export default function useUser({ redirectTo }: { redirectTo?: string }) {
  const { data, error } = useSWR<{ user: GetUserResponse }>(
    '/api/user',
    fetchGetJSON
  )

  useEffect(() => {
    if (error) {
      Router.push(redirectTo || '/login')
    }
  }, [error, redirectTo])

  return !error && data
    ? {
        loading: false,
        user: data.user,
      }
    : {
        loading: true,
      }
}
