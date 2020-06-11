/* eslint-disable no-shadow */
/* eslint-disable jsdoc/check-examples */
import { useState, useEffect } from 'react'
import Router from 'next/router'
// import Cookies from 'js-cookie'

/**
 * Auth redirections.
 *
 * @param {string} key - The localStorage key.
 * @param {string} redirectTo - Redirect to.
 * @param {boolean} whereInLogin - Where in login.
 * @example
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
 * @returns {object} Auth handler.
 */
export function useNextAuth(key, redirectTo, whereInLogin = false) {
  // spinner
  // const [authIsLoaded, setAuthIsLoaded] = useState(false)
  const [token, internalSet] = useState(null)

  useEffect(() => {
    const currentToken = localStorage.getItem(key)
    internalSet(currentToken)
    if (whereInLogin && currentToken) { Router.push(redirectTo) }
    if (!whereInLogin && !currentToken) { Router.push(redirectTo) }
    // spinner
    // setAuthIsLoaded(true)
  }, [key, token, whereInLogin, redirectTo])

  /**
   * Set auth state.
   *
   * @param {boolean} token - New auth state.
   */
  function setToken(token) {
    localStorage.setItem(key, token)
    internalSet(token)
  }

  // function setImages() ???

  return { token, setToken }
}
