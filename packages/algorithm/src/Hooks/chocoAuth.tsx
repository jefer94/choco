/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import axios from 'axios'

const tokenKey = '__CHOCO_TOKEN__'

type ChocoAuthProps = {
  readonly token: string
  readonly isAuth: boolean
  readonly logout: () => void
}

export function chocoAuth(): ChocoAuthProps {
  const [token, setToken] = useState(localStorage.getItem(tokenKey))
  const isAuth = !!token

  /** Login from Choco. */
  async function login(username: string, password: string): Promise<void> {
    const token = 'asdasdasdasd'
    const data = await axios.post('/asdasd', { username, password })
    setToken(token)
    localStorage.setItem(tokenKey, token)
  }

  /** Logout from Choco. */
  function logout(): void {
    setToken(null)
    localStorage.removeItem(tokenKey)
  }

  return { token, isAuth, logout }
}
