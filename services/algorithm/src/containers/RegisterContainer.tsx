import { ReactElement, useState } from 'react'
// import axios from 'axios'
import styled from 'styled-components'
import Error from '../components/FormError'
// import setToken from '../Hooks/setToken'
import Field from '../components/Field'

const AuthContainer = styled.div`
  margin-top: 120px;
  width: 400px;
  position: absolute;
  display: inline-block;
`

const AuthFlex = styled.div`
  display: inline-flex;
  width: 667px;
  height: 100vh;
  position: absolute;
  justify-content: center;
`

const Link = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: block;
  align-items: center;
  text-align: center;
  text-decoration-line: underline;
  margin-bottom: 30px;

  color: #568AF2;
`

const Button = styled.button`
  background-color: #00CFFD;
  border-color: #00CFFD;
  color: #fff;
  width: 400px;
  height: 40px;
  box-sizing: border-box;
  padding: 6px 12px;
  border-radius: 4px;
  border-style: solid;

  &:hover {
    background-color: #00CFFD;
    border-color: #00CFFD;
  }
`

const AuthTitle = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 130%;
  text-align: center;
`

const LinkDescriptionSpan = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  display: block;
  align-items: center;
  text-align: center;
  margin-top: 30px;

  color: #000000;
`

const AuthDescription = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 130%;
  text-align: center;
`

export default function Register(): ReactElement {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(): Promise<void> {
    setError('')
    if (username && email && password && password === newPassword) {
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API.replace(/\/$/, '')}/users`, { username, email, password })
      // const { token } = response.data

      // if (!token) {
      //   const [error] = response.data.errors
      //   if (error === 'dup key: username') setError('Nombre de usuario duplicado')
      //   else if (error === 'dup key: email') setError('Email duplicado')
      //   else setError('Error desconocido')
      //   return
      // }

      // setToken(token)
    }
    else if (!username) setError('Nombre de usuario vacio')
    else if (!email) setError('Correo vacio')
    else if (!password) setError('Contraseña vacia')
    else setError('Contraseñas no coinciden')
  }

  return (
    <AuthFlex>
      <AuthContainer>
        <AuthTitle>Login in Violet Blog</AuthTitle>
        <AuthDescription>Get access to our awesome blog comunity</AuthDescription>
        <form>
          <Field
            id="username"
            label="Username"
            value={username}
            autoComplete="username"
            type="text"
            placeholder="Konan"
            onChange={(v) => setUsername(v.target.value)}
          />
          <Field
            id="email"
            label="Email"
            value={email}
            type="email"
            placeholder="Konan@gmail.com"
            onChange={(v) => setEmail(v.target.value)}
          />
          <Field
            id="current-password"
            label="Password"
            value={password}
            autoComplete="current-password"
            type="password"
            placeholder="P4ssw0rd!"
            onChange={(v) => setPassword(v.target.value)}
          />
          <Field
            id="new-password"
            label="Repeat password"
            value={newPassword}
            autoComplete="new-password"
            type="password"
            placeholder="P4ssw0rd!"
            onChange={(v) => setNewPassword(v.target.value)}
          />

          <Error error={error} />

          <LinkDescriptionSpan>Ya tienes una cuenta?</LinkDescriptionSpan>
          <Link href="/register">acceder</Link>

          <Button onClick={submit}>Ingresar</Button>
        </form>
      </AuthContainer>
    </AuthFlex>
  )
}
