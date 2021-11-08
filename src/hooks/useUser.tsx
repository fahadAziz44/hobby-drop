import { useEffect } from 'react'

import Router from 'next/router'
import useSWR from 'swr'

import { GetUserResponse } from 'src/lib/types'
import { fetchGetJSON } from 'src/utils/api-helpers'

export default function useUser({
  redirectTo,
  redirectIfUser,
}: {
  redirectTo?: string
  redirectIfUser?: boolean
}) {
  const { data, error } = useSWR<{ user: GetUserResponse }>(
    '/api/user',
    fetchGetJSON
  )

  useEffect(() => {
    if (error && redirectIfUser) return
    if (error) {
      Router.push(redirectTo || '/login')
    }
    if (data && redirectIfUser) {
      Router.push(redirectTo || '/')
    }
  }, [error, redirectTo, redirectIfUser, data])

  return !error && data
    ? {
        loading: false,
        user: data.user,
      }
    : {
        loading: true,
      }
}
