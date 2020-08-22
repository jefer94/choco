import React, { useState, useEffect } from 'react'
import Router from 'next/router'
// import Cookies from 'js-cookie'

type UseNextAuth = {
  readonly token: string
  readonly setToken: (token: string) => void
}

/**
 * Auth redirections.
 *
 * @param key - The localStorage key.
 * @param redirectTo - Redirect to.
 * @param whereInLogin - Where in login.
 * @example
 * ```
 * import React from 'react'
 *
 * function InHome() {
 *   const { isAuth, setIsAuth } = useNextAuth('__AUTH_TOKEN__', '/login', true)
 *   return <></>
 * }
 *
 * function InLogin() {
 *   const { isAuth, setIsAuth } = useNextAuth('__AUTH_TOKEN__', '/')
 *   return <></>
 * }
 * ```
 * @returns Auth handler.
 */
export function useNextAuth(key: string, redirectTo: string, whereInLogin = false): UseNextAuth {
  // spinner
  // const [authIsLoaded, setAuthIsLoaded] = useState(false)
  const [token, internalSet] = useState(null)

  useEffect(() => {
    const currentToken = localStorage.getItem(key)
    internalSet(currentToken)
    if (whereInLogin && currentToken) Router.push(redirectTo)
    if (!whereInLogin && !currentToken) Router.push(redirectTo)
    // spinner
    // setAuthIsLoaded(true)
  }, [key, token, whereInLogin, redirectTo])

  /**
   * Set auth state.
   *
   * @param token - New auth state.
   */
  function setToken(token: string): void {
    localStorage.setItem(key, token)
    internalSet(token)
  }

  // function setImages() ???

  return { token, setToken }
}
