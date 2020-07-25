import React, { ReactElement } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { faHome } from '@fortawesome/free-solid-svg-icons'
import Menu from './Menu'


export default { title: 'Menu' }

export const emplyMenu = (): ReactElement => (
  <Menu color="#f00" borderColor="#0f0" />
)

export const menuWithTwoItems = (): ReactElement => (
  <Menu
    color="#f00"
    borderColor="#0f0"
    items={[{
      key: 0,
      name: 'cat',
      href: '#',
      icon: faHome
    }, {
      key: 1,
      name: 'dog',
      href: '#',
      icon: faHome
    }]}
  />
)
