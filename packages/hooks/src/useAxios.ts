import React, { useState, useEffect } from 'react'
import { Dictionary } from '@chocolab/types'
import axios, { AxiosResponse } from 'axios'
// axios.he
type Methods = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head'

type Props<Type> = {
  readonly method: Methods
  readonly url: string
  readonly object: Type
  readonly headers: Dictionary
  readonly wait: boolean
}

type useAxios<Response, Error> = {
  readonly data: Response
  readonly loaded: boolean
  readonly error: Error
}

/**
 * Use axios hook.
 *
 * @param Props - Properties.
 * @example
 * ```
 * import React from 'react'
 *
 * function Component() {
 *   const { data, error, loaded } = useAxios({
 *     method: 'get',
 *     url: 'http://localhost:3000'
 *   })
 *   return <></>
 * }
 * ```
 * @returns Use axios object.
 */
export function useAxios<Type, Response, Error>(
  { method = 'get', url, object, headers, wait }: Props<Type>
): useAxios<Response, Error> {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [data, setData] = useState<Response | null>(null)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    /** Execute axios request. */
    async function execute(): Promise<void> {
      try {
        let response: Promise<AxiosResponse<any>>
        if (method === 'get') response = axios.get(url, { headers })
        else if (method === 'post') response = axios.post(url, object, { headers })
        else if (method === 'put') response = axios.put(url, object, { headers })
        else if (method === 'patch') response = axios.patch(url, object, { headers })
        else if (method === 'delete') response = axios.delete(url, { headers })
        else if (method === 'head') response = axios.head(url, { headers })

        const { data } = await response
        setData(data)
      }
      catch (e) {
        setError(e.message)
      }
      finally {
        setLoaded(true)
      }
    }

    if (!wait) { execute() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wait, url, method, JSON.stringify(object), JSON.stringify(headers)])

  return { data, loaded, error }
}
