import { ReactElement, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import { ServerError } from '@apollo/client'
import Router from 'next/router'
import Link from '../components/Link'
import Field from '../components/Field'
import Backdrop from '../components/Backdrop'
import Snackbar from '../components/Snackbar'
import { useLoginUser } from '../hooks/useLoginUser'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    width: 667,
    height: '100vh',
    position: 'absolute',
    justifyContent: 'center'
  },
  container: {
    textAlign: 'center',
    marginTop: 120,
    width: 400,
    position: 'absolute',
    display: 'inline-block'
  },
  form: {
    textAlign: 'center'
  },
  description: {
    fontWeight: 300,
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    width: '100%'
  },
  alternative: {
    marginTop: 30,
    marginBottom: 30
  },
  alternativeText: {
    fontWeight: 300
  },
  alternativeLink: {
    fontWeight: 700
  }
}))

export default function Login(): ReactElement {
  if (localStorage.getItem('T__T__T')) Router.push('/')
  const classes = useStyles()
  // const [register, { loading, data }] = useRegister()
  const [login, request] = useLoginUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<Record<string, string>>({})

  async function submit(): Promise<void> {
    const newError: Record<string, string> = {}
    setError(newError)
    if (username && password) {
      login({ variables: { username, password } })
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API
      // .replace(/\/$/, '')}/users`, { username, email, password })
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
    else {
      if (!username) newError.username = 'Nombre de usuario vacio'
      if (!password) newError.password = 'Contraseña vacia'
      setError(newError)
    }
  }

  function getError(): string {
    if (request.error?.networkError) {
      const networkError = request.error.networkError as ServerError
      return networkError.result.errors[0]?.message
    }
    return null
  }

  useEffect(() => {
    const token = request.data?.generateToken?.token
    localStorage.setItem('T__T__T', token)
    Router.push('/')
  }, [request.data])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Backdrop open={request.loading} />
        {request.error?.networkError ?
          <Snackbar open={!!request.error} message={getError()} severity="error" /> : <></>}
        <Typography variant="h5" className={classes.alternativeText}>
          Login in Violet Blog
        </Typography>
        <Typography variant="body2" className={classes.description}>
          Get access to our awesome blog comunity
        </Typography>
        <form className={classes.form}>
          <Field
            id="username"
            label="Username"
            value={username}
            autoComplete="username"
            type="text"
            placeholder="Konan"
            onChange={(v) => setUsername(v.target.value)}
            error={error.username}
          />
          <Field
            id="current-password"
            label="Password"
            value={password}
            autoComplete="current-password"
            type="password"
            placeholder="P4ssw0rd!"
            onChange={(v) => setPassword(v.target.value)}
            error={error.password}
          />

          <div className={classes.alternative}>
            <Typography variant="body1" className={classes.alternativeText}>
              Ya tienes una cuenta?
            </Typography>
            <Link href="/register" className={classes.alternativeLink}>acceder</Link>
          </div>

        </form>
        <Button onClick={submit} variant="contained" color="primary" className={classes.button}>Ingresar</Button>
      </div>
    </div>
  )
}
