import Head from 'next/head'
import styled from 'styled-components'
import { FunctionComponent } from 'react'
import Menu from '../components/Menu'
import Form from '../components/Form'

const Button = styled.button`
  background: #000;
`
let a: number
a = ''

const Home: FunctionComponent = () => (
  <div>
    <Head>
      <style>{`
        body {
          margin: 0;
        }
      `}</style>
    </Head>
    <Menu />
    <Form />
    <Button>asadasdas</Button>
  </div>
)

export default Home
