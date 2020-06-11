import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import Tabs from './Tabs'

export default { title: 'Tabs' }

export const withoutTabs = () => (
  <Tabs color="#000" activeColor="#f00" />
)

export const twoTabs = () => (
  <Tabs color="#000" activeColor="#f00" tabs={[{ name: 'first', key: 0 }, { name: 'first', key: 1 }]} />
)
