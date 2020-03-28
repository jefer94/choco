import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import useTabs from '../hooks/useTabs'
import FloatingButton from '../components/FloatingButton'
import { consoleRoute } from '../globals/routes'
import { ThemeContext, MenuContext } from '../contexts'

import TabsComponent from '../components/Tabs'
import EditorComponent from '../components/Editor'
import Menu from '../containers/Menu'

// export const editor = {
//   getValue() {
//     return this.value.getValue()
//   },

//   setValue(value) {
//     this.value = value
//   },

//   reset() {
//     this.value = null
//   }
// }

function getActiveContent(tabs) {
  const res = tabs.filter((value) => value.active)
  if (res.length) return tabs[0].content
  return ''
}

function getActiveId(tabs) {
  const res = tabs.filter((value) => value.active)
  if (res.length) return tabs[0].id
  return -1
}

export default function () {
  const { tabs, addTab, changeTab, saveTab, removeTab } = useTabs()
  const { theme } = useContext(ThemeContext)
  const { isOpen } = useContext(MenuContext)

  // const { tabs } = useTabs()
  // const [id, setId] = useState(0)
  const [id, setId] = useState(getActiveId(tabs))
  const [content, setContent] = useState(getActiveContent(tabs))
  useEffect(() => () => {
    const tab = tabs.filter((v) => v.active)[0]
    if (tab && tab.name) saveTab(tab.name)
  })

  useEffect(() => {
    const res = tabs.filter(({ active }) => active)
    if (res.length) {
      const [tab] = res
      if (id === tab.id && content !== tab.content) saveTab(tab.id, content)
      else if (id !== tab.id) setId(tab.id)
    }
  }, [content, tabs])


  return (
    <>
      <Head>
        <title>Algorithm</title>
      </Head>
      <Menu>
        <FloatingButton horizontal="right" vertical="bottom" icon={faPlay} url={consoleRoute} />
        <TabsComponent theme={theme} tabs={tabs} add={addTab} change={changeTab} remove={removeTab} menuIsOpen={isOpen} />
        <EditorComponent content={content || ''} onChange={setContent} theme={theme} />
      </Menu>
    </>
  )
}
