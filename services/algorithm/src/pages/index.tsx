import React, { useState, useEffect, useContext, ReactElement } from 'react'
import Head from 'next/head'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Tabs as TabsComponent, FloatingButton } from '@chocolab/components'
import { Editor as EditorComponent } from '../Components'
import useTabs from '../Hooks/useTabs'
import { consoleRoute } from '../globals/routes'
import { ThemeContext, MenuContext } from '../contexts'
import { MenuContainer } from '../Containers/MenuContainer'

// import {Menu from '@chocolab/containers'

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

/**
 * Index page.
 * @returns {object} Index page.
 */
export default function Index(): ReactElement {
  const { tabs, addTab, changeTab, saveTab, removeTab } = useTabs()
  const { theme } = useContext(ThemeContext)
  const { isOpen } = useContext(MenuContext)

  // const { tabs } = useTabs()
  // const [id, setId] = useState(0)
  const [id, setId] = useState(getActiveId(tabs))
  const [content, setContent] = useState<string>(getActiveContent(tabs))
  useEffect(() => () => {
    const tab = tabs.filter((v) => v.active)[0]
    if (tab && tab.name) saveTab(tab.name, content)
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
      <MenuContainer>
        {/* <FloatingButton
          horizontal="right"
          vertical="bottom"
          icon={faPlay}
          url={consoleRoute}
        /> */}
        <TabsComponent
          theme={theme}
          tabs={tabs}
          add={addTab}
          change={console.log}
          remove={console.log}
          // change={changeTab}
          // remove={removeTab}
        />
        <EditorComponent
          content={content || ''}
          onChange={setContent}
          theme={theme}
        />
      </MenuContainer>
    </>
  )
}
