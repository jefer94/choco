import React, { useState, useEffect, useContext, ReactElement } from 'react'
import EditorContainer from '../containers/EditorContainer'
import Head from '../components/Head'
import useTabs from '../Hooks/useTabs'
import { ThemeContext, MenuContext } from '../contexts'
import { MenuContainer } from '../containers/MenuContainer'

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
  

  return (
    <>
      <Head title="Algorithm" />
      <MenuContainer>
        <EditorContainer />
      </MenuContainer>
    </>
  )
}
